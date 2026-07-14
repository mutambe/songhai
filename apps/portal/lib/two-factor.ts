import crypto from 'crypto'
import { TOTP, Secret } from 'otpauth'
import QRCode from 'qrcode'

function getEncryptionKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET não está definida.')
  return crypto.createHash('sha256').update(secret).digest()
}

export function encryptSecret(plain: string) {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv)
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted.toString('hex')}`
}

export function decryptSecret(payload: string) {
  const [ivHex, tagHex, dataHex] = payload.split(':')
  const decipher = crypto.createDecipheriv('aes-256-gcm', getEncryptionKey(), Buffer.from(ivHex, 'hex'))
  decipher.setAuthTag(Buffer.from(tagHex, 'hex'))
  return Buffer.concat([decipher.update(Buffer.from(dataHex, 'hex')), decipher.final()]).toString('utf8')
}

export function generateTotpSecret() {
  return new Secret({ size: 20 })
}

function buildTotp(email: string, secret: Secret) {
  return new TOTP({
    issuer: 'SONGHAI',
    label: email,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret,
  })
}

export async function createTotpEnrollment(email: string) {
  const secret = generateTotpSecret()
  const totp = buildTotp(email, secret)
  const otpauthUrl = totp.toString()
  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl)
  return {
    encryptedSecret: encryptSecret(secret.base32),
    secretBase32: secret.base32,
    otpauthUrl,
    qrCodeDataUrl,
  }
}

export function verifyTotpCode(email: string, encryptedSecret: string, code: string) {
  const secret = Secret.fromBase32(decryptSecret(encryptedSecret))
  const totp = buildTotp(email, secret)
  const delta = totp.validate({ token: code.trim(), window: 1 })
  return delta !== null
}

export function generateEmailCode() {
  return crypto.randomInt(100000, 1000000).toString()
}

export function hashEmailCode(code: string) {
  return crypto.createHash('sha256').update(code).digest('hex')
}

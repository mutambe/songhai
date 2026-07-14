import 'server-only'
import crypto from 'crypto'

function getSecret() {
  const secret = process.env.SSO_SHARED_SECRET
  if (!secret) throw new Error('SSO_SHARED_SECRET não está definida.')
  return secret
}

export type SsoIdentity = { sub: string; name: string; email: string }

export function verifyBlogSsoToken(token: string | undefined | null): SsoIdentity | null {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expectedSignature = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
  const a = Buffer.from(signature)
  const b = Buffer.from(expectedSignature)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as SsoIdentity & {
      expiresAt: number
    }
    if (Date.now() > decoded.expiresAt) return null
    return { sub: decoded.sub, name: decoded.name, email: decoded.email }
  } catch {
    return null
  }
}

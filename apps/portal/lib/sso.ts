import 'server-only'
import crypto from 'crypto'

const TOKEN_TTL_MS = 60 * 1000 // 60 segundos — só para o momento da transição entre apps

function getSecret() {
  const secret = process.env.SSO_SHARED_SECRET
  if (!secret) throw new Error('SSO_SHARED_SECRET não está definida.')
  return secret
}

export type SsoIdentity = { sub: string; name: string; email: string }

export function createBlogSsoToken(identity: SsoIdentity) {
  const expiresAt = Date.now() + TOKEN_TTL_MS
  const payload = Buffer.from(JSON.stringify({ ...identity, expiresAt })).toString('base64url')
  const signature = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
  return `${payload}.${signature}`
}

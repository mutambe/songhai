import 'server-only'
import crypto from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'songhai_blog_admin'
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000 // 24 horas

export type AdminIdentity = { sub: string; name: string; email: string }
type AdminTokenPayload = AdminIdentity & { expiresAt: number }

function getSecret() {
  const secret = process.env.BLOG_ADMIN_SECRET
  if (!secret) throw new Error('BLOG_ADMIN_SECRET não está definida.')
  return secret
}

function sign(payload: string) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('hex')
}

export function createAdminToken(identity: AdminIdentity) {
  const data: AdminTokenPayload = { ...identity, expiresAt: Date.now() + SESSION_DURATION_MS }
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifyAdminToken(token: string | undefined | null): AdminIdentity | null {
  if (!token) return null
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expectedSignature = sign(payload)
  const a = Buffer.from(signature)
  const b = Buffer.from(expectedSignature)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as AdminTokenPayload
    if (Date.now() > decoded.expiresAt) return null
    return { sub: decoded.sub, name: decoded.name, email: decoded.email }
  } catch {
    return null
  }
}

export async function setAdminCookie(identity: AdminIdentity) {
  const store = await cookies()
  store.set(ADMIN_COOKIE, createAdminToken(identity), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000,
  })
}

export async function clearAdminCookie() {
  const store = await cookies()
  store.delete(ADMIN_COOKIE)
}

export async function getAdminSession(): Promise<AdminIdentity | null> {
  const store = await cookies()
  return verifyAdminToken(store.get(ADMIN_COOKIE)?.value)
}

export async function isAdminAuthenticated() {
  return (await getAdminSession()) !== null
}

import { SignJWT, jwtVerify } from 'jose'

export type UserRole = 'admin' | 'member'

export const SESSION_COOKIE = 'songhai_session'
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7 // 7 dias
const PREAUTH_DURATION_SECONDS = 60 * 15 // 15 minutos

export type SessionPayload = {
  sub: string
  name: string
  email: string
  role: UserRole
}

export type PreAuthStep = 'password-change' | '2fa-enroll' | '2fa-verify'

export type PreAuthPayload = {
  sub: string
  step: PreAuthStep
}

function getSecretKey() {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET não está definida.')
  return new TextEncoder().encode(secret)
}

export async function signSessionToken(payload: SessionPayload) {
  return new SignJWT({ ...payload, typ: 'session' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecretKey())
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    if (payload.typ !== 'session') return null
    return {
      sub: payload.sub as string,
      name: payload.name as string,
      email: payload.email as string,
      role: payload.role as UserRole,
    }
  } catch {
    return null
  }
}

export async function signPreAuthToken(payload: PreAuthPayload) {
  return new SignJWT({ ...payload, typ: 'preauth' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${PREAUTH_DURATION_SECONDS}s`)
    .sign(getSecretKey())
}

export async function verifyPreAuthToken(token: string): Promise<PreAuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    if (payload.typ !== 'preauth') return null
    return {
      sub: payload.sub as string,
      step: payload.step as PreAuthStep,
    }
  } catch {
    return null
  }
}

import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  SESSION_COOKIE,
  SESSION_DURATION_SECONDS,
  signSessionToken,
  verifySessionToken,
  verifyPreAuthToken,
  type SessionPayload,
  type PreAuthStep,
} from '@/lib/session-core'
import { countPendingUsers, findUserById, type Permissions } from '@/lib/auth-store'

export type { SessionPayload }

export async function createSessionCookie(payload: SessionPayload) {
  const token = await signSessionToken(payload)
  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  return verifySessionToken(token)
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession()
  if (!session) redirect('/login')
  return session
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await requireSession()
  if (session.role !== 'admin') redirect('/portal')
  return session
}

export async function getPortalShellProps() {
  const session = await requireSession()
  const pendingCount = session.role === 'admin' ? countPendingUsers() : 0
  return { session, pendingCount }
}

// Admins têm sempre acesso total; para os restantes, o painel de
// utilizadores controla a permissão granular.
export function hasPermission(session: SessionPayload, key: keyof Permissions): boolean {
  if (session.role === 'admin') return true
  const user = findUserById(session.sub)
  return !!user?.permissions[key]
}

export async function requirePermission(key: keyof Permissions) {
  const { session, pendingCount } = await getPortalShellProps()
  if (!hasPermission(session, key)) redirect('/portal')
  return { session, pendingCount }
}

export type TwoFactorContext =
  | { mode: 'login'; userId: string; step: PreAuthStep }
  | { mode: 'settings'; userId: string }

export async function resolveTwoFactorContext(token?: string): Promise<TwoFactorContext | null> {
  if (token) {
    const payload = await verifyPreAuthToken(token)
    if (!payload) return null
    return { mode: 'login', userId: payload.sub, step: payload.step }
  }
  const session = await getSession()
  if (!session) return null
  return { mode: 'settings', userId: session.sub }
}

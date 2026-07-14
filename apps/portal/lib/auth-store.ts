import crypto from 'crypto'
import { db } from '@/lib/db'
import type { UserRole } from '@/lib/session-core'
import { hashEmailCode } from '@/lib/two-factor'

export type { UserRole }
export type UserStatus = 'pending' | 'approved' | 'rejected'

export type Permissions = {
  canViewMetrics: boolean
  canViewSystems: boolean
  canViewDashboards: boolean
}

export type User = {
  id: string
  name: string
  email: string
  passwordHash: string
  role: UserRole
  status: UserStatus
  createdAt: string
  mustChangePassword: boolean
  totpEnabled: boolean
  email2faEnabled: boolean
  lastLoginAt: string | null
  permissions: Permissions
}

type UserRow = {
  id: string
  name: string
  email: string
  password_hash: string
  role: UserRole
  status: UserStatus
  created_at: string
  must_change_password: number
  totp_enabled: number
  email_2fa_enabled: number
  last_login_at: string | null
  can_view_metrics: number
  can_view_systems: number
  can_view_dashboards: number
}

function rowToUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
    mustChangePassword: !!row.must_change_password,
    totpEnabled: !!row.totp_enabled,
    email2faEnabled: !!row.email_2fa_enabled,
    lastLoginAt: row.last_login_at,
    permissions: {
      canViewMetrics: !!row.can_view_metrics,
      canViewSystems: !!row.can_view_systems,
      canViewDashboards: !!row.can_view_dashboards,
    },
  }
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const hashBuffer = Buffer.from(hash, 'hex')
  const suppliedBuffer = crypto.scryptSync(password, salt, 64)
  if (hashBuffer.length !== suppliedBuffer.length) return false
  return crypto.timingSafeEqual(hashBuffer, suppliedBuffer)
}

export function countUsers(): number {
  const row = db.prepare('SELECT COUNT(*) as count FROM users').get() as { count: number }
  return row.count
}

export function countAdmins(): number {
  const row = db
    .prepare("SELECT COUNT(*) as count FROM users WHERE role = 'admin' AND status = 'approved'")
    .get() as { count: number }
  return row.count
}

export function findUserByEmail(email: string): User | null {
  const row = db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email.toLowerCase()) as UserRow | undefined
  return row ? rowToUser(row) : null
}

export function findUserById(id: string): User | null {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as UserRow | undefined
  return row ? rowToUser(row) : null
}

export function createUser(input: { name: string; email: string; password: string }): User {
  const isFirstUser = countUsers() === 0
  const id = crypto.randomUUID()
  const passwordHash = hashPassword(input.password)
  const role: UserRole = isFirstUser ? 'admin' : 'member'
  const status: UserStatus = isFirstUser ? 'approved' : 'pending'
  const createdAt = new Date().toISOString()

  db.prepare(
    `INSERT INTO users (id, name, email, password_hash, role, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(id, input.name, input.email.toLowerCase(), passwordHash, role, status, createdAt)

  return findUserById(id)!
}

export function listAllUsers(): User[] {
  const rows = db.prepare('SELECT * FROM users ORDER BY created_at DESC').all() as UserRow[]
  return rows.map(rowToUser)
}

export function listPendingUsers(): User[] {
  const rows = db
    .prepare('SELECT * FROM users WHERE status = ? ORDER BY created_at ASC')
    .all('pending') as UserRow[]
  return rows.map(rowToUser)
}

export function countPendingUsers(): number {
  const row = db
    .prepare('SELECT COUNT(*) as count FROM users WHERE status = ?')
    .get('pending') as { count: number }
  return row.count
}

export function setUserStatus(id: string, status: 'approved' | 'rejected'): User | null {
  const result = db.prepare('UPDATE users SET status = ? WHERE id = ?').run(status, id)
  if (result.changes === 0) return null
  return findUserById(id)
}

export function setUserRole(id: string, role: UserRole): User | null {
  const result = db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, id)
  if (result.changes === 0) return null
  return findUserById(id)
}

export function setUserPermissions(id: string, permissions: Permissions): User | null {
  const result = db
    .prepare(
      'UPDATE users SET can_view_metrics = ?, can_view_systems = ?, can_view_dashboards = ? WHERE id = ?',
    )
    .run(
      permissions.canViewMetrics ? 1 : 0,
      permissions.canViewSystems ? 1 : 0,
      permissions.canViewDashboards ? 1 : 0,
      id,
    )
  if (result.changes === 0) return null
  return findUserById(id)
}

export function deleteUser(id: string) {
  const result = db.prepare('DELETE FROM users WHERE id = ?').run(id)
  return result.changes > 0
}

export function updateEmail(id: string, email: string) {
  db.prepare('UPDATE users SET email = ? WHERE id = ?').run(email.toLowerCase(), id)
}

export function updatePassword(id: string, password: string) {
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hashPassword(password), id)
}

export function forceChangePassword(id: string, password: string) {
  db.prepare(
    'UPDATE users SET password_hash = ?, must_change_password = 0 WHERE id = ?',
  ).run(hashPassword(password), id)
}

function generateTempPassword() {
  return crypto.randomBytes(9).toString('base64url')
}

export function adminResetPassword(id: string) {
  const tempPassword = generateTempPassword()
  db.prepare(
    'UPDATE users SET password_hash = ?, must_change_password = 1 WHERE id = ?',
  ).run(hashPassword(tempPassword), id)
  return tempPassword
}

export function updateLastLogin(id: string) {
  db.prepare('UPDATE users SET last_login_at = ? WHERE id = ?').run(new Date().toISOString(), id)
}

export function saveTotpSecret(id: string, encryptedSecret: string) {
  db.prepare('UPDATE users SET totp_secret = ? WHERE id = ?').run(encryptedSecret, id)
}

export function getTotpSecret(id: string): string | null {
  const row = db.prepare('SELECT totp_secret FROM users WHERE id = ?').get(id) as
    | { totp_secret: string | null }
    | undefined
  return row?.totp_secret ?? null
}

export function enableTotp(id: string) {
  db.prepare('UPDATE users SET totp_enabled = 1 WHERE id = ?').run(id)
}

export function disableTotp(id: string) {
  db.prepare('UPDATE users SET totp_enabled = 0, totp_secret = NULL WHERE id = ?').run(id)
}

export function enableEmail2fa(id: string) {
  db.prepare('UPDATE users SET email_2fa_enabled = 1 WHERE id = ?').run(id)
}

export function disableEmail2fa(id: string) {
  db.prepare('UPDATE users SET email_2fa_enabled = 0 WHERE id = ?').run(id)
}

export function setEmailOtp(id: string, code: string) {
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 min
  db.prepare(
    'UPDATE users SET email_otp_hash = ?, email_otp_expires_at = ? WHERE id = ?',
  ).run(hashEmailCode(code), expiresAt, id)
}

export function consumeEmailOtp(id: string, code: string): boolean {
  const row = db
    .prepare('SELECT email_otp_hash, email_otp_expires_at FROM users WHERE id = ?')
    .get(id) as { email_otp_hash: string | null; email_otp_expires_at: string | null } | undefined

  if (!row?.email_otp_hash || !row.email_otp_expires_at) return false

  db.prepare('UPDATE users SET email_otp_hash = NULL, email_otp_expires_at = NULL WHERE id = ?').run(id)

  if (new Date(row.email_otp_expires_at) < new Date()) return false

  const suppliedHash = hashEmailCode(code.trim())
  const storedBuffer = Buffer.from(row.email_otp_hash, 'hex')
  const suppliedBuffer = Buffer.from(suppliedHash, 'hex')
  if (storedBuffer.length !== suppliedBuffer.length) return false
  return crypto.timingSafeEqual(storedBuffer, suppliedBuffer)
}

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export function createPasswordResetToken(userId: string) {
  const token = crypto.randomBytes(32).toString('hex')
  const tokenHash = hashToken(token)
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1h

  db.prepare('DELETE FROM password_resets WHERE user_id = ?').run(userId)
  db.prepare(
    'INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES (?, ?, ?)',
  ).run(tokenHash, userId, expiresAt)

  return token
}

export function consumePasswordResetToken(token: string): string | null {
  const tokenHash = hashToken(token)
  const row = db
    .prepare('SELECT user_id, expires_at FROM password_resets WHERE token_hash = ?')
    .get(tokenHash) as { user_id: string; expires_at: string } | undefined

  if (!row) return null
  db.prepare('DELETE FROM password_resets WHERE token_hash = ?').run(tokenHash)

  if (new Date(row.expires_at) < new Date()) return null
  return row.user_id
}

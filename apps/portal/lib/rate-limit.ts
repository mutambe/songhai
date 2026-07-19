import 'server-only'
import { db } from '@/lib/db'

// Persistido em SQLite (não em memória) para sobreviver a reinícios do
// servidor/deploys — um Map em memória esvaziava-se a cada restart,
// devolvendo o orçamento de tentativas de graça a um atacante.
db.exec(`
  CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    count INTEGER NOT NULL,
    first_attempt_at INTEGER NOT NULL
  );
`)

const DEFAULT_MAX_ATTEMPTS = 5
const DEFAULT_WINDOW_MS = 15 * 60 * 1000 // 15 minutos

type RateLimitRow = { count: number; first_attempt_at: number }

export function isRateLimited(
  key: string,
  maxAttempts: number = DEFAULT_MAX_ATTEMPTS,
  windowMs: number = DEFAULT_WINDOW_MS,
) {
  const row = db
    .prepare('SELECT count, first_attempt_at FROM rate_limits WHERE key = ?')
    .get(key) as RateLimitRow | undefined
  if (!row) return false
  if (Date.now() - row.first_attempt_at > windowMs) {
    db.prepare('DELETE FROM rate_limits WHERE key = ?').run(key)
    return false
  }
  return row.count >= maxAttempts
}

export function registerFailedAttempt(key: string, windowMs: number = DEFAULT_WINDOW_MS) {
  const row = db
    .prepare('SELECT count, first_attempt_at FROM rate_limits WHERE key = ?')
    .get(key) as RateLimitRow | undefined
  const now = Date.now()

  if (!row || now - row.first_attempt_at > windowMs) {
    db.prepare(
      `INSERT INTO rate_limits (key, count, first_attempt_at) VALUES (?, 1, ?)
       ON CONFLICT(key) DO UPDATE SET count = 1, first_attempt_at = excluded.first_attempt_at`,
    ).run(key, now)
    return
  }

  db.prepare('UPDATE rate_limits SET count = count + 1 WHERE key = ?').run(key)
}

export function clearAttempts(key: string) {
  db.prepare('DELETE FROM rate_limits WHERE key = ?').run(key)
}

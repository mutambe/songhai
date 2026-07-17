import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DATA_DIR = path.join(process.cwd(), 'data')
fs.mkdirSync(DATA_DIR, { recursive: true })

const globalForDb = globalThis as unknown as { portalDb?: Database.Database }

export const db = globalForDb.portalDb ?? new Database(path.join(DATA_DIR, 'portal.db'))

if (process.env.NODE_ENV !== 'production') {
  globalForDb.portalDb = db
}

// TEM de ser a primeira pragma. "next build" avalia módulos em vários
// workers/processos em paralelo, cada um com a sua própria ligação a este
// mesmo ficheiro — incluindo a chamada seguinte (journal_mode = WAL), que
// já precisa de um lock exclusivo momentâneo. Sem isto definido primeiro,
// um worker que encontre a base de dados bloqueada por outro falha logo
// com SQLITE_BUSY em vez de esperar a sua vez.
db.pragma('busy_timeout = 5000')
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS password_resets (
    token_hash TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );
`)

function ensureColumn(table: string, column: string, definition: string) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all() as { name: string }[]
  if (columns.some((c) => c.name === column)) return

  try {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`)
  } catch (err) {
    // Next.js "next build" avalia várias rotas em paralelo (vários workers),
    // e cada uma importa este módulo — numa base de dados nova, dois workers
    // podem tentar adicionar a mesma coluna ao mesmo tempo. Ignorar apenas
    // este erro específico é seguro: o resultado final é o mesmo.
    if (!(err instanceof Error) || !/duplicate column name/i.test(err.message)) {
      throw err
    }
  }
}

ensureColumn('users', 'must_change_password', 'INTEGER NOT NULL DEFAULT 0')
ensureColumn('users', 'totp_secret', 'TEXT')
ensureColumn('users', 'totp_enabled', 'INTEGER NOT NULL DEFAULT 0')
ensureColumn('users', 'email_2fa_enabled', 'INTEGER NOT NULL DEFAULT 0')
ensureColumn('users', 'email_otp_hash', 'TEXT')
ensureColumn('users', 'email_otp_expires_at', 'TEXT')
ensureColumn('users', 'last_login_at', 'TEXT')
ensureColumn('users', 'can_view_metrics', 'INTEGER NOT NULL DEFAULT 1')
ensureColumn('users', 'can_view_systems', 'INTEGER NOT NULL DEFAULT 1')
ensureColumn('users', 'can_view_dashboards', 'INTEGER NOT NULL DEFAULT 1')
ensureColumn('users', 'two_factor_exempt', 'INTEGER NOT NULL DEFAULT 0')

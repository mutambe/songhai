const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutos

type Attempt = { count: number; firstAttemptAt: number }

const attempts = new Map<string, Attempt>()

export function isRateLimited(key: string) {
  const entry = attempts.get(key)
  if (!entry) return false
  if (Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attempts.delete(key)
    return false
  }
  return entry.count >= MAX_ATTEMPTS
}

export function registerFailedAttempt(key: string) {
  const entry = attempts.get(key)
  if (!entry || Date.now() - entry.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: Date.now() })
    return
  }
  entry.count += 1
}

export function clearAttempts(key: string) {
  attempts.delete(key)
}

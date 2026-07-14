import { NextResponse } from 'next/server'
import { findUserById, saveTotpSecret } from '@/lib/auth-store'
import { resolveTwoFactorContext } from '@/lib/session'
import { createTotpEnrollment } from '@/lib/two-factor'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const token = typeof body?.token === 'string' ? body.token : undefined

  const context = await resolveTwoFactorContext(token)
  if (!context) {
    return NextResponse.json({ error: 'Sessão expirada. Entre novamente.' }, { status: 401 })
  }

  const user = findUserById(context.userId)
  if (!user) {
    return NextResponse.json({ error: 'Utilizador não encontrado.' }, { status: 404 })
  }

  const enrollment = await createTotpEnrollment(user.email)
  saveTotpSecret(user.id, enrollment.encryptedSecret)

  return NextResponse.json({
    secret: enrollment.secretBase32,
    qrCodeDataUrl: enrollment.qrCodeDataUrl,
  })
}

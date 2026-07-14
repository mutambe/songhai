import 'server-only'
import nodemailer from 'nodemailer'

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null

function getTransporter() {
  if (transporter) return transporter

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 465)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('Configuração SMTP em falta (SMTP_HOST/SMTP_USER/SMTP_PASS).')
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
  return transporter
}

export async function sendMail(input: {
  to: string
  subject: string
  text: string
  replyTo?: string
}) {
  const from = process.env.MAIL_FROM || process.env.SMTP_USER
  await getTransporter().sendMail({
    from: `SONGHAI <${from}>`,
    to: input.to,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
  })
}

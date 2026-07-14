import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { AnalyticsBeacon } from '@/components/analytics-beacon'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'SONGHAI — Poupe Tempo. Automatize. Cresça',
  description:
    'Poupe tempo. Automatize processos. Cresça mais rápido com IA e automação. Diagnóstico gratuito.',
  generator: 'v0.app',
  keywords: [
    'Inteligência Artificial Moçambique',
    'Automação de processos',
    'Agentes de IA',
    'Consultoria de IA',
    'Moçambique',
  ],
  openGraph: {
    title: 'SONGHAI — Menos Tarefas. Mais Crescimento',
    description:
      'Poupe tempo. Automatize processos. Cresça mais rápido.',
    locale: 'pt_MZ',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f3ec',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${fraunces.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton />
        <AnalyticsBeacon />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

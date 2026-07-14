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

const SITE_URL = 'https://songhai.cc'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SONGHAI — Agência de IA e Automação em Maputo, Moçambique',
    template: '%s | SONGHAI',
  },
  description:
    'Agência de inteligência artificial e automação de processos em Maputo, Moçambique. Agentes de IA, automação e consultoria para empresas moçambicanas poupar tempo e crescer mais rápido. Diagnóstico gratuito.',
  keywords: [
    'Inteligência Artificial Moçambique',
    'IA Maputo',
    'Automação de processos Maputo',
    'Agentes de IA Moçambique',
    'Consultoria de IA Moçambique',
    'Automação de empresas Maputo',
    'Chatbot WhatsApp Moçambique',
    'Transformação digital Moçambique',
  ],
  authors: [{ name: 'SONGHAI' }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'SONGHAI — Agência de IA e Automação em Maputo, Moçambique',
    description:
      'Poupe tempo, automatize processos e cresça mais rápido com IA — uma agência local, em Maputo, que entende a realidade das empresas moçambicanas.',
    url: SITE_URL,
    siteName: 'SONGHAI',
    locale: 'pt_MZ',
    type: 'website',
    images: [{ url: '/songhai-logo.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'SONGHAI — Agência de IA e Automação em Maputo, Moçambique',
    description:
      'Poupe tempo, automatize processos e cresça mais rápido com IA — uma agência local, em Maputo.',
    images: ['/songhai-logo.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f3ec',
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SONGHAI',
  description:
    'Agência de inteligência artificial e automação de processos para empresas em Maputo e em todo o Moçambique.',
  url: SITE_URL,
  logo: `${SITE_URL}/songhai-logo.png`,
  image: `${SITE_URL}/songhai-logo.png`,
  telephone: '+258848986002',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Maputo',
    addressCountry: 'MZ',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Moçambique',
  },
  serviceType: [
    'Agentes de Inteligência Artificial',
    'Automação de Processos',
    'Consultoria de IA',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-MZ"
      className={`${inter.variable} ${fraunces.variable} bg-background`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton />
        <AnalyticsBeacon />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

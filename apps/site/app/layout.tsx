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
    default: 'SONGHAI — Agência de IA e Automação em Moçambique',
    template: '%s | SONGHAI',
  },
  description:
    'Agência de IA e automação de processos, com sede em Maputo, a atender empresas em todo o Moçambique. Poupe tempo e cresça mais rápido — diagnóstico gratuito.',
  keywords: [
    'Inteligência Artificial Moçambique',
    'IA Maputo',
    'IA Beira',
    'IA Nampula',
    'Automação de processos Moçambique',
    'Agentes de IA Moçambique',
    'Consultoria de IA Moçambique',
    'Automação de empresas Maputo',
    'Automação de empresas Beira',
    'Chatbot WhatsApp Moçambique',
    'Transformação digital Moçambique',
  ],
  authors: [{ name: 'SONGHAI' }],
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'a4y4nusuhpOp1-12RUtDILwExsKRdUrJ-StDTDtFhk4',
  },
  openGraph: {
    title: 'SONGHAI — Agência de IA e Automação em Moçambique',
    description:
      'Poupe tempo, automatize processos e cresça mais rápido com IA — uma agência moçambicana, com sede em Maputo, a atender empresas em todo o país.',
    url: SITE_URL,
    siteName: 'SONGHAI',
    locale: 'pt_MZ',
    type: 'website',
    images: [{ url: '/songhai-logo.png' }],
  },
  twitter: {
    card: 'summary',
    title: 'SONGHAI — Agência de IA e Automação em Moçambique',
    description:
      'Poupe tempo, automatize processos e cresça mais rápido com IA — uma agência moçambicana a atender empresas em todo o país.',
    images: ['/songhai-logo.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5efe0' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1412' },
  ],
}

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('songhai-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`

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
      suppressHydrationWarning
    >
      <head>
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
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

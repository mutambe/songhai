import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

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
  title: 'Portal SONGHAI',
  description: 'Portal interno da equipa Songhai — sistemas, clientes e dashboards.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#07121b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  )
}

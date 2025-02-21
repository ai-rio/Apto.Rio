import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Apto.rio - Plataforma Imobiliária',
  description: 'Plataforma de gestão imobiliária para desenvolvedores, corretores e investidores',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Apto.rio',
    description: 'Plataforma imobiliária inteligente',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://apto.rio.br',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}

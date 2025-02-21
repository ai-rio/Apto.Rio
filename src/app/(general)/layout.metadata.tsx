import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apto Rio',
  description: 'Plataforma de imóveis',
  keywords: ['imóveis', 'rio de janeiro', 'aluguel', 'venda'],
  openGraph: {
    title: 'Apto Rio - Encontre seu imóvel',
    description: 'Plataforma de imóveis no Rio de Janeiro',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apto Rio',
    description: 'Plataforma de imóveis no Rio de Janeiro',
  },
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Apto Rio',
    default: 'Apto Rio - Plataforma de Imóveis',
  },
  description: 'Encontre seu imóvel perfeito no Rio de Janeiro',
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

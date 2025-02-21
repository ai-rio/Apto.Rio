import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ServerPricing } from '@/components/home/ServerPricing'
import { Testimonials } from '@/components/home/Testimonials'
import { Bottom } from '@/components/home/Bottom'
import { Banner } from '@/components/home/Banner'
import { Features } from '@/components/home'
import { Pricing } from '@/components/home'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Banner />
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Apto.rio</h1>
        <p className="text-xl mb-6">Encontre seu próximo imóvel ou oportunidade de investimento</p>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Link href="/login">
            <Button variant="default">Entrar</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Cadastrar</Button>
          </Link>
        </div>
      </div>
      <Features />
      <ServerPricing />
      <Testimonials />
      <Pricing />
      <Bottom />
    </main>
  )
}

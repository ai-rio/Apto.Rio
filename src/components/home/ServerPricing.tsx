import type { PricingPlan, PricingFeatures } from '@/interfaces'

const MOCK_PRICING_FEATURES: PricingFeatures[] = [
  { name: 'Até 3 imóveis' },
  { name: 'Suporte básico' },
  { name: 'Publicação em plataformas limitadas' },
]

const MOCK_PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Plano ideal para proprietários individuais',
    price_monthly: 29.99,
    price_yearly: 299.99,
    slug: 'starter',
    pricing_features: MOCK_PRICING_FEATURES,
    most_popular: false,
    is_featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Plano para agentes imobiliários e pequenas imobiliárias',
    price_monthly: 79.99,
    price_yearly: 799.99,
    slug: 'pro',
    pricing_features: [
      { name: 'Até 15 imóveis' },
      { name: 'Suporte prioritário' },
      { name: 'Publicação em todas as plataformas' },
      { name: 'Análise de mercado mensal' },
    ],
    most_popular: true,
    is_featured: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Plano completo para grandes imobiliárias',
    price_monthly: 199.99,
    price_yearly: 1999.99,
    slug: 'enterprise',
    pricing_features: [
      { name: 'Imóveis ilimitados' },
      { name: 'Suporte dedicado' },
      { name: 'Publicação premium' },
      { name: 'Análise de mercado avançada' },
      { name: 'Integração personalizada' },
    ],
    most_popular: false,
    is_featured: true,
  },
]

export function ServerPricing() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Nossos Planos de Precificação
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Escolha o plano que melhor se adapta às suas necessidades imobiliárias
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {MOCK_PRICING_PLANS.map((plan) => (
          <div 
            key={plan.id} 
            className={`
              bg-white shadow-lg rounded-xl p-6 transform transition-all hover:scale-105
              ${plan.most_popular ? 'border-2 border-blue-500' : ''}
              ${plan.is_featured ? 'bg-gradient-to-br from-purple-50 to-blue-50' : ''}
            `}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {plan.name}
              {plan.most_popular && (
                <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded">
                  Mais Popular
                </span>
              )}
            </h3>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">
                R$ {plan.price_monthly.toFixed(2)}
              </span>
              <span className="text-gray-500 ml-2">/ mês</span>
            </div>
            
            <ul className="mb-6 space-y-3">
              {plan.pricing_features?.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-gray-700"
                >
                  <svg 
                    className="w-5 h-5 text-green-500 mr-2" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  {feature.name}
                </li>
              ))}
            </ul>
            
            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              disabled
            >
              Escolher Plano
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

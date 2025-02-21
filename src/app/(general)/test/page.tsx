'use client'

export default function TestPage() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Coluna Esquerda</h2>
        <p className="text-gray-700">
          Esta é a coluna esquerda do nosso layout de duas colunas. 
          Aqui podemos adicionar conteúdo informativo ou componentes 
          específicos para a página de teste.
        </p>
        <ul className="list-disc list-inside mt-4 text-gray-600">
          <li>Item de lista 1</li>
          <li>Item de lista 2</li>
          <li>Item de lista 3</li>
        </ul>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Coluna Direita</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-medium">Seção 1</h3>
            <p className="text-sm text-gray-700">
              Conteúdo da primeira subseção
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <h3 className="font-medium">Seção 2</h3>
            <p className="text-sm text-gray-700">
              Conteúdo da segunda subseção
            </p>
          </div>
          <div className="bg-purple-100 p-4 rounded col-span-2">
            <h3 className="font-medium">Seção Completa</h3>
            <p className="text-sm text-gray-700">
              Uma seção que ocupa toda a largura da coluna
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

export default function TestLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Test Layout</h1>
            <Link href="/" className="text-blue-600 hover:underline">
              Voltar para Home
            </Link>
          </div>
        </header>
        
        <main className="bg-white rounded-lg shadow-md p-6">
          {children}
        </main>
        
        <footer className="mt-6 text-center text-gray-600">
          <p> 2024 Apto Rio - Página de Teste</p>
        </footer>
      </div>
    </div>
  )
}

'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/login-form"
import { createClientSupabaseClient } from '@/utils/supabase/server'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const handleLogin = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Use client Supabase instance
    const supabase = createClientSupabaseClient()

    // Use Promise-based approach instead of async/await
    supabase.auth.signInWithPassword({
      email,
      password
    })
    .then(({ data, error }) => {
      if (error) throw error

      // Fetch user metadata
      return supabase.auth.getUser()
    })
    .then(({ data: { user } }) => {
      if (!user) throw new Error('Usuário não encontrado')

      // Route based on user type
      switch (user.user_metadata?.user_type) {
        case 'developer':
          router.push('/profile/developer')
          break
        case 'agent':
          router.push('/profile/agent')
          break
        case 'investor':
          router.push('/profile/investor')
          break
        default:
          router.push('/dashboard')
      }
    })
    .catch((error) => {
      console.error('Erro de autenticação:', error)
      setAuthError(error.message || 'Erro de autenticação')
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login - Apto.rio</CardTitle>
          <CardDescription>Faça login para acessar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          {authError && (
            <div className="mb-4 text-red-500">
              {authError}
            </div>
          )}
          <LoginForm 
            onSubmit={handleLogin} 
            isLoading={isLoading} 
          />
          <div className="mt-4 text-center">
            <Link href="/signup" className="text-blue-600 hover:underline">
              Criar nova conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

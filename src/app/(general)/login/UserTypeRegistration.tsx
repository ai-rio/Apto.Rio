'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"

// Zod schema for login validation
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória')
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setAuthError(null)

    try {
      // TODO: Implement Supabase login
      console.log('Logging in', { email: data.email })
      
      // Reset form after successful action
      reset()
    } catch (error) {
      console.error('Login error', error)
      setAuthError('Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login no Apto.rio</CardTitle>
        <CardDescription>
          Faça login para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            {/* Email Input */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field}
                    id="email" 
                    type="email" 
                    placeholder="Seu e-mail" 
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field}
                    id="password" 
                    type="password" 
                    placeholder="Sua senha" 
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Authentication Error Message */}
            {authError && (
              <div className="text-red-500 text-sm text-center">
                {authError}
              </div>
            )}
          </div>

          <CardFooter className="flex flex-col space-y-4 mt-4 p-0">
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.login className="mr-2 h-4 w-4" />
              )}
              Entrar
            </Button>

            <p className="text-sm text-center">
              Não tem uma conta? 
              <Link 
                href="/register" 
                className="ml-1 text-primary hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

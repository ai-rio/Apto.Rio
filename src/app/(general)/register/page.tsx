'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/ui/icons"
import { createBrowserClient } from '@supabase/ssr'

// Zod schema for registration validation
const registrationSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
  confirmPassword: z.string(),
  userType: z.enum(['developer', 'agent', 'investor'], {
    errorMap: () => ({ message: 'Selecione um tipo de usuário válido' })
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  // Create Supabase client on the client side
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { 
    control, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      userType: undefined
    }
  })

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true)
    setAuthError(null)

    try {
      // Supabase registration with user type in metadata
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            user_type: data.userType
          }
        }
      })

      if (error) throw error

      // Check if user was created successfully
      if (authData.user) {
        // Redirect based on user type
        switch (data.userType) {
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
      } else {
        throw new Error('Falha na criação do usuário')
      }

      // Reset form after successful action
      reset()
    } catch (error: any) {
      console.error('Registration error', error)
      setAuthError(error.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Cadastro no Apto.rio</CardTitle>
        <CardDescription>
          Crie sua conta e comece a usar o Apto.rio
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

            {/* Confirm Password */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field}
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirme sua senha" 
                  />
                )}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* User Type Selection */}
            <div className="flex flex-col space-y-1.5">
              <Label>Tipo de Usuário</Label>
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="developer">Desenvolvedor</SelectItem>
                      <SelectItem value="agent">Corretor</SelectItem>
                      <SelectItem value="investor">Investidor</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.userType && (
                <p className="text-red-500 text-sm">{errors.userType.message}</p>
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
                "Criar Conta"
              )}
            </Button>

            <p className="text-sm text-center">
              Já tem uma conta? 
              <Link 
                href="/login" 
                className="ml-1 text-primary hover:underline"
              >
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

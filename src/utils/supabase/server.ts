import { createServerClient } from '@supabase/ssr'
import { createBrowserClient } from '@supabase/ssr'
import { cache } from 'react'
import { z } from 'zod'

// Supabase client configuration schema
const SupabaseConfigSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('URL inválida do Supabase'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Chave Supabase não configurada'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional()
})

// Validate Supabase environment configuration
function validateSupabaseConfig() {
  try {
    return SupabaseConfigSchema.parse({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
    })
  } catch (error) {
    console.error('Erro de configuração do Supabase:', error)
    throw new Error('Configuração do Supabase inválida')
  }
}

// Server-side Supabase client creation (only used in server components)
export const createServerSupabaseClient = cache(() => {
  const config = validateSupabaseConfig()
  
  try {
    const { cookies } = require('next/headers')
    const cookieStore = cookies()

    return createServerClient(
      config.NEXT_PUBLIC_SUPABASE_URL,
      config.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              console.error('Erro ao definir cookie:', error)
            }
          },
          remove(name: string, options: any) {
            try {
              cookieStore.delete({ name, ...options })
            } catch (error) {
              console.error('Erro ao remover cookie:', error)
            }
          },
        },
      }
    )
  } catch (error) {
    console.error('Erro na criação do cliente Supabase no servidor:', error)
    throw new Error('Falha ao inicializar cliente Supabase')
  }
})

// Client-side Supabase client creation (used in client components)
export function createClientSupabaseClient() {
  const config = validateSupabaseConfig()
  
  return createBrowserClient(
    config.NEXT_PUBLIC_SUPABASE_URL,
    config.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Type-safe wrapper for client-side use
export function getSupabaseClient(context: 'server' | 'client' = 'client') {
  return context === 'server' 
    ? createServerSupabaseClient() 
    : createClientSupabaseClient()
}

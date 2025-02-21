'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function InvestorProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user || user.user_metadata?.user_type !== 'investor') {
        router.push('/login')
        return
      }

      setUser(user)
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return null

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Perfil do Investidor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="font-semibold">E-mail:</p>
          <p>{user.email}</p>
        </div>
        <div>
          <p className="font-semibold">Tipo de Usuário:</p>
          <p>Investidor</p>
        </div>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleLogout}
        >
          Sair
        </Button>
      </CardContent>
    </Card>
  )
}

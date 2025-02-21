import { Metadata } from "next"
import { createClient } from "@/utils/supabase/server"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    return {
      title: user 
        ? `Perfil de ${user.user_metadata?.full_name || 'Usuário'} - Apto.rio` 
        : "Perfil do Usuário - Apto.rio",
      description: "Gerencie suas informações de perfil e configurações"
    }
  } catch (error) {
    return {
      title: "Perfil do Usuário - Apto.rio",
      description: "Gerencie suas informações de perfil e configurações"
    }
  }
}

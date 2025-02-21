import { redirect } from "next/navigation"
import Link from "next/link"
import { createServerSupabaseClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb"
import { 
  Edit2, 
  Lock, 
  User, 
  CreditCard, 
  Calendar 
} from "lucide-react"

export default async function UserProfilePage() {
  const supabase = createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Início</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Painel</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Perfil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">E-mail</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p className="font-medium">
                  {user.user_metadata?.full_name || 'Não definido'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Usuário</p>
                <p className="font-medium">
                  {user.user_metadata?.user_type || 'Não definido'}
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/profile/edit">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Editar Perfil
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/profile/change-password">
                  <Lock className="mr-2 h-4 w-4" />
                  Alterar Senha
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Detalhes da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Assinatura</p>
                <p className="font-medium">
                  {user.user_metadata?.subscription_type || 'Não definido'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Registro</p>
                <p className="font-medium flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

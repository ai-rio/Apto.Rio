import { createServerSupabaseClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import AppSidebar from "@/components/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Building, 
  Users, 
  CreditCard, 
  ChartBar 
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const userType = user.user_metadata?.user_type || 'default'

  const dashboardConfig = {
    developer: {
      title: "Painel do Desenvolvedor",
      stats: [
        { 
          label: "Projetos Ativos", 
          value: "3", 
          icon: Building 
        },
        { 
          label: "Projetos Concluídos", 
          value: "7", 
          icon: ChartBar 
        }
      ]
    },
    agent: {
      title: "Painel do Corretor",
      stats: [
        { 
          label: "Imóveis Disponíveis", 
          value: "12", 
          icon: Building 
        },
        { 
          label: "Clientes Ativos", 
          value: "45", 
          icon: Users 
        }
      ]
    },
    investor: {
      title: "Painel do Investidor",
      stats: [
        { 
          label: "Investimentos Ativos", 
          value: "5", 
          icon: CreditCard 
        },
        { 
          label: "Retorno Total", 
          value: "R$ 250.000", 
          icon: ChartBar 
        }
      ]
    },
    default: {
      title: "Painel",
      stats: []
    }
  }

  const { title, stats } = dashboardConfig[userType] || dashboardConfig.default

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

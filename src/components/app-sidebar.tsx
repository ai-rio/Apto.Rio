import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  CreditCard, 
  Settings, 
  HelpCircle,
  LogOut 
} from "lucide-react"
import { createServerSupabaseClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"
import { logout } from "@/actions/auth"

// Define menu items based on user role
const getUserMenuItems = (userType: string) => {
  const commonItems = [
    {
      label: "Painel",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Perfil",
      href: "/profile",
      icon: Users,
    },
    {
      label: "Configurações",
      href: "/settings",
      icon: Settings,
    },
    {
      label: "Ajuda",
      href: "/help",
      icon: HelpCircle,
    }
  ]

  const roleSpecificItems = {
    developer: [
      ...commonItems,
      {
        label: "Meus Projetos",
        href: "/projects",
        icon: Building,
      }
    ],
    agent: [
      ...commonItems,
      {
        label: "Imóveis",
        href: "/properties",
        icon: Building,
      },
      {
        label: "Clientes",
        href: "/clients",
        icon: Users,
      }
    ],
    investor: [
      ...commonItems,
      {
        label: "Investimentos",
        href: "/investments",
        icon: CreditCard,
      }
    ]
  }

  return roleSpecificItems[userType] || commonItems
}

export default async function AppSidebar() {
  const supabase = createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/login")
  }

  const userType = user.user_metadata?.user_type || 'default'
  const menuItems = getUserMenuItems(userType)

  return (
    <Card className="w-64 h-screen overflow-y-auto bg-secondary flex flex-col">
      <CardHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage 
              src={user.user_metadata?.avatar_url || '/default-avatar.png'} 
              alt={user.user_metadata?.full_name || 'User Avatar'}
            />
            <AvatarFallback>
              {user.user_metadata?.full_name 
                ? user.user_metadata.full_name.charAt(0).toUpperCase() 
                : 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">
              {user.user_metadata?.full_name || 'Usuário'}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.user_metadata?.user_type || 'Sem tipo'}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-2 flex-grow">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <TooltipProvider key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </CardContent>

      <CardContent className="border-t border-border p-2">
        <form action={logout}>
          <Button 
            type="submit" 
            variant="destructive" 
            className="w-full justify-start"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

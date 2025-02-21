import { redirect } from 'next/navigation'
import AppSidebar from '@/components/app-sidebar'
import { createServerSupabaseClient } from '@/utils/supabase/server'

export default async function ProtectedLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const supabase = createServerSupabaseClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 p-4 bg-background text-foreground">
        {children}
      </main>
    </div>
  )
}

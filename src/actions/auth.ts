"use server"

import { createServerSupabaseClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logout() {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error("Logout error:", error)
    return { error: "Erro ao fazer logout" }
  }
  
  // Clear all cookies
  cookies().getAll().forEach((cookie) => {
    cookies().delete(cookie.name)
  })
  
  // Redirect to login page
  redirect("/login")
}

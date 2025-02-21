'use client'

import { AppProviders } from '@/providers/app-providers'
import GeneralLayout from '@/components/layouts/General'
import { ReactNode } from 'react'

export default function ClientLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <AppProviders>
      <GeneralLayout>{children}</GeneralLayout>
    </AppProviders>
  )
}

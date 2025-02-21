import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['200', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Apto Rio',
  description: 'Real estate platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}

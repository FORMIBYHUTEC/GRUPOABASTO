import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import { IntroLoader } from "@/components/intro-loader"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Grupo Abasto | Proveedor de Materias Primas",
  description:
    "Tu aliado estratégico en abastecimiento. Insumos, empaques y productos de limpieza con entregas rápidas y precios competitivos para tu negocio.",
  generator: "v0.app",
  icons: {
    icon: "/grupo-abasto-logo.png",
    apple: "/grupo-abasto-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <IntroLoader />
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}

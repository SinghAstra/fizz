import type { Metadata } from "next"
import { Archivo, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const archivo = Archivo({ weight: ["400", "500", "900"], variable: "--font-archivo", subsets: ["latin"] })
const mono = JetBrains_Mono({ weight: ["400", "600"], variable: "--font-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ItzFizz",
  description: "Scroll driven hero section."
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}

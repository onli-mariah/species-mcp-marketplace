import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LoadingScreen } from "@/components/loading-screen"
import { PageTransition } from "@/components/page-transition"
import "./globals.css"

const montserrat = Montserrat({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Species.market",
  description:
    "A developer use-case demo showcasing a headless marketplace built on the Onli ecosystem.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <LoadingScreen />
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  )
}

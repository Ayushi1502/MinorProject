import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "PathShala AI - Smarter Tools for Learning & Upskilling",
  description: "AI-powered educational platform with personalized roadmaps, resume builder, and mentorship",
  generator: "PathShala AI",
  icons: {
    icon: "/main_logo.jpg",   // stored in /public/logo.png
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ThemeProvider>
        </Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

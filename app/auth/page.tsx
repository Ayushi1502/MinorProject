"use client"

import { MainLayout } from "@/components/main-layout"
import { AuthForm } from "@/components/auth/auth-form"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  return (
    <MainLayout>
      <div className="absolute top-4 left-4 z-10">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthForm />
      </div>
    </MainLayout>
  )
}

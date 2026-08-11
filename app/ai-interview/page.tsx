"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MainLayout } from "@/components/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AIInterviewPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const startQuiz = async () => {
    setIsLoading(true)
    // Simulate API call to Gemini
    setTimeout(() => {
      setIsLoading(false)
      // Redirect back to quiz page with results
      router.push("/quiz?completed=true")
    }, 3000)
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            {/* Back button */}
            <Link href="/quiz">
              <Button variant="ghost" className="mb-6 p-0 h-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Interview Preparation
              </Button>
            </Link>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-center mb-4">
              <span className="text-primary">AI Mock</span> Interview
            </h1>
            <p className="text-center text-muted-foreground mb-8">Test your knowledge</p>

            {/* Quiz card */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to test your knowledge?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isLoading ? (
                  <div className="py-8">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-lg font-medium">Generating your AI quiz...</p>
                    <p className="text-sm text-muted-foreground">This may take a few moments</p>
                  </div>
                ) : (
                  <>
                    <div className="py-4">
                      <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Our AI will generate personalized questions based on your learning progress
                      </p>
                    </div>
                    <Button onClick={startQuiz} size="lg" className="w-full">
                      Start Quiz
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  )
}

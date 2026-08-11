"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LegalPageProps {
  title: string
  lastUpdated: string
  content: string
}

export function LegalPage({ title, lastUpdated, content }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">{title}</CardTitle>
              <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{content}</p>

                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    This is a placeholder page for demonstration purposes. In a production application, this would
                    contain the complete legal documentation with proper sections, subsections, and detailed information
                    relevant to the {title.toLowerCase()}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

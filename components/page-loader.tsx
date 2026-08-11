"use client"

import { motion } from "framer-motion"
import { Atom, FileText, Users, DollarSign, User, BookOpen, MessageSquare, BarChart3 } from "lucide-react"

interface PageLoaderProps {
  type: "roadmap" | "resume" | "mentors" | "pricing" | "profile" | "quiz" | "chat" | "insights"
}

const loaderConfig = {
  roadmap: { icon: Atom, color: "text-blue-500" },
  resume: { icon: FileText, color: "text-green-500" },
  mentors: { icon: Users, color: "text-purple-500" },
  pricing: { icon: DollarSign, color: "text-yellow-500" },
  profile: { icon: User, color: "text-pink-500" },
  quiz: { icon: BookOpen, color: "text-indigo-500" },
  chat: { icon: MessageSquare, color: "text-teal-500" },
  insights: { icon: BarChart3, color: "text-orange-500" },
}

export function PageLoader({ type }: PageLoaderProps) {
  const { icon: Icon, color } = loaderConfig[type]

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Icon className={`h-12 w-12 ${color}`} />
        </motion.div>
        <p className="text-muted-foreground">Loading...</p>
      </motion.div>
    </div>
  )
}

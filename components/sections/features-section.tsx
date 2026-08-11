"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CardContent } from "@/components/ui/card"
// Updated and more relevant icons from lucide-react
import { Route, FileText, Lightbulb, Briefcase, MessageCircle, Play } from "lucide-react"

const features = [
  {
    id: "roadmaps",
    icon: Route,
    title: "Personalized AI Roadmaps",
    subtitle: "Your Unique Path to Success",
    content: {
      title: "Dynamically Generated Learning Journeys",
      description: "Our fine-tuned AI analyzes your profile to generate a unique, step-by-step career roadmap, guiding you from your current skills to your dream job.",
      highlights: [
        "Tailored to your specific career goals",
        "Adapts to your experience level",
        "Includes real-world projects",
        "Track your progress visually",
      ],
      image: "/Roadmapfeature.mp4",
    },
  },
  {
    id: "resume",
    icon: FileText,
    title: "AI Resume Builder",
    subtitle: "Craft the Perfect Resume",
    content: {
      title: "Build a Job-Winning Resume, Instantly",
      description: "Create a professional, ATS-friendly resume with AI assistance. Get feedback, improve your content, and tailor it to specific job descriptions.",
      highlights: [
        "AI-powered content suggestions",
        "Real-time ATS scoring and feedback",
        "Professional templates",
        "Tailor for any job application",
      ],
      image: "/Resume.mp4",
    },
  },
  {
    id: "quiz",
    icon: Lightbulb,
    title: "Adaptive AI Quizzes",
    subtitle: "Test and Solidify Your Knowledge",
    content: {
      title: "Intelligent Skill Assessments",
      description: "Validate your learning with AI-generated quizzes that adapt to your knowledge level and the skills outlined in your personal roadmap.",
      highlights: [
        "Personalized question difficulty",
        "Instant, detailed explanations",
        "Identify and fill knowledge gaps",
        "Prepare for technical interviews",
      ],
      image: "/quiz.mp4",
    },
  },
  {
    id: "mentors",
    icon: Briefcase,
    title: "Mentor Connect",
    subtitle: "Guidance from Industry Experts",
    content: {
      title: "Book Sessions with Professionals",
      description: "Connect with and book one-on-one sessions with experienced mentors from your industry to get personalized advice and career guidance.",
      highlights: [
        "Filter mentors by specialty",
        "Easy scheduling and booking",
        "Get expert career advice",
        "Build your professional network",
      ],
      image: "/Mentor.mp4",
    },
  },
  {
    id: "chatbot",
    icon: MessageCircle,
    title: "AI Career Chatbot",
    subtitle: "Your 24/7 Career Advisor",
    content: {
      title: "Instant, Personalized Guidance",
      description: "Ask questions and get immediate, context-aware advice from our AI chatbot that understands your profile, your roadmap, and your career goals.",
      highlights: [
        "Ask complex career questions",
        "Get instant explanations on topics",
        "Brainstorm project ideas",
        "Practice interview answers",
      ],
      image: "/Chatbot.mp4",
    },
  },
]

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(features[0])

  return (
    <section className="py-24 bg-black border border-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Everything You Need to <span className="text-primary">Master</span> Your Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive tools and resources designed to accelerate your learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Feature list */}
          <motion.div
            className="space-y-4 border-background border-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">EXPLORE FEATURES</h3>
            {features.map((feature) => {
              const Icon = feature.icon
              const isActive = activeFeature.id === feature.id

              return (
                <motion.div
                  key={feature.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isActive ? "bg-primary/10 border-primary/50" : "bg-card border-border hover:border-border/80"
                  }`}
                  onClick={() => setActiveFeature(feature)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isActive ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Right columns - Feature content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative aspect-video min-h-[500px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-border/50 overflow-hidden">
                  {activeFeature.content.image.endsWith('.mp4') ? (
                    <video
                      src={activeFeature.content.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={activeFeature.content.image || "/placeholder.svg"}
                      alt={activeFeature.content.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
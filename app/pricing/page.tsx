"use client"

import { MainLayout } from "@/components/main-layout"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FeaturesSection } from "@/components/sections/features-section"
import { Check, ChevronDown, Star, Zap, Crown } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Basic",
    price: "FREE",
    period: "",
    description: "Perfect for getting started with your learning journey",
    features: [
      "Access to 1 AI roadmap",
      "10 AI quiz attempts per month",
      "20 Credits for AI Chat",
      "Basic progress tracking",
      "24/7 Forum support",
      "1 AI Resume builder access",
    ],
    cta: "Get Started",
    popular: false,
    icon: Zap,
    colorScheme: "blue",
  },
  {
    name: "Premium",
    price: "₹750",
    period: "per month",
    description: "Everything you need to accelerate your career growth",
    features: [
      "Everything in Basic",
      "5 AI Roadmap Generator",
      "Unlimited AI quiz attempts",
      "50 credits AI Chat daily",
      "Advanced Learning Progress Tracker",
      "50 AI quiz attempts per month",
      "1-on-1 mentor sessions (2/month)",
      "Priority Mentor Scheduling",
      "Unlimited AI resume builder access",
    ],
    cta: "Start Premium",
    popular: true,
    icon: Crown,
    colorScheme: "yellow",
  },
]

const faqs = [
  {
    question: "What's included in the Basic plan?",
    answer:
      "The Basic plan includes access to fundamental roadmaps, 10 AI quiz attempts per month, community access, basic progress tracking, email support, and resume builder with basic templates.",
  },
  {
    question: "Can I upgrade from Basic to Premium anytime?",
    answer:
      "Yes, you can upgrade your subscription at any time. Your access will be upgraded immediately, and you'll be charged the prorated difference for the current billing period.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
  },
  {
    question: "Is there a student discount?",
    answer:
      "Yes! Students with a valid .edu email address can get 50% off any plan. Contact our support team to verify your student status.",
  },
  {
    question: "How does the AI analyzer work?",
    answer:
      "Our AI analyzer uses advanced machine learning models to review your code, identify potential issues, suggest improvements, and provide personalized feedback based on industry best practices.",
  },
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">
                Choose Your <span className="text-primary">Learning</span> Plan
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Unlock your potential with our comprehensive learning platform. Start with <span className="text-blue-500">Basic</span> or go <span className="text-yellow-400">Premium</span> for
                unlimited access.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan, index) => {
                const Icon = plan.icon
                const isBlue = plan.colorScheme === "blue"
                const isYellow = plan.colorScheme === "yellow"

                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="relative"
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-yellow-500 text-black px-4 py-1 font-semibold">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      </div>
                    )}

                    <Card
                      className={`h-full relative transition-all duration-300 hover:scale-105 ${
                        isBlue
                          ? "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                          : "border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)]"
                      }`}
                      style={{
                        background: isBlue
                          ? "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(30,64,175,0.05) 100%)"
                          : "linear-gradient(135deg, rgba(234,179,8,0.05) 0%, rgba(161,98,7,0.05) 100%)",
                      }}
                    >
                      <CardHeader className="text-center pb-8">
                        <div className="flex justify-center mb-4">
                          <div
                            className={`p-4 rounded-full ${
                              isBlue
                                ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                                : "bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                            }`}
                          >
                            <Icon className="h-8 w-8" />
                          </div>
                        </div>
                        <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                        <div className="mt-6">
                          <span className={`text-5xl font-bold ${isBlue ? "text-blue-500" : "text-yellow-500"}`}>
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground ml-2 text-lg">{plan.period}</span>
                        </div>
                        <CardDescription className="mt-4 text-lg text-pretty">{plan.description}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          {plan.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start space-x-3">
                              <Check
                                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${isBlue ? "text-blue-500" : "text-yellow-500"}`}
                              />
                              <span className="text-base">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button
                          className={`w-full text-lg py-6 font-semibold transition-all duration-300 ${
                            isBlue
                              ? "bg-blue-500 hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                              : "bg-yellow-500 hover:bg-yellow-600 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
                          }`}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* FAQ Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Everything you need to know about our plans and features
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Collapsible
                    open={openFaq === index}
                    onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <CollapsibleTrigger asChild>
                      <Card className="cursor-pointer card-hover">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                          <CardTitle className="text-lg font-semibold text-left">{faq.question}</CardTitle>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openFaq === index ? "transform rotate-180" : ""
                            }`}
                          />
                        </CardHeader>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card className="mt-2 border-t-0 rounded-t-none">
                        <CardContent className="pt-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
                Ready to Start Your <span className="text-primary">Learning Journey</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
                Join thousands of learners who are already advancing their careers with PathShala AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="btn-premium">
                  Start Free Trial
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}

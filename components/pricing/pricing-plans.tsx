"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Check,
  Star,
  Zap,
  Crown,
  ArrowRight,
  ChevronDown,
  Brain,
  Target,
  Users,
  Rocket,
  Shield,
  Award,
} from "lucide-react"

const plans = {
  monthly: {
    basic: {
      name: "Basic",
      price: 29,
      description: "Perfect for getting started with your learning journey",
      features: [
        "Access to all roadmaps",
        "20 AI credits per month",
        "Basic resume builder",
        "Community access",
        "Email support",
        "Progress tracking",
      ],
      limitations: ["Limited AI quiz attempts", "Basic templates only", "No priority support"],
    },
    premium: {
      name: "Premium",
      price: 79,
      description: "Everything you need to accelerate your career growth",
      popular: true,
      features: [
        "Everything in Basic",
        "Unlimited AI credits",
        "Advanced resume builder with premium templates",
        "1-on-1 mentor sessions (2 hours/month)",
        "Priority support",
        "Advanced analytics",
        "Custom learning paths",
        "Interview preparation tools",
        "Career guidance sessions",
        "Exclusive community access",
        "Certificate verification",
        "Job placement assistance",
      ],
      limitations: [],
    },
  },
  yearly: {
    basic: {
      name: "Basic",
      price: 290,
      originalPrice: 348,
      description: "Perfect for getting started with your learning journey",
      features: [
        "Access to all roadmaps",
        "20 AI credits per month",
        "Basic resume builder",
        "Community access",
        "Email support",
        "Progress tracking",
      ],
      limitations: ["Limited AI quiz attempts", "Basic templates only", "No priority support"],
    },
    premium: {
      name: "Premium",
      price: 790,
      originalPrice: 948,
      description: "Everything you need to accelerate your career growth",
      popular: true,
      features: [
        "Everything in Basic",
        "Unlimited AI credits",
        "Advanced resume builder with premium templates",
        "1-on-1 mentor sessions (2 hours/month)",
        "Priority support",
        "Advanced analytics",
        "Custom learning paths",
        "Interview preparation tools",
        "Career guidance sessions",
        "Exclusive community access",
        "Certificate verification",
        "Job placement assistance",
      ],
      limitations: [],
    },
  },
}

export function PricingPlans() {
  const [isYearly, setIsYearly] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const currentPlans = isYearly ? plans.yearly : plans.monthly

  const handleGetStarted = (planName: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log(`Getting started with ${planName} plan`)
    }, 1000)
  }

  const savings = {
    basic: Math.round(
      ((plans.monthly.basic.price * 12 - plans.yearly.basic.price) / (plans.monthly.basic.price * 12)) * 100,
    ),
    premium: Math.round(
      ((plans.monthly.premium.price * 12 - plans.yearly.premium.price) / (plans.monthly.premium.price * 12)) * 100,
    ),
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Personalized roadmaps and quizzes powered by advanced AI technology",
    },
    {
      icon: Target,
      title: "Goal-Oriented Approach",
      description: "Set and track your learning goals with precision and clarity",
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Connect with industry experts for personalized guidance",
    },
    {
      icon: Rocket,
      title: "Career Acceleration",
      description: "Fast-track your career with our comprehensive tools and resources",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security",
    },
    {
      icon: Award,
      title: "Certified Learning",
      description: "Earn certificates that are recognized by top companies",
    },
  ]

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
    },
    {
      question: "What are AI credits?",
      answer:
        "AI credits are used for AI-powered features like personalized roadmaps, quiz generation, and resume optimization. Premium users get unlimited credits.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! You can try our Basic plan free for 7 days. No credit card required to get started.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll provide a full refund.",
    },
    {
      question: "How does the mentorship program work?",
      answer:
        "Premium users get access to 1-on-1 sessions with industry experts. You can book sessions through our platform and choose mentors based on your field of interest.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose Your <span className="text-primary">Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unlock your potential with our comprehensive learning platform. Start free or go premium for advanced
            features.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Label htmlFor="billing-toggle" className={!isYearly ? "text-foreground" : "text-muted-foreground"}>
              Monthly
            </Label>
            <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
            <Label htmlFor="billing-toggle" className={isYearly ? "text-foreground" : "text-muted-foreground"}>
              Yearly
            </Label>
            {isYearly && (
              <Badge variant="secondary" className="ml-2">
                Save up to {savings.premium}%
              </Badge>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="h-full relative card-hover">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl">{currentPlans.basic.name}</CardTitle>
                <CardDescription className="text-base">{currentPlans.basic.description}</CardDescription>

                <div className="mt-6">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">${currentPlans.basic.price}</span>
                    <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                  </div>
                  {isYearly && currentPlans.basic.originalPrice && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="text-sm text-muted-foreground line-through">
                        ${currentPlans.basic.originalPrice}/year
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Save {savings.basic}%
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    What's included
                  </h4>
                  {currentPlans.basic.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {currentPlans.basic.limitations.length > 0 && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Limitations
                      </h4>
                      {currentPlans.basic.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="h-4 w-4 mt-0.5 flex-shrink-0">
                            <div className="h-1 w-4 bg-muted-foreground/30 rounded"></div>
                          </div>
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <Button
                  onClick={() => handleGetStarted(currentPlans.basic.name)}
                  variant="outline"
                  className="w-full mt-8 bg-transparent btn-glossy"
                  disabled={isLoading}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="h-full relative border-primary shadow-lg card-hover">
              {currentPlans.premium.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">{currentPlans.premium.name}</CardTitle>
                <CardDescription className="text-base">{currentPlans.premium.description}</CardDescription>

                <div className="mt-6">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">${currentPlans.premium.price}</span>
                    <span className="text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                  </div>
                  {isYearly && currentPlans.premium.originalPrice && (
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="text-sm text-muted-foreground line-through">
                        ${currentPlans.premium.originalPrice}/year
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Save {savings.premium}%
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Everything included
                  </h4>
                  {currentPlans.premium.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleGetStarted(currentPlans.premium.name)}
                  className="w-full mt-8 btn-premium"
                  disabled={isLoading}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PathShala AI?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the powerful features that make our platform the best choice for your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="h-full card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Separator Line */}
        <div className="mt-20">
          <Separator className="mb-16" />
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Get answers to the most common questions about our platform</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible
                key={index}
                open={openFaq === index}
                onOpenChange={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                  <h4 className="font-semibold">{faq.question}</h4>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

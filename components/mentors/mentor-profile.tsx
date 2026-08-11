"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookingCalendar } from "./booking-calendar"
import { PaymentModal } from "./payment-modal"
import { Star, MapPin, Calendar, Users, Clock, Globe, MessageCircle, Award, CheckCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface MentorProfileProps {
  mentor: {
    id: string
    name: string
    title: string
    specialization: string
    location: string
    rating: number
    reviews: number
    experience: string
    price: string
    avatar: string
    bio: string
    skills: string[]
    availability: string
    sessions: number
    languages: string[]
    timezone: string
    responseTime: string
    successRate: string
    expertise: string[]
  }
}

export function MentorProfile({ mentor }: MentorProfileProps) {
  const router = useRouter()
  const [showBooking, setShowBooking] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const handleBookingConfirm = (slot: any) => {
    setSelectedSlot(slot)
    setShowBooking(false)
    setShowPayment(true)
  }

  const handlePaymentSuccess = () => {
    setShowPayment(false)
    // Here you would typically handle the successful booking
    console.log("Booking confirmed for:", selectedSlot)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/mentors")}
            className="flex items-center space-x-2 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Mentors</span>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mentor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Profile Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="card-hover">
                <CardHeader className="pb-6">
                  <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Avatar className="h-24 w-24 sm:h-32 sm:w-32 ring-4 ring-primary/20">
                        <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-2xl">
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold">{mentor.name}</CardTitle>
                        <p className="text-lg text-muted-foreground mt-1">{mentor.title}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-sm">
                          {mentor.specialization}
                        </Badge>
                        <Badge
                          variant={mentor.availability === "Available" ? "default" : "outline"}
                          className="text-sm"
                        >
                          {mentor.availability}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{mentor.rating}</span>
                          <span className="text-muted-foreground">({mentor.reviews})</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{mentor.experience}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{mentor.sessions} sessions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">{mentor.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Skills & Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.skills.map((skill) => (
                        <motion.div key={skill} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Badge variant="outline" className="hover:bg-primary/10 transition-colors">
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Areas of Expertise</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mentor.expertise.map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="card-hover h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <span>Languages & Timezone</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Languages</p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.languages.map((lang) => (
                          <Badge key={lang} variant="secondary" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Timezone</p>
                      <p className="text-sm text-muted-foreground">{mentor.timezone}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="card-hover h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span>Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Response Time</span>
                      <span className="text-sm font-medium">{mentor.responseTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="text-sm font-medium text-green-600">{mentor.successRate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Sessions</span>
                      <span className="text-sm font-medium">{mentor.sessions}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="card-hover sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Book a Session</span>
                    <div className="text-2xl font-bold text-primary">{mentor.price}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowBooking(true)}
                      className="w-full btn-premium"
                      disabled={mentor.availability === "Busy"}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {mentor.availability === "Available" ? "Schedule Session" : "Currently Unavailable"}
                    </Button>

                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>

                  <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Responds {mentor.responseTime.toLowerCase()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{mentor.successRate} success rate</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Calendar Modal */}
      {showBooking && (
        <BookingCalendar mentor={mentor} onClose={() => setShowBooking(false)} onConfirm={handleBookingConfirm} />
      )}

      {/* Payment Modal */}
      {showPayment && selectedSlot && (
        <PaymentModal
          mentor={mentor}
          slot={selectedSlot}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}

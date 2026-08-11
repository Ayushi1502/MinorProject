"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // Added Next.js router import
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageLoader } from "@/components/page-loader"
import { Search, Star, MapPin, Calendar, Users } from "lucide-react"

const mentors = [
  {
    id: "1",
    name: "Aditi Sharma",
    title: "Senior Software Engineer at Google",
    specialization: "Frontend Development",
    location: "Bangalore, India",
    rating: 4.9,
    reviews: 127,
    experience: "8+ years",
    price: "₹1500/slot",
    avatar: "/Mentor3.jpg",
    bio: "Passionate about React, TypeScript, and modern web development. Helped 200+ developers land their dream jobs.",
    skills: ["React", "TypeScript", "Next.js", "System Design"],
    availability: "Available",
    sessions: 340,
  },
  {
    id: "2",
    name: "Arjun Mehta",
    title: "Principal Engineer at Netflix",
    specialization: "Backend Development",
    location: "Kolkata, India",
    rating: 4.8,
    reviews: 89,
    experience: "12+ years",
    price: "₹1500/slot",
    avatar: "/Mentor2.jpg",
    bio: "Expert in distributed systems, microservices, and cloud architecture. Former tech lead at multiple startups.",
    skills: ["Node.js", "Python", "AWS", "Kubernetes"],
    availability: "Busy",
    sessions: 256,
  },
  {
    id: "3",
    name: "Priya Reddy",
    title: "UX Design Lead at Airbnb",
    specialization: "UI/UX Design",
    location: "New York, NY",
    rating: 5.0,
    reviews: 156,
    experience: "10+ years",
    price: "₹1500/slot",
    avatar: "/Mentor4.jpg",
    bio: "Design systems expert with a passion for user-centered design. Mentored designers at top tech companies.",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    availability: "Available",
    sessions: 423,
  },
  {
    id: "4",
    name: "Rohit Kapoor",
    title: "Data Science Manager at Meta",
    specialization: "Data Science",
    location: "Mumbai, India",
    rating: 4.7,
    reviews: 73,
    experience: "9+ years",
    price: "₹1500/slot",
    avatar: "/Mentor1.jpg",
    bio: "Machine learning expert specializing in recommendation systems and NLP. PhD in Computer Science.",
    skills: ["Python", "TensorFlow", "SQL", "Machine Learning"],
    availability: "Available",
    sessions: 189,
  },
  {
    id: "5",
    name: "Sneha Iyer",
    title: "DevOps Engineer at Amazon",
    specialization: "DevOps",
    location: "Lucknow, India",
    rating: 4.9,
    reviews: 94,
    experience: "7+ years",
    price: "₹1500/slot",
    avatar: "/Mentor6.jpg",
    bio: "Cloud infrastructure specialist with expertise in CI/CD pipelines and container orchestration.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    availability: "Available",
    sessions: 278,
  },
  {
    id: "6",
    name: "Vikram Nair",
    title: "Security Architect at Microsoft",
    specialization: "Cybersecurity",
    location: "Dellas, Texas",
    rating: 4.8,
    reviews: 67,
    experience: "11+ years",
    price: "₹1500/slot",
    avatar: "/Mentor5.jpg",
    bio: "Cybersecurity expert with focus on application security and penetration testing. CISSP certified.",
    skills: ["Penetration Testing", "Security Auditing", "Risk Assessment", "Compliance"],
    availability: "Busy",
    sessions: 145,
  },
  {
    id: "7",
    name: "Praneet Singhla",
    title: "Senior Product Manager at Spotify",
    specialization: "Product Management",
    location: "London, UK",
    rating: 4.9,
    reviews: 112,
    experience: "9+ years",
    price: "₹1500/slot",
    avatar: "/Mentor7.jpg",
    bio: "Passionate about building user-centric products. Specialize in Agile methodologies and market research.",
    skills: ["Product Strategy", "Agile", "Jira", "Market Research"],
    availability: "Available",
    sessions: 310,
  },
  {
    id: "8",
    name: "Rohan Desai",
    title: "Lead Android Developer at CRED",
    specialization: "Mobile Development",
    location: "Pune, India",
    rating: 4.8,
    reviews: 85,
    experience: "10+ years",
    price: "₹1500/slot",
    avatar: "/Mentor8.png",
    bio: "Expert in native Android development with Kotlin. Focused on clean architecture and high-performance apps.",
    skills: ["Kotlin", "Android SDK", "Jetpack Compose", "MVVM"],
    availability: "Available",
    sessions: 220,
  },
  {
    id: "9",
    name: "Meera Gupta",
    title: "AI Researcher at OpenAI",
    specialization: "Data Science",
    location: "San Francisco, CA",
    rating: 5.0,
    reviews: 210,
    experience: "7+ years",
    price: "₹1500/slot",
    avatar: "/Mentor9.jpg",
    bio: "Specializing in Large Language Models (LLMs) and generative AI. Contributed to several open-source AI projects.",
    skills: ["PyTorch", "NLP", "Transformer Models", "Python"],
    availability: "Busy",
    sessions: 180,
  },
  {
    id: "10",
    name: "Seema Khan",
    title: "Lead Game Developer at Ubisoft",
    specialization: "Backend Development",
    location: "Montreal, CA",
    rating: 4.7,
    reviews: 99,
    experience: "13+ years",
    price: "₹1500/slot",
    avatar: "/Mentor10.jpg",
    bio: "Building scalable backend services for AAA games. Expert in C++ and network programming.",
    skills: ["C++", "Unreal Engine", "Network Programming", "Go"],
    availability: "Available",
    sessions: 350,
  },
]

const specializations = [
  "All Specializations",
  "Frontend Development",
  "Backend Development",
  "UI/UX Design",
  "Data Science",
  "DevOps",
  "Cybersecurity",
  "Mobile Development",
  "Product Management",
]

export function MentorGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter() // Added router instance

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesSpecialization =
      selectedSpecialization === "All Specializations" || mentor.specialization === selectedSpecialization

    return matchesSearch && matchesSpecialization
  })

  const handleViewProfile = (mentorId: string) => {
    router.push(`/mentors/${mentorId}`) // Replaced window.location.href with proper Next.js navigation
  }

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <PageLoader type="mentors" />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Find Your Perfect <span className="text-primary">Mentor</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with industry experts and accelerate your learning journey
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search mentors by name, company, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-background"
                    />
                  </div>
                </div>
                <div className="sm:w-64">
                  <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Filter by Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Showing {filteredMentors.length} of {mentors.length} mentors
                </span>
                <span>
                  {selectedSpecialization !== "All Specializations" && `Filtered by: ${selectedSpecialization}`}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full card-hover group">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{mentor.name}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{mentor.title}</CardDescription>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {mentor.specialization}
                        </Badge>
                        <Badge
                          variant={mentor.availability === "Available" ? "default" : "outline"}
                          className="text-xs"
                        >
                          {mentor.availability}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{mentor.bio}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">{mentor.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">{mentor.experience}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span className="text-xs">{mentor.sessions} sessions</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">Skills</div>
                      <div className="flex flex-wrap gap-1">
                        {mentor.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{mentor.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-lg font-bold text-primary">{mentor.price}</div>
                    <Button onClick={() => handleViewProfile(mentor.id)} className="btn-premium">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredMentors.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No mentors found</p>
              <p className="text-sm">Try adjusting your search criteria or browse all mentors</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
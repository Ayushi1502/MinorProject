"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { MainLayout } from "@/components/main-layout"
import { MentorProfile } from "@/components/mentors/mentor-profile"
import { PageLoader } from "@/components/page-loader"

// This would typically come from an API or database
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
    bio: "Passionate about React, TypeScript, and modern web development. Helped 200+ developers land their dream jobs at top tech companies. I specialize in system design interviews, coding challenges, and career guidance.",
    skills: ["React", "TypeScript", "Next.js", "System Design", "JavaScript", "Node.js"],
    availability: "Available",
    sessions: 340,
    languages: ["English", "Hindi", "Marathi"],
    timezone: "IST (UTC+5:30)",
    responseTime: "Within 2 hours",
    successRate: "95%",
    expertise: [
      "Frontend Architecture",
      "React Ecosystem",
      "Performance Optimization",
      "Code Reviews",
      "Technical Interviews",
    ],
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
    bio: "Expert in distributed systems, microservices, and cloud architecture. Former tech lead at multiple startups. I help engineers scale their backend knowledge and prepare for senior roles.",
    skills: ["Node.js", "Python", "AWS", "Kubernetes", "Docker", "PostgreSQL"],
    availability: "Busy",
    sessions: 256,
    languages: ["English", "Hindi", "Bengali"],
    timezone: "IST (UTC+5:30)",
    responseTime: "Within 4 hours",
    successRate: "92%",
    expertise: [
      "Microservices Architecture",
      "Cloud Infrastructure",
      "Database Design",
      "API Development",
      "System Scalability",
    ],
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
    bio: "Design systems expert with a passion for user-centered design. Mentored designers at top tech companies. I focus on helping designers build strong portfolios and land their dream jobs.",
    skills: ["Figma", "Design Systems", "User Research", "Prototyping", "Adobe Creative Suite", "Sketch"],
    availability: "Available",
    sessions: 423,
    languages: ["English", "Hindi", "Telegu", "Tamil"],
    timezone: "EST (UTC-5)",
    responseTime: "Within 1 hour",
    successRate: "98%",
    expertise: [
      "Design Systems",
      "User Experience Research",
      "Product Design",
      "Design Leadership",
      "Portfolio Reviews",
    ],
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
    bio: "Machine learning expert specializing in recommendation systems and NLP. PhD in Computer Science. I help data scientists advance their careers and master complex ML concepts.",
    skills: ["Python", "TensorFlow", "SQL", "Machine Learning", "PyTorch", "R"],
    availability: "Available",
    sessions: 189,
    languages: ["English", "Korean", "Hindi", "Gujrati"],
    timezone: "IST (UTC+5:30)",
    responseTime: "Within 3 hours",
    successRate: "94%",
    expertise: ["Machine Learning", "Deep Learning", "Data Analysis", "Statistical Modeling", "MLOps"],
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
    bio: "Cloud infrastructure specialist with expertise in CI/CD pipelines and container orchestration. I help engineers master DevOps practices and cloud technologies.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Ansible"],
    availability: "Available",
    sessions: 278,
    languages: ["English", "Hindi"],
    timezone: "IST (UTC+5:30)",
    responseTime: "Within 2 hours",
    successRate: "96%",
    expertise: [
      "Cloud Architecture",
      "CI/CD Pipelines",
      "Infrastructure as Code",
      "Container Orchestration",
      "Monitoring & Logging",
    ],
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
    bio: "Cybersecurity expert with focus on application security and penetration testing. CISSP certified. I help security professionals advance their skills and prepare for certifications.",
    skills: ["Penetration Testing", "Security Auditing", "Risk Assessment", "Compliance", "Ethical Hacking", "SIEM"],
    availability: "Busy",
    sessions: 145,
    languages: ["English", "Hindi", "Panjabi"],
    timezone: "PST (UTC-8)",
    responseTime: "Within 6 hours",
    successRate: "93%",
    expertise: [
      "Application Security",
      "Penetration Testing",
      "Security Architecture",
      "Compliance & Governance",
      "Incident Response",
    ],
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
    skills: ["Product Strategy", "Agile", "Jira", "Market Research", "Roadmapping", "A/B Testing"],
    availability: "Available",
    sessions: 310,
    languages: ["English", "Hindi"],
    timezone: "GMT (UTC+0)",
    responseTime: "Within 3 hours",
    successRate: "97%",
    expertise: [
      "Product Lifecycle Management",
      "Agile Methodologies",
      "User Story Mapping",
      "Go-to-market Strategy",
      "Stakeholder Management",
    ],
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
    skills: ["Kotlin", "Android SDK", "Jetpack Compose", "MVVM", "Coroutines", "Dagger Hilt"],
    availability: "Available",
    sessions: 220,
    languages: ["English", "Marathi", "Hindi"],
    timezone: "IST (UTC+5:30)",
    responseTime: "Within 5 hours",
    successRate: "94%",
    expertise: [
      "Native Android Development",
      "Mobile App Architecture",
      "UI/UX for Mobile",
      "Performance Tuning",
      "API Integration",
    ],
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
    skills: ["PyTorch", "NLP", "Transformer Models", "Python", "JAX", "CUDA"],
    availability: "Busy",
    sessions: 180,
    languages: ["English"],
    timezone: "PST (UTC-8)",
    responseTime: "Within 24 hours",
    successRate: "99%",
    expertise: [
      "Generative AI",
      "Large Language Models",
      "Natural Language Processing",
      "Deep Learning Research",
      "Model Optimization",
    ],

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
    skills: ["C++", "Unreal Engine", "Network Programming", "Go", "Perforce", "GDB"],
    availability: "Available",
    sessions: 350,
    languages: ["English", "French"],
    timezone: "EST (UTC-5)",
    responseTime: "Within 8 hours",
    successRate: "91%",
    expertise: [
      "Game Development",
      "Real-time Networking",
      "High-Performance C++",
      "Engine Architecture",
      "Multiplayer Systems",
    ],
  },
]

export default function MentorProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [mentor, setMentor] = useState<(typeof mentors)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const mentorId = params.id as string
    const foundMentor = mentors.find((m) => m.id === mentorId)

    // Simulate API call delay
    setTimeout(() => {
      if (foundMentor) {
        setMentor(foundMentor)
      }
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  if (isLoading) {
    return <PageLoader type="mentors" />
  }

  if (!mentor) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Mentor Not Found</h1>
            <p className="text-muted-foreground mb-6">The mentor you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push("/mentors")}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Back to Mentors
            </button>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <MentorProfile mentor={mentor} />
    </MainLayout>
  )
}
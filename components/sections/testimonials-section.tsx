"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Ayushi Awasthi",
    role: "3rd Year UG Student",
    image: "/Ayushi.jpg",
    rating: 5,
    review:
      "Prosmart AI completely transformed my coding journey. The personalized roadmaps and AI-powered quizzes for Interview preparation. The UI is awesome and smooth just like the Onboading and Roadmap generation process.",
    company: "Oriental Institute of Science & Technology",
  },
  {
    id: 2,
    name: "Ayush Jaiswal",
    role: "B.Tech Graduate",
    image: "/Ayush.jpg",
    rating: 5,
    review:
      "The AI-powered Roadmaps and interactive quizzes are game-changers. I improved my skills 10x faster than traditional learning methods. Highly recommend to anyone serious about tech careers!",
    company: "OIST",
  },
  {
    id: 3,
    name: "Astha Patel",
    role: "3rd Year UG Student",
    image: "/Astha.jpg",
    rating: 5,
    review:
      "From zero to hero in data science! The structured learning paths and expert mentors guided me every step of the way. Now I'm working with perfect career direction thanks to PathShala AI's comprehensive program.",
    company: "OIST",
  },
  {
    id: 4,
    name: "Anshika Singh",
    role: "3rd Year UG Student",
    image: "/Anshika.jpg",
    rating: 5,
    review:
      "From zero to hero in AIML! The structured learning paths and expert mentors guided me every step of the way. Now I'm working with perfect career direction thanks to PathShala AI's comprehensive program.",
    company: "OIST",
  }
]

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
      ))}
    </div>
  )
}

const TestimonialCard = ({ testimonial, index }: { testimonial: (typeof testimonials)[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group relative"
    >
      {/* Glassmorphism Card */}
      <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
        {/* Neon Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        {/* Quote Icon */}
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30">
          <Quote className="h-4 w-4 text-primary" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={testimonial.rating} />
          </div>

          {/* Review Text */}
          <p className="text-gray-300 mb-6 leading-relaxed text-sm">"{testimonial.review}"</p>

          {/* User Info */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glow effect around avatar */}
              <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            </div>

            <div>
              <h4 className="font-semibold text-white group-hover:text-primary transition-colors duration-300">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-400">{testimonial.role}</p>
              <p className="text-xs text-primary font-medium">{testimonial.company}</p>
            </div>
          </div>
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="text-primary font-medium text-sm">SUCCESS STORIES</span>
          </motion.div>

          <h2 className="text-4xl md:text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Trusted & tested by <span className="text-primary">Our</span> Teammates
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

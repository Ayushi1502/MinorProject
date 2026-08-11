"use client"

import { MainLayout } from "@/components/main-layout"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { CommunitySection } from "@/components/sections/community-section"

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CommunitySection />
    </MainLayout>
  )
}

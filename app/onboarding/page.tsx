"use client"

import { OnboardingFlow } from "@/components/onboarding/onboarding-flow"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <OnboardingFlow />
    </div>
  )
}

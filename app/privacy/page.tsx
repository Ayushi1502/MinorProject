"use client"

import { MainLayout } from "@/components/main-layout"
import { LegalPage } from "@/components/legal/legal-page"

export default function PrivacyPage() {
  return (
    <MainLayout>
      <LegalPage
        title="Privacy Policy"
        lastUpdated="November 13, 2025"
        content="This is a placeholder for the Privacy Policy content. In a real application, this would contain the complete privacy policy with sections covering data collection, usage, sharing, and user rights."
      />
    </MainLayout>
  )
}

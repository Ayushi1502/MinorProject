"use client"

import { MainLayout } from "@/components/main-layout"
import { LegalPage } from "@/components/legal/legal-page"

export default function TermsPage() {
  return (
    <MainLayout>
      <LegalPage
        title="Terms and Conditions"
        lastUpdated="November 13, 2025"
        content="This is a placeholder for the Terms and Conditions content. In a real application, this would contain the complete terms of service including user obligations, service availability, intellectual property rights, and limitation of liability."
      />
    </MainLayout>
  )
}

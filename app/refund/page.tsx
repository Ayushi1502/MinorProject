"use client"

import { MainLayout } from "@/components/main-layout"
import { LegalPage } from "@/components/legal/legal-page"

export default function RefundPage() {
  return (
    <MainLayout>
      <LegalPage
        title="Refund Policy"
        lastUpdated="November 13, 2025"
        content="This is a placeholder for the Refund Policy content. In a real application, this would contain the complete refund policy including eligibility criteria, refund process, timeframes, and exceptions."
      />
    </MainLayout>
  )
}

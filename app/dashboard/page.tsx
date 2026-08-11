"use client"

import { MainLayout } from "@/components/main-layout"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export default function DashboardPage() {
  return (
    <MainLayout>
      <DashboardOverview />
    </MainLayout>
  )
}

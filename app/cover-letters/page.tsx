"use client"

import { MainLayout } from "@/components/main-layout"
import { CoverLetterGenerator } from "@/components/cover-letter/cover-letter-generator"

export default function CoverLettersPage() {
  return (
    <MainLayout>
      <CoverLetterGenerator />
    </MainLayout>
  )
}

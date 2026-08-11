"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, ArrowLeft, CheckCircle, X } from "lucide-react"

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Design",
  "Engineering",
  "Data Science",
  "Other",
]

const experienceLevels = [
  "0-2 years",
  "2-5 years",
  "5-10 years",
  "10+ years",
]

const popularSkills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "SQL",
  "AWS",
  "Docker",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Project Management",
  "Digital Marketing",
  "Content Writing",
  "Cybersecurity",
  "DevOps",
  "Others",
]

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    industry: "",
    customIndustry: "",
    experienceLevel: "",
    skills: [] as string[],
    customSkills: "",
    bio: "",
    linkedinUrl: "",
    githubUrl: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleComplete = async () => {
    try {
      await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          industry: formData.industry === "Other" ? formData.customIndustry : formData.industry,
          experience: formData.experienceLevel,
          skills: formData.skills.includes("Others")
            ? formData.customSkills.split(",").map((s) => s.trim())
            : formData.skills,
          bio: formData.bio,
          linkedin: formData.linkedinUrl,
          github: formData.githubUrl,
        }),
      });
    } catch (error) {
      console.error("An error occurred updating profile:", error);
    } finally {
      window.location.href = "/roadmap?step=select_role";
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        const industryValid =
          formData.industry === "Other" ? formData.customIndustry.trim() !== "" : formData.industry !== ""
        return industryValid
      case 2:
        const skillsValid = formData.skills.includes("Others")
          ? formData.customSkills.trim() !== ""
          : formData.skills.length > 0
        return formData.experienceLevel && skillsValid
      case 3:
        return formData.bio.trim() !== ""
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-border/50 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-3xl">Complete Your Profile</CardTitle>
          <CardDescription>Help us personalize your learning experience</CardDescription>
        </CardHeader>

        <CardContent className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Tell us about yourself</h3>
                  <p className="text-muted-foreground">Basic information to get started</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {formData.industry === "Other" && (
                      <div className="space-y-2 mt-3">
                        <Label htmlFor="customIndustry">Custom Industry</Label>
                        <Input
                          id="customIndustry"
                          type="text"
                          placeholder="Enter your industry"
                          value={formData.customIndustry}
                          onChange={(e) => setFormData((prev) => ({ ...prev, customIndustry: e.target.value }))}
                          className="bg-background"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Your Experience & Skills</h3>
                  <p className="text-muted-foreground">Help us understand your current level</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      value={formData.experienceLevel}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, experienceLevel: value }))}
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Skills (Select all that apply)</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {popularSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={formData.skills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer justify-center py-2 hover:bg-primary/10 transition-colors"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                          {formData.skills.includes("Others") && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                      ))}
                    </div>

                    {formData.skills.includes("Others") && (
                      <div className="space-y-2 mt-3">
                        <Label htmlFor="customSkills">Custom Skills</Label>
                        <Input
                          id="customSkills"
                          type="text"
                          placeholder="Enter your skills (comma separated)"
                          value={formData.customSkills}
                          onChange={(e) => setFormData((prev) => ({ ...prev, customSkills: e.target.value }))}
                          className="bg-background"
                        />
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground">Selected: {formData.skills.length} skills</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold mb-2">Tell us more about you</h3>
                  <p className="text-muted-foreground">Add your bio and social links</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio">
                      Bio <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself, something you are proud of or something you think would help us more the personalize your path ..."
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                      className="bg-background min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL (Optional)</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                      className="bg-background"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">You're All Set!</h3>
                  <p className="text-muted-foreground">Review your information and complete your profile</p>
                </div>

                <div className="space-y-4 bg-muted/50 rounded-lg p-4">
                  <div>
                    <span className="font-medium">Industry:</span>{" "}
                    {formData.industry === "Other" ? formData.customIndustry : formData.industry}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span> {formData.experienceLevel}
                  </div>
                  <div>
                    <span className="font-medium">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.skills
                        .filter((skill) => skill !== "Others")
                        .map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      {formData.skills.includes("Others") &&
                        formData.customSkills &&
                        formData.customSkills.split(",").map((skill, index) => (
                          <Badge key={`custom-${index}`} variant="secondary" className="text-xs">
                            {skill.trim()}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Bio:</span> {formData.bio.substring(0, 100)}
                    {formData.bio.length > 100 ? "..." : ""}
                  </div>
                  {formData.linkedinUrl && (
                    <div>
                      <span className="font-medium">LinkedIn:</span> {formData.linkedinUrl}
                    </div>
                  )}
                  {formData.githubUrl && (
                    <div>
                      <span className="font-medium">GitHub:</span> {formData.githubUrl}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} disabled={!canProceed()}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete}>
                Progress to Roadmap🎯
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}




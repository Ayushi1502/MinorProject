"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { PageLoader } from "@/components/page-loader"
import { Wand2, Copy, Download, RefreshCw } from "lucide-react"

export function CoverLetterGenerator() {
  const [jobDescription, setJobDescription] = useState("")
  const [generatedLetter, setGeneratedLetter] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const generateCoverLetter = async () => {
    if (!jobDescription.trim()) return

    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const sampleLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the position described in your job posting. With my background in software development and passion for creating innovative solutions, I am confident that I would be a valuable addition to your team.

In my previous roles, I have developed expertise in:
• Full-stack web development using modern frameworks
• Collaborative problem-solving and agile methodologies  
• Building scalable applications with clean, maintainable code
• Working effectively in cross-functional teams

I am particularly drawn to this opportunity because it aligns perfectly with my career goals and technical interests. Your company's commitment to innovation and excellence resonates with my own professional values.

I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success. Thank you for considering my application.

Best regards,
[Your Name]`

      setGeneratedLetter(sampleLetter)
      setIsGenerating(false)
    }, 3000)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLetter)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadLetter = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedLetter], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "cover-letter.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-background">
      {isGenerating && <PageLoader type="chat" />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            AI-Powered <span className="text-primary">Cover Letter</span> Generator
          </h1>
          <p className="text-xl text-muted-foreground">
            Generate personalized cover letters tailored to specific job descriptions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Input */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  <span>Job Description</span>
                </CardTitle>
                <CardDescription>Paste the job description you're applying for</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description here. Include requirements, responsibilities, and company information for the best results..."
                    rows={12}
                    className="bg-background resize-none"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Button
                    onClick={generateCoverLetter}
                    disabled={!jobDescription.trim() || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating Letter...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Cover Letter
                      </>
                    )}
                  </Button>

                  {jobDescription.trim() && (
                    <div className="text-xs text-muted-foreground text-center">
                      {jobDescription.length} characters • Estimated generation time: 30 seconds
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips for Better Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">
                      1
                    </Badge>
                    <p>Include the complete job description with requirements and responsibilities</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">
                      2
                    </Badge>
                    <p>Mention the company name and specific role title if available</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">
                      3
                    </Badge>
                    <p>Include any specific qualifications or skills mentioned in the posting</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Badge variant="outline" className="mt-0.5">
                      4
                    </Badge>
                    <p>Review and customize the generated letter before sending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right column - Output */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Cover Letter</CardTitle>
                    <CardDescription>AI-generated personalized cover letter</CardDescription>
                  </div>
                  {generatedLetter && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={copyToClipboard} className="bg-transparent">
                        <Copy className="mr-2 h-4 w-4" />
                        {isCopied ? "Copied!" : "Copy"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadLetter} className="bg-transparent">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedLetter ? (
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">{generatedLetter}</pre>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{generatedLetter.split(" ").length} words</span>
                      <span>Generated with AI</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Wand2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No cover letter generated yet</p>
                    <p className="text-sm">Paste a job description and click "Generate Cover Letter" to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {generatedLetter && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        1
                      </Badge>
                      <p>Review the generated content for accuracy and relevance</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        2
                      </Badge>
                      <p>Customize with your personal details and specific examples</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">
                        3
                      </Badge>
                      <p>Proofread for grammar and formatting before submitting</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

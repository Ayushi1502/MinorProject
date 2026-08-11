"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SaveIcon,Download, Share2 } from "lucide-react"
import type { ResumeData } from "./resume-builder"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface ResumePreviewProps {
  resumeData: ResumeData
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  const handleDownload = () => {
    const resume = document.getElementById("resume-content");
    if (resume) {
      html2canvas(resume).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save("resume.pdf");
      });
    }
  };

  const handleSave = () => {
    // Simulate Resume save to the database
    console.log("Saving resume...")
  }

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex gap-2">
        <Button onClick={handleDownload} className="flex-1">
          <Download className="mr-2 h-6 w-8" />
          Download PDF
        </Button>
        <Button variant="outline" onClick={handleSave} className="flex-1 bg-transparent">
          <SaveIcon className="mr-2 h-6 w-8" />
          Save
        </Button>
      </div>

      {/* Resume preview */}
      <Card id="resume-content" className="bg-white text-black shadow-2xl">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{resumeData.personalDetails.fullName || "Your Name"}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {resumeData.personalDetails.email && <span>{resumeData.personalDetails.email}</span>}
              {resumeData.personalDetails.phone && <span>{resumeData.personalDetails.phone}</span>}
              {resumeData.personalDetails.location && <span>{resumeData.personalDetails.location}</span>}
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {resumeData.personalDetails.website && <span>{resumeData.personalDetails.website}</span>}
              {resumeData.personalDetails.linkedin && <span>{resumeData.personalDetails.linkedin}</span>}
            </div>
          </div>

          {/* Professional Summary */}
          {resumeData.summary && (
            <>
              <Separator className="bg-gray-300" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
                <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
              </div>
            </>
          )}

          {/* Experience */}
          {resumeData.experience.length > 0 && (
            <>
              <Separator className="bg-gray-300" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.position || "Position"}</h3>
                          <p className="text-gray-700">{exp.company || "Company"}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          {exp.startDate && (
                            <p>
                              {new Date(exp.startDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })}{" "}
                              -{" "}
                              {exp.current
                                ? "Present"
                                : exp.endDate
                                  ? new Date(exp.endDate).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                    })
                                  : "Present"}
                            </p>
                          )}
                        </div>
                      </div>
                      {exp.description && <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Education */}
          {resumeData.education.length > 0 && (
            <>
              <Separator className="bg-gray-300" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
                <div className="space-y-3">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                        </h3>
                        <p className="text-gray-700">{edu.institution || "Institution"}</p>
                        {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        {edu.startDate && edu.endDate && (
                          <p>
                            {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Skills */}
          {resumeData.skills.length > 0 && (
            <>
              <Separator className="bg-gray-300" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
                <div className="space-y-3">
                  {resumeData.skills.map((skillCategory) => (
                    <div key={skillCategory.id}>
                      <h3 className="font-medium text-gray-900 mb-1">{skillCategory.category || "Category"}</h3>
                      <p className="text-gray-700 text-sm">{skillCategory.items.join(", ")}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Empty state */}
          {!resumeData.personalDetails.fullName &&
            !resumeData.summary &&
            resumeData.experience.length === 0 &&
            resumeData.education.length === 0 &&
            resumeData.skills.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>Start filling out the form to see your resume preview</p>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  )
}
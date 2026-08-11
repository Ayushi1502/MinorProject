"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users } from "lucide-react"

interface Roadmap {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  difficulty: string
  duration: string
  progress: number
  color: string
  students: number
}

interface RoadmapListProps {
  roadmaps: Roadmap[]
  selectedRoadmap: Roadmap
  onRoadmapSelect: (roadmap: Roadmap) => void
}

export function RoadmapList({ roadmaps, selectedRoadmap, onRoadmapSelect }: RoadmapListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Available Roadmaps</h2>

      {roadmaps.map((roadmap, index) => {
        const Icon = roadmap.icon
        const isSelected = selectedRoadmap.id === roadmap.id

        return (
          <motion.div
            key={roadmap.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
              }`}
              onClick={() => onRoadmapSelect(roadmap)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${roadmap.color} text-white flex-shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 truncate">{roadmap.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{roadmap.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <Badge variant="outline" className="text-xs">
                          {roadmap.difficulty}
                        </Badge>
                        <span className="text-muted-foreground">{roadmap.duration}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>Progress</span>
                          <span>{roadmap.progress}%</span>
                        </div>
                        <Progress value={roadmap.progress} className="h-1" />
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{roadmap.students.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}

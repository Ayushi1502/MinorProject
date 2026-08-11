"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  Award,
  Users,
  ArrowRight,
  Play,
  CheckCircle,
  Calendar,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

const dashboardData = {
  user: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
  },
  stats: {
    coursesInProgress: 3,
    coursesCompleted: 12,
    hoursThisWeek: 8.5,
    streakDays: 23,
  },
  currentCourses: [
    {
      id: "1",
      title: "Advanced React Patterns",
      progress: 65,
      nextLesson: "Higher-Order Components",
      timeRemaining: "2h 30m",
    },
    {
      id: "2",
      title: "System Design Fundamentals",
      progress: 30,
      nextLesson: "Load Balancing",
      timeRemaining: "4h 15m",
    },
    {
      id: "3",
      title: "TypeScript Deep Dive",
      progress: 85,
      nextLesson: "Advanced Types",
      timeRemaining: "45m",
    },
  ],
  recentAchievements: [
    { title: "JavaScript Expert", date: "2 days ago", icon: "🏆" },
    { title: "7-Day Streak", date: "1 week ago", icon: "🔥" },
    { title: "React Fundamentals", date: "2 weeks ago", icon: "⚛️" },
  ],
  upcomingEvents: [
    { title: "React Workshop", date: "Tomorrow, 2:00 PM", type: "Workshop" },
    { title: "Career Mentoring Session", date: "Friday, 10:00 AM", type: "Mentoring" },
    { title: "System Design Interview Prep", date: "Next Monday, 3:00 PM", type: "Interview Prep" },
  ],
}

export function DashboardOverview() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={dashboardData.user.avatar || "/placeholder.svg"} alt={dashboardData.user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {dashboardData.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, <span className="text-primary">{dashboardData.user.name.split(" ")[0]}</span>!
              </h1>
              <p className="text-muted-foreground">Ready to continue your learning journey?</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{dashboardData.stats.coursesInProgress}</p>
                  <p className="text-xs text-muted-foreground">Courses in Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{dashboardData.stats.coursesCompleted}</p>
                  <p className="text-xs text-muted-foreground">Courses Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{dashboardData.stats.hoursThisWeek}h</p>
                  <p className="text-xs text-muted-foreground">Hours This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{dashboardData.stats.streakDays}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-primary" />
                    <span>Continue Learning</span>
                  </CardTitle>
                  <CardDescription>Pick up where you left off</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.currentCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{course.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {course.timeRemaining} left
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Next: {course.nextLesson}</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button size="sm" className="btn-glossy">
                          Continue
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Jump into your learning tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Link href="/fields">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex-col space-y-2 bg-transparent border-primary btn-glossy"
                      >
                        <GraduationCap className="h-6 w-6 text-primary" />
                        <span className="text-sm">Exams & Fields</span>
                      </Button>
                    </Link>
                    <Link href="/roadmap">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex-col space-y-2 bg-transparent border-primary btn-glossy"
                      >
                        <Target className="h-6 w-6" />
                        <span className="text-sm">Explore Roadmaps</span>
                      </Button>
                    </Link>
                    <Link href="/quiz">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex-col space-y-2 bg-transparent border-primary btn-glossy"
                      >
                        <BookOpen className="h-6 w-6" />
                        <span className="text-sm">Take Quiz</span>
                      </Button>
                    </Link>
                    <Link href="/resume-builder">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex-col space-y-2 bg-transparent border-primary btn-glossy"
                      >
                        <Award className="h-6 w-6" />
                        <span className="text-sm">Build Resume</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="/profile">
                    <Button variant="outline" className="w-full mt-4 bg-transparent border-primary btn-glossy">
                      View All Achievements
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.upcomingEvents.map((event, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  ))}
                  <Link href="/mentors">
                    <Button variant="outline" className="w-full mt-4 bg-transparent border-primary btn-glossy">
                      <Users className="mr-2 h-4 w-4" />
                      Find Mentors
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PageLoader } from "@/components/page-loader"
import { QuizResultsModal } from "./quiz-results-modal"
import { PerformanceChart } from "./performance-chart"
import { BookOpen, Brain, Clock, CheckCircle, TrendingUp, Award, Target, Calendar } from "lucide-react"
import Link from "next/link"
import { MainLayout } from "@/components/main-layout" // Import MainLayout

const quizCategories = [
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    questions: 25,
    difficulty: "Beginner",
    duration: "30 min",
    completed: true,
    score: 85,
    color: "bg-yellow-500",
  },
  {
    id: "react",
    title: "React Components",
    description: "Master React component concepts",
    questions: 20,
    difficulty: "Intermediate",
    duration: "25 min",
    completed: false,
    score: null,
    color: "bg-blue-500",
  },
  {
    id: "typescript",
    title: "TypeScript Essentials",
    description: "Type safety and advanced TypeScript",
    questions: 30,
    difficulty: "Advanced",
    duration: "40 min",
    completed: false,
    score: null,
    color: "bg-blue-600",
  },
]

const sampleQuiz = {
  id: "react",
  title: "React Components Quiz",
  currentQuestion: 1,
  totalQuestions: 20,
  timeRemaining: 1200, // 20 minutes in seconds
  question: {
    text: "What is the correct way to pass data from a parent component to a child component in React?",
    options: ["Using state", "Using props", "Using context", "Using refs"],
    correctAnswer: 1,
  },
}

const recentQuizzes = [
  {
    id: "1",
    date: "2024-02-20",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    topic: "React Fundamentals",
    questions: [
      {
        question: "Which of the following is NOT a core feature of React?",
        userAnswer: "Two-way data binding",
        correctAnswer: "Two-way data binding",
        isCorrect: true,
        explanation: "React uses one-way data binding, improving performance and predictability.",
      },
      {
        question: "What does JSX stand for in React?",
        userAnswer: "Java Syntax Extension",
        correctAnswer: "JavaScript XML",
        isCorrect: false,
        explanation: "JSX allows you to write HTML-like syntax within JavaScript.",
      },
    ],
    improvementTip:
      "Focus on learning the fundamental syntax and terminology specific to React and its associated technologies like JSX. Reviewing core React concepts will build a strong foundation for future success.",
  },
  {
    id: "2",
    date: "2024-02-15",
    score: 72,
    totalQuestions: 25,
    correctAnswers: 18,
    topic: "JavaScript ES6",
    questions: [],
    improvementTip: "Practice more with arrow functions and destructuring assignments.",
  },
]

export function QuizDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeQuiz, setActiveQuiz] = useState<typeof sampleQuiz | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [selectedResult, setSelectedResult] = useState<(typeof recentQuizzes)[0] | null>(null)
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false)

  const startQuiz = (quizId: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setActiveQuiz(sampleQuiz)
      setIsLoading(false)
    }, 1000)
  }

  const submitAnswer = () => {
    console.log("Answer submitted:", selectedAnswer)
    setSelectedAnswer(null)
  }

  const openResultsModal = (result: (typeof recentQuizzes)[0]) => {
    setSelectedResult(result)
    setIsResultsModalOpen(true)
  }

  if (activeQuiz) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
              {/* Quiz header */}
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{activeQuiz.title}</CardTitle>
                      <CardDescription>
                        Question {activeQuiz.currentQuestion} of {activeQuiz.totalQuestions}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {Math.floor(activeQuiz.timeRemaining / 60)}:
                        {(activeQuiz.timeRemaining % 60).toString().padStart(2, "0")}
                      </div>
                      <div className="text-sm text-muted-foreground">Time Remaining</div>
                    </div>
                  </div>
                  <Progress value={(activeQuiz.currentQuestion / activeQuiz.totalQuestions) * 100} className="mt-4" />
                </CardHeader>
              </Card>

              {/* Question */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{activeQuiz.question.text}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeQuiz.question.options.map((option, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Card
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedAnswer === index ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedAnswer(index)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === index
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground"
                              }`}
                            >
                              {selectedAnswer === index && <CheckCircle className="h-4 w-4" />}
                            </div>
                            <span className="text-sm">{option}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  <div className="flex justify-between pt-6">
                    <Button variant="outline" className="bg-transparent">
                      Previous Question
                    </Button>
                    <Button onClick={submitAnswer} disabled={selectedAnswer === null}>
                      Next Question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        {isLoading && <PageLoader type="quiz" />}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl mb-4 flex-row items-end font-extrabold tracking-wide text-center sm:text-5xl">
              <span className="text-primary">Interview</span> Preparation
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-center"
          >
            <Link href="/ai-interview">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start your AI Quiz now
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.5%</div>
                <p className="text-xs text-muted-foreground">Based on 12 quizzes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quiz Practiced</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Total completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">React Fundamentals</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Trend
                </CardTitle>
                <CardDescription>Your quiz performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Quiz
                </CardTitle>
                <CardDescription>Review your past quiz attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => openResultsModal(quiz)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Brain className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{quiz.topic}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(quiz.date).toLocaleDateString()} • {quiz.correctAnswers}/{quiz.totalQuestions}{" "}
                            correct
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{quiz.score}%</div>
                        <Badge variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}>
                          {quiz.score >= 80 ? "Excellent" : quiz.score >= 60 ? "Good" : "Needs Work"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Existing quiz categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizCategories.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${quiz.color} text-white`}>
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{quiz.title}</CardTitle>
                        <CardDescription>{quiz.description}</CardDescription>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{quiz.difficulty}</Badge>
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {quiz.duration}
                      </Badge>
                      <Badge variant="outline">{quiz.questions} questions</Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {quiz.completed ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Your Score</span>
                          <span className="text-2xl font-bold text-primary">{quiz.score}%</span>
                        </div>
                        <Progress value={quiz.score} className="h-2" />
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Review
                          </Button>
                          <Button onClick={() => startQuiz(quiz.id)} className="flex-1">
                            Retake
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-center py-4">
                          <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Ready to test your knowledge?</p>
                        </div>
                        <Button onClick={() => startQuiz(quiz.id)} className="w-full">
                          Start Quiz
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <QuizResultsModal
          isOpen={isResultsModalOpen}
          onClose={() => setIsResultsModalOpen(false)}
          result={selectedResult}
        />
      </div>
    </MainLayout>
  )
}

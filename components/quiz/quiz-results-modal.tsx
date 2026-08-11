"use client"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Trophy, CheckCircle, X } from "lucide-react"

interface QuizResult {
  id: string
  date: string
  score: number
  totalQuestions: number
  correctAnswers: number
  questions: {
    question: string
    userAnswer: string
    correctAnswer: string
    isCorrect: boolean
    explanation: string
  }[]
  improvementTip: string
}

interface QuizResultsModalProps {
  isOpen: boolean
  onClose: () => void
  result: QuizResult | null
}

export function QuizResultsModal({ isOpen, onClose, result }: QuizResultsModalProps) {
  if (!result) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Quiz Results
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Score section */}
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{result.score}%</div>
            <Progress value={result.score} className="w-full h-3 mb-4" />
          </div>

          {/* Improvement tip */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Improvement Tip:</h3>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>

          {/* Question review */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Question Review</h3>
            <div className="space-y-4">
              {result.questions.map((q, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {q.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium mb-2">{q.question}</h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-muted-foreground">Your answer:</span> {q.userAnswer}
                        </p>
                        {!q.isCorrect && (
                          <p>
                            <span className="text-muted-foreground">Correct answer:</span> {q.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded p-3 ml-8">
                    <p className="text-sm">
                      <span className="font-medium">Explanation:</span> {q.explanation}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

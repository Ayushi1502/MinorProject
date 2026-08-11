"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"

interface BookingCalendarProps {
  mentor: any
  onClose: () => void
  onConfirm: (slot: any) => void
}

export function BookingCalendar({ mentor, onClose, onConfirm }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentWeek, setCurrentWeek] = useState(0)

  // Generate next 2 weeks of dates
  const generateWeekDates = (weekOffset: number) => {
    const dates = []
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() + weekOffset * 7)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const weekDates = generateWeekDates(currentWeek)

  // Available time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ]

  // Simulate some booked slots
  const bookedSlots = new Set([
    "2024-01-15-10:00 AM",
    "2024-01-15-02:00 PM",
    "2024-01-16-11:00 AM",
    "2024-01-17-03:00 PM",
  ])

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const isSlotBooked = (date: string, time: string) => {
    return bookedSlots.has(`${date}-${time}`)
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const slot = {
        date: selectedDate,
        time: selectedTime,
        mentor: mentor.name,
        price: mentor.price,
      }
      onConfirm(slot)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Book Session with {mentor.name}</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Week Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                  disabled={currentWeek === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Week
                </Button>
                <div className="text-sm font-medium">
                  {weekDates[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentWeek(Math.min(1, currentWeek + 1))}
                  disabled={currentWeek === 1}
                >
                  Next Week
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="font-semibold mb-3">Select Date</h3>
                <div className="grid grid-cols-7 gap-2">
                  {weekDates.map((date) => {
                    const dateStr = formatDate(date)
                    const isSelected = selectedDate === dateStr
                    const isPast = isPastDate(date)
                    const isWeekend = date.getDay() === 0 || date.getDay() === 6

                    return (
                      <motion.button
                        key={dateStr}
                        whileHover={!isPast && !isWeekend ? { scale: 1.05 } : {}}
                        whileTap={!isPast && !isWeekend ? { scale: 0.95 } : {}}
                        onClick={() => !isPast && !isWeekend && setSelectedDate(dateStr)}
                        disabled={isPast || isWeekend}
                        className={`
                          p-3 rounded-lg text-center transition-all
                          ${
                            isSelected
                              ? "bg-primary text-primary-foreground shadow-lg"
                              : isPast || isWeekend
                                ? "bg-muted/50 text-muted-foreground cursor-not-allowed"
                                : "bg-muted hover:bg-muted/80 hover:shadow-md"
                          }
                        `}
                      >
                        <div className="text-xs font-medium">
                          {date.toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                        <div className="text-sm font-bold">{date.getDate()}</div>
                        {isWeekend && <div className="text-xs text-red-500 mt-1">Unavailable</div>}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <h3 className="font-semibold mb-3">Select Time</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time) => {
                      const isBooked = isSlotBooked(selectedDate, time)
                      const isSelected = selectedTime === time

                      return (
                        <motion.button
                          key={time}
                          whileHover={!isBooked ? { scale: 1.05 } : {}}
                          whileTap={!isBooked ? { scale: 0.95 } : {}}
                          onClick={() => !isBooked && setSelectedTime(time)}
                          disabled={isBooked}
                          className={`
                            p-3 rounded-lg text-sm font-medium transition-all
                            ${
                              isSelected
                                ? "bg-primary text-primary-foreground shadow-lg"
                                : isBooked
                                  ? "bg-red-100 text-red-500 cursor-not-allowed"
                                  : "bg-muted hover:bg-muted/80 hover:shadow-md"
                            }
                          `}
                        >
                          <Clock className="h-3 w-3 mx-auto mb-1" />
                          {time}
                          {isBooked && <div className="text-xs mt-1">Booked</div>}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Session Details */}
              {selectedDate && selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-muted/50 rounded-lg p-4 space-y-3"
                >
                  <h3 className="font-semibold">Session Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mentor:</span>
                      <span className="font-medium">{mentor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">
                        {new Date(selectedDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">1 hour</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-primary">{mentor.price}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 btn-premium"
                >
                  Proceed to Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, CreditCard, Lock, CheckCircle, Calendar, Clock, User, DollarSign } from "lucide-react"

interface PaymentModalProps {
  mentor: any
  slot: any
  onClose: () => void
  onSuccess: () => void
}

export function PaymentModal({ mentor, slot, onClose, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    phone: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsSuccess(true)

    // Auto close after success
    setTimeout(() => {
      onSuccess()
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  if (isSuccess) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-md"
          >
            <Card className="text-center">
              <CardContent className="pt-8 pb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground mb-4">
                  Your session with {mentor.name} has been booked successfully.
                </p>
                <div className="bg-muted/50 rounded-lg p-3 text-sm space-y-1">
                  <div>📅 {new Date(slot.date).toLocaleDateString()}</div>
                  <div>🕐 {slot.time}</div>
                  <div>💰 {slot.price}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
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
          className="w-full max-w-2xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span>Complete Payment</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Booking Summary */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Booking Summary</span>
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-3 w-3" />
                      <span className="font-medium">{mentor.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(slot.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{slot.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-3 w-3" />
                      <span className="font-bold text-primary">{slot.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <h3 className="font-semibold">Payment Information</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                      maxLength={19}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                      maxLength={5}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                      maxLength={4}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-green-50 p-3 rounded-lg">
                  <Lock className="h-4 w-4 text-green-600" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={isProcessing}>
                  Cancel
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !formData.cardNumber || !formData.expiryDate || !formData.cvv}
                  className="flex-1 btn-premium"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <CreditCard className="h-4 w-4 mr-2" />
                  )}
                  {isProcessing ? "Processing..." : `Pay ${slot.price}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

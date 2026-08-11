"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MessageCircle, Users } from "lucide-react"
import Link from "next/link"

export function CommunitySection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <motion.div
              className="inline-flex items-center rounded-full bg-primary/10 text-primary text-sm font-medium px-3.5 py-1.5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              💬 Join Our Community
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-balance"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Connect & <span className="text-primary">Learn</span> Together
            </motion.h2>

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join thousands of learners in our vibrant community. Get instant help, share knowledge, and grow together.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="https://chat.whatsapp.com/HpjO8xWO9gWK6HcR1aLE2X?mode=hqrt3 " target="_blank">
              <Button size="lg" className="group min-w-[200px]">
                <MessageCircle className="mr-2 h-5 w-5" />
                Join WhatsApp Group
              </Button>
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{"10+"}</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Community Support</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{"15+"}</div>
              <div className="text-sm text-muted-foreground">Positive Reviews </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

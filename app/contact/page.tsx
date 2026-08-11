"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, BookText, MessageSquare, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MainLayout } from '@/components/main-layout'; // Import MainLayout

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you shortly.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Wrap the entire page in MainLayout to get Navbar and Footer
    <MainLayout>
      {/* Main container centers content */}
      <div className="min-h-screen bg-background flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Back to Home Button */}
        <div className="w-full max-w-2xl mb-8 self-center">
            <Link href="/roadmap" passHref>
                <Button 
                className="btn-premium bg-primary/10 backdrop-blur-sm border border-primary/20 hover:border-primary/40 text-primary-foreground"
                >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
                </Button>
            </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          // The Glassmorphism Card
          className="max-w-2xl w-full space-y-8 bg-white/5 backdrop-blur-lg p-10 rounded-2xl border border-white/10 shadow-2xl shadow-primary/10"
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-100">Get in Touch</h1>
            <p className="mt-2 text-lg text-gray-400">
              We’d love to hear from you. Email us at <a href="mailto:primusvlog@gmail.com" className="font-medium text-primary hover:text-primary/90 transition-colors">primusvlog@gmail.com</a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Each input field is wrapped for icon positioning */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-10 bg-black/20 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-primary focus:border-primary"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10 bg-black/20 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-primary focus:border-primary"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <BookText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="pl-10 bg-black/20 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-primary focus:border-primary"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                 <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-500" />
                <Textarea
                  id="message"
                  name="message"
                  required
                  className="pl-10 min-h-[120px] bg-black/20 border-gray-700 text-gray-200 placeholder:text-gray-500 focus:ring-primary focus:border-primary"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full btn-premium bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ContactPage;
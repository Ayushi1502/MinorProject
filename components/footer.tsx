import Link from "next/link"
// Added Github to the import
import { Linkedin, Instagram, Mail, Github, MessageCircle } from "lucide-react"

// A simple functional component for the WhatsApp icon


export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Section - Logo and Social Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-bold text-foreground">PathShala AI</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Empowering Indian students by using Generative AI to create personalized career roadmaps and map skills for today's market.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/in/ayushi1502"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/aayushi_.awasthi_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              {/* --- CORRECTED GITHUB ICON --- */}
              <Link
                href="https://github.com/Ayushi1502"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              {/* --- ADDED WHATSAPP ICON --- */}
              <Link
                href="https://chat.whatsapp.com/HpjO8xWO9gWK6HcR1aLE2X?mode=hqrt3" // Add your custom WhatsApp link here
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right Section - Contact Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <Link
                  href="mailto:ayushiawasthi99073@gmail.com"
                  className="text-foreground hover:text-primary transition-colors"
                >
                  ayushiawasthi99073@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2025 PathShala AI. All rights reserved.</span>
              <span>Made with ❤️  </span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-muted-foreground hover:text-primary transition-colors">
                Terms and Conditions
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
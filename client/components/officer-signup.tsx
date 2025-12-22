"use client"

import { SignUp } from "@clerk/nextjs"
import { Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { useUserRole } from "@/hooks/use-user-role"

interface Translations {
  title: string
  subtitle: string
  languageToggle: string
}

const translations: Record<string, Translations> = {
  en: {
    title: "Join as Loan Officer",
    subtitle: "Review and manage loan applications",
    languageToggle: "हिन्दी",
  },
  hi: {
    title: "ऋण अधिकारी के रूप में शामिल हों",
    subtitle: "ऋण आवेदन की समीक्षा करें और प्रबंधित करें",
    languageToggle: "English",
  },
}

export function OfficerSignUp() {
  const [language, setLanguage] = useState("en")
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { assignRole, loading, role } = useUserRole()

  const t = translations[language] || translations.en

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
  }

  // Handle successful Clerk sign-up
  useEffect(() => {
    // Set pending role as soon as component mounts
    localStorage.setItem("pendingRole", "officer")
  }, [])

  useEffect(() => {
    async function handlePostSignup() {
      if (isSignedIn && !loading && !role) {
        try {
          // Assign officer role via backend
          await assignRole('OFFICER')
          // Redirect to officer dashboard (existing flow)
          router.push('/officer/applications')
        } catch (error) {
          console.error('Failed to assign role:', error)
          // Stay on signup page, show error
          alert('Failed to complete signup. Please try again.')
        }
      }
    }

    handlePostSignup()
  }, [isSignedIn, loading, assignRole, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-end">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-secondary transition-colors"
          >
            <Globe className="h-4 w-4" />
            {t.languageToggle}
          </button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <SignUp
            routing="hash"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground w-full h-11 rounded-md font-medium',
                footerActionLink: 'text-primary hover:text-primary/80',
                card: 'bg-transparent shadow-none border-0',
                headerTitle: 'text-2xl font-bold text-foreground',
                headerSubtitle: 'text-muted-foreground text-sm',
                input: 'w-full px-3 py-2 border border-border rounded-md bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                formFieldInput: 'w-full px-3 py-2 border border-border rounded-md bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
                socialButtonsBlockButton: 'w-full bg-secondary border-border hover:bg-secondary/80 text-foreground',
                socialButtonsBlockButtonText: 'text-foreground',
              }
            }}
          />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:text-primary/80 font-medium">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  )
}

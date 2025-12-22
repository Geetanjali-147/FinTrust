"use client"

import { SignIn } from "@clerk/nextjs"
import { Globe } from "lucide-react"
import { useState } from "react"

interface Translations {
  title: string
  subtitle: string
  languageToggle: string
}

const translations: Record<string, Translations> = {
  en: {
    title: "Welcome Back",
    subtitle: "Sign in to access your FinTrust dashboard",
    languageToggle: "हिन्दी",
  },
  hi: {
    title: "स्वागत है",
    subtitle: "अपने FinTrust डैशबोर्ड तक पहुंचने के लिए साइन इन करें",
    languageToggle: "English",
  },
}

export default function LoginPage() {
  const [language, setLanguage] = useState("en")
  const t = translations[language] || translations.en

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
  }

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
          <SignIn 
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
          Don't have an account?{" "}
          <a href="/sign-up" className="text-primary hover:text-primary/80 font-medium">
            Sign up here
          </a>
        </div>
      </div>
    </div>
  )
}

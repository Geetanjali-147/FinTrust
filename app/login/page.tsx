"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LoginPage() {
  const [language, setLanguage] = useState("en")

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-between items-center">
          {/* Placeholder for Back button if needed, or just spacers */}
          <div />
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
            <Globe className="h-4 w-4" />
            {language === "en" ? "हिन्दी" : "English"}
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">LoanFlow</h1>
          <p className="text-muted-foreground text-balance">
            {language === "en"
              ? "Simplified loan approvals with AI-powered insights"
              : "एआई-संचालित अंतर्दृष्टि के साथ सरलीकृत ऋण अनुमोदन"}
          </p>
        </div>

        <LoginForm language={language} />

        <div className="flex justify-center mt-4">
          <a href="/dashboard" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors">
            Go to Dashboard <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

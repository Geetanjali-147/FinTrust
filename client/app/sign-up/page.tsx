"use client"

import { BeneficiarySignUp } from "@/components/beneficiary-signup"
import { OfficerSignUp } from "@/components/officer-signup"
import { useState } from "react"
import { Globe } from "lucide-react"

interface Translations {
  title: string
  subtitle: string
  choosePath: string
  beneficiary: string
  beneficiaryDesc: string
  officer: string
  officerDesc: string
  languageToggle: string
}

const translations: Record<string, Translations> = {
  en: {
    title: "Choose Your Path",
    subtitle: "Select how you'd like to use FinTrust",
    choosePath: "Choose your sign-up path:",
    beneficiary: "I'm a Beneficiary (Loan Applicant)",
    beneficiaryDesc: "Apply for loans and track your application status",
    officer: "I'm a Loan Officer",
    officerDesc: "Review and manage loan applications",
    languageToggle: "हिन्दी",
  },
  hi: {
    title: "अपना मार्ग चुनें",
    subtitle: "चुनें कि आप FinTrust का उपयोग कैसे करना चाहते हैं",
    choosePath: "अपना साइन-अप मार्ग चुनें:",
    beneficiary: "मैं एक लाभार्थी हूं (ऋण आवेदक)",
    beneficiaryDesc: "ऋण के लिए आवेदन करें और अपने आवेदन की स्थिति ट्रैक करें",
    officer: "मैं एक ऋण अधिकारी हूं",
    officerDesc: "ऋण आवेदन की समीक्षा करें और प्रबंधित करें",
    languageToggle: "English",
  },
}

export default function SignUpPage() {
  const [userType, setUserType] = useState<"beneficiary" | "officer" | null>(null)
  const [language, setLanguage] = useState("en")
  
  const t = translations[language] || translations.en

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
  }

  if (userType === "beneficiary") {
    return <BeneficiarySignUp />
  }

  if (userType === "officer") {
    return <OfficerSignUp />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl space-y-6">
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

        <div className="grid md:grid-cols-2 gap-6">
          {/* Beneficiary Option */}
          <div 
            className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => setUserType("beneficiary")}
          >
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold">{t.beneficiary}</h2>
                <p className="text-sm text-muted-foreground mt-2">{t.beneficiaryDesc}</p>
              </div>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Sign Up as Beneficiary
                </button>
              </div>
            </div>
          </div>

          {/* Officer Option */}
          <div 
            className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:bg-secondary/50 transition-colors"
            onClick={() => setUserType("officer")}
          >
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold">{t.officer}</h2>
                <p className="text-sm text-muted-foreground mt-2">{t.officerDesc}</p>
              </div>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Sign Up as Officer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:text-primary/80 font-medium">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  )
}

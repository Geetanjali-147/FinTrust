"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Clock, CheckCircle, AlertCircle, FileText } from "lucide-react"

interface Translations {
  title: string
  description: string
  applicationId: string
  status: string
  pending: string
  submitted: string
  submittedOn: string
  details: string
  name: string
  district: string
  livelihood: string
  nextSteps: string
  nextStepsText: string
  logout: string
}

const translations: Record<string, Translations> = {
  en: {
    title: "Application Status",
    description: "Track your loan application progress",
    applicationId: "Application ID",
    status: "Status",
    pending: "Pending Review",
    submitted: "Submitted Successfully",
    submittedOn: "Submitted on",
    details: "Application Details",
    name: "Name",
    district: "District",
    livelihood: "Livelihood",
    nextSteps: "Next Steps",
    nextStepsText:
      "Your application is under review by our loan officers. You will be notified once a decision has been made. This typically takes 2-3 business days.",
    logout: "Logout",
  },
  hi: {
    title: "आवेदन की स्थिति",
    description: "अपने ऋण आवेदन की प्रगति ट्रैक करें",
    applicationId: "आवेदन संख्या",
    status: "स्थिति",
    pending: "समीक्षाधीन",
    submitted: "सफलतापूर्वक जमा किया गया",
    submittedOn: "जमा किया गया",
    details: "आवेदन विवरण",
    name: "नाम",
    district: "जिला",
    livelihood: "आजीविका",
    nextSteps: "अगले कदम",
    nextStepsText:
      "आपका आवेदन हमारे ऋण अधिकारियों द्वारा समीक्षाधीन है। निर्णय लेने के बाद आपको सूचित किया जाएगा। इसमें आमतौर पर 2-3 कार्य दिवस लगते हैं।",
    logout: "लॉगआउट",
  },
}

export default function StatusPage() {
  const [language, setLanguage] = useState("en")
  const [applicationData, setApplicationData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    setLanguage(savedLanguage)

    const onboardingData = localStorage.getItem("onboardingData")
    if (onboardingData) {
      setApplicationData(JSON.parse(onboardingData))
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
  }

  const t = translations[language] || translations.en

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">LoanFlow</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2 bg-transparent">
              <Globe className="h-4 w-4" />
              {language === "en" ? "हिन्दी" : "English"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              {t.logout}
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{t.title}</CardTitle>
                  <CardDescription>{t.description}</CardDescription>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.applicationId}</p>
                  <p className="font-mono font-semibold">LA-83920156</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t.status}</p>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="h-3 w-3" />
                    {t.pending}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-secondary/50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="font-medium">{t.submitted}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.submittedOn} {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {applicationData && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>{t.details}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.name}</p>
                    <p className="font-medium">{applicationData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.district}</p>
                    <p className="font-medium">{applicationData.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.livelihood}</p>
                    <p className="font-medium">{applicationData.livelihood}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                <CardTitle>{t.nextSteps}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.nextStepsText}</p>
            </CardContent>
          </Card>

          <div className="flex gap-4 justify-center mt-8 pb-8">
            <Button variant="default" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push("/")}>
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

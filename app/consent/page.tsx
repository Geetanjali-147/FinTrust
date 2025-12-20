"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Globe, Shield } from "lucide-react"

interface Translations {
  title: string
  description: string
  consentText: string
  dataUsage: string
  agree: string
  decline: string
  mustAgree: string
}

const translations: Record<string, Translations> = {
  en: {
    title: "Consent Agreement",
    description: "Please review and provide your consent to proceed",
    consentText:
      "I consent to share my loan payment records and basic consumption patterns to assess my loan eligibility. I understand that this information will be used solely for evaluating my creditworthiness.",
    dataUsage:
      "The system will explicitly ask for user consent before using their data. We ensure your data is handled securely and will not be shared with third parties without your explicit permission.",
    agree: "I Agree",
    decline: "Decline",
    mustAgree: "You must agree to the terms to continue",
  },
  hi: {
    title: "सहमति समझौता",
    description: "कृपया समीक्षा करें और आगे बढ़ने के लिए अपनी सहमति प्रदान करें",
    consentText:
      "मैं अपनी ऋण भुगतान रिकॉर्ड और बुनियादी उपभोग पैटर्न साझा करने के लिए सहमति देता/देती हूं ताकि मेरी ऋण पात्रता का आकलन किया जा सके। मैं समझता/समझती हूं कि यह जानकारी केवल मेरी साख का मूल्यांकन करने के लिए उपयोग की जाएगी।",
    dataUsage:
      "सिस्टम आपके डेटा का उपयोग करने से पहले स्पष्ट रूप से उपयोगकर्ता सहमति मांगेगा। हम सुनिश्चित करते हैं कि आपका डेटा सुरक्षित रूप से संभाला जाता है और आपकी स्पष्ट अनुमति के बिना तीसरे पक्ष के साथ साझा नहीं किया जाएगा।",
    agree: "मैं सहमत हूं",
    decline: "अस्वीकार करें",
    mustAgree: "जारी रखने के लिए आपको शर्तों से सहमत होना होगा",
  },
}

export default function ConsentPage() {
  const [language, setLanguage] = useState("en")
  const [agreed, setAgreed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"
    setLanguage(savedLanguage)
  }, [])

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en"
    setLanguage(newLang)
    localStorage.setItem("language", newLang)
  }

  const t = translations[language] || translations.en

  const handleAgree = () => {
    if (!agreed) {
      alert(t.mustAgree)
      return
    }
    localStorage.setItem("consentGiven", "true")
    localStorage.setItem("consentTimestamp", new Date().toISOString())
    router.push("/status")
  }

  const handleDecline = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm" onClick={toggleLanguage} className="gap-2 bg-transparent">
            <Globe className="h-4 w-4" />
            {language === "en" ? "हिन्दी" : "English"}
          </Button>
        </div>

        <Card className="border-border bg-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <CardTitle className="text-2xl">{t.title}</CardTitle>
            </div>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm leading-relaxed">{t.consentText}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.dataUsage}</p>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox id="consent" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
              <label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                {t.consentText}
              </label>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleDecline} variant="outline" className="flex-1 bg-transparent">
                {t.decline}
              </Button>
              <Button onClick={handleAgree} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                {t.agree}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

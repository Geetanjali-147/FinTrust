"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

interface Translations {
  title: string
  description: string
  name: string
  gender: string
  male: string
  female: string
  other: string
  age: string
  address: string
  district: string
  livelihood: string
  income: string
  optional: string
  continue: string
  selectGender: string
}

const translations: Record<string, Translations> = {
  en: {
    title: "Beneficiary Onboarding",
    description: "Please provide your details to continue with the loan application",
    name: "Full Name",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    age: "Age",
    address: "Address",
    district: "District",
    livelihood: "Type of Livelihood/Business",
    income: "Approximate Monthly Income",
    optional: "optional",
    continue: "Continue",
    selectGender: "Select gender",
  },
  hi: {
    title: "लाभार्थी पंजीकरण",
    description: "कृपया ऋण आवेदन जारी रखने के लिए अपना विवरण प्रदान करें",
    name: "पूरा नाम",
    gender: "लिंग",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    age: "आयु",
    address: "पता",
    district: "जिला",
    livelihood: "आजीविका/व्यवसाय का प्रकार",
    income: "अनुमानित मासिक आय",
    optional: "वैकल्पिक",
    continue: "जारी रखें",
    selectGender: "लिंग चुनें",
  },
}

export default function OnboardingPage() {
  const [language, setLanguage] = useState("en")
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    address: "",
    district: "",
    livelihood: "",
    income: "",
  })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("onboardingData", JSON.stringify(formData))
    router.push("/consent")
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
            <CardTitle className="text-2xl">{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.name}</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">{t.gender}</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger className="bg-secondary border-border text-foreground">
                    <SelectValue placeholder={t.selectGender} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t.male}</SelectItem>
                    <SelectItem value="female">{t.female}</SelectItem>
                    <SelectItem value="other">{t.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">{t.age}</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t.address}</Label>
                <Input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="district">{t.district}</Label>
                <Input
                  id="district"
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  required
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="livelihood">{t.livelihood}</Label>
                <Input
                  id="livelihood"
                  type="text"
                  value={formData.livelihood}
                  onChange={(e) => setFormData({ ...formData, livelihood: e.target.value })}
                  required
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">
                  {t.income} ({t.optional})
                </Label>
                <Input
                  id="income"
                  type="number"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  className="bg-secondary border-border text-foreground"
                />
              </div>

              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {t.continue}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

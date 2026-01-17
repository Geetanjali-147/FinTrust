"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Translations {
  signIn: string
  enterCredentials: string
  username: string
  password: string
  role: string
  beneficiary: string
  officer: string
  signingIn: string
  selectRole: string
}

const translations: Record<string, Translations> = {
  en: {
    signIn: "Sign In",
    enterCredentials: "Enter your credentials to access the loan system",
    username: "Username",
    password: "Password",
    role: "Role",
    beneficiary: "Beneficiary",
    officer: "Loan Officer",
    signingIn: "Signing in...",
    selectRole: "Select your role",
  },
  hi: {
    signIn: "साइन इन करें",
    enterCredentials: "ऋण प्रणाली तक पहुंचने के लिए अपनी जानकारी दर्ज करें",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    role: "भूमिका",
    beneficiary: "लाभार्थी",
    officer: "ऋण अधिकारी",
    signingIn: "साइन इन हो रहा है...",
    selectRole: "अपनी भूमिका चुनें",
  },
}

export function LoginForm({ language }: { language: string }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"beneficiary" | "officer" | "">("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const t = translations[language] || translations.en

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("username", username)
      localStorage.setItem("role", role)
      localStorage.setItem("language", language)

      setLoading(false)
      setSuccess(true)
    }, 1000)
  }

  const navigateToDashboard = () => {
    if (role === "beneficiary") {
      router.push("/onboarding")
    } else {
      router.push("/officer/applications")
    }
  }

  if (success) {
    return (
      <Card className="border-border bg-card/90 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">Login Successful</CardTitle>
          <CardDescription className="text-foreground">Welcome back, {username}!</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={navigateToDashboard}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            Go to Dashboard <span aria-hidden="true">&rarr;</span>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border bg-card/90 backdrop-blur-sm shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground">{t.signIn}</CardTitle>
        <CardDescription className="text-muted-foreground">{t.enterCredentials}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground font-semibold">{t.username}</Label>
            <Input
              id="username"
              type="text"
              placeholder={t.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-secondary border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-semibold">{t.password}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-secondary border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-foreground font-semibold">{t.role}</Label>
            <Select value={role} onValueChange={(value) => setRole(value as "beneficiary" | "officer")}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder={t.selectRole} className="text-foreground" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beneficiary">{t.beneficiary}</SelectItem>
                <SelectItem value="officer">{t.officer}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={loading || !role}
          >
            {loading ? t.signingIn : t.signIn}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Globe, Mail, Lock, Landmark } from "lucide-react"

function LoginForm({ language }: { language: string }) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"beneficiary" | "officer" | "">("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) {
      alert(language === "en" ? "Please select a role" : "कृपया एक भूमिका चुनें")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Save role to localStorage
      localStorage.setItem("role", role)
      // Redirect to appropriate page based on role
      if (role === "beneficiary") {
        router.push("/onboarding")
      } else {
        router.push("/officer/applications")
      }
    }, 1500)
  }

  return (
    <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-300">
            {language === "en" ? "Email Address" : "ईमेल पता"}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === "en" ? "you@example.com" : "आप@example.com"}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium text-slate-300">
            {language === "en" ? "Role" : "भूमिका"}
          </label>
          <div className="relative">
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as "beneficiary" | "officer")}
              className="w-full pl-10 pr-10 py-3 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
              required
            >
              <option value="" disabled>
                {language === "en" ? "Select Role" : "भूमिका चुनें"}
              </option>
              <option value="beneficiary">
                {language === "en" ? "Beneficiary" : "लाभार्थी"}
              </option>
              <option value="officer">
                {language === "en" ? "Loan Officer" : "ऋण अधिकारी"}
              </option>
            </select>
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-300">
            {language === "en" ? "Password" : "पासवर्ड"}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === "en" ? "Enter your password" : "अपना पासवर्ड दर्ज करें"}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-800" />
            <span className="text-sm text-slate-400">
              {language === "en" ? "Remember me" : "मुझे याद रखें"}
            </span>
          </label>
          <button onClick={(e) => e.preventDefault()} className="text-sm text-blue-400 hover:text-purple-400 transition-colors">
            {language === "en" ? "Forgot password?" : "पासवर्ड भूल गए?"}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? language === "en"
              ? "Signing in..."
              : "साइन इन किया जा रहा है..."
            : language === "en"
            ? "Sign In"
            : "साइन इन करें"}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-800 text-slate-500">
              {language === "en" ? "or continue with" : "या जारी रखें"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-medium text-slate-300">Google</span>
          </button>
          <button
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            <span className="text-sm font-medium text-slate-300">GitHub</span>
          </button>
        </div>

        <p className="text-center text-sm text-slate-400 mt-4">
          {language === "en" ? "Don't have an account? " : "खाता नहीं है? "}
          <button onClick={(e) => e.preventDefault()} className="text-blue-400 hover:text-purple-400 font-medium transition-colors">
            {language === "en" ? "Sign up" : "साइन अप करें"}
          </button>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<"beneficiary" | "officer" | "">("")
  const [language, setLanguage] = useState<string>("en")

  const toggleLanguage = () => {
    setLanguage((prev: string) => (prev === "en" ? "hi" : "en"))
  }

  const handleDashboardNavigate = () => {
    if (!selectedRole) {
      alert(language === "en" ? "Please select a role" : "कृपया एक भूमिका चुनें")
      return
    }
    // Save role to localStorage
    localStorage.setItem("role", selectedRole)
    // Navigate to appropriate page based on role
    if (selectedRole === "beneficiary") {
      router.push("/onboarding")
    } else {
      router.push("/officer/applications")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-end">
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <Globe className="h-4 w-4 text-slate-300" />
            <span className="text-sm font-medium text-slate-300">
              {language === "en" ? "हिन्दी" : "English"}
            </span>
          </button>
        </div>

        <div className="text-center space-y-3">
          <div className="mx-auto bg-linear-to-r from-blue-500 to-purple-600 p-4 rounded-2xl w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
            <Landmark className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
            LoanFlow
          </h1>
          <p className="text-slate-400 text-lg max-w-sm mx-auto">
            {language === "en"
              ? "Simplified loan approvals with AI-powered insights"
              : "एआई-संचालित अंतर्दृष्टि के साथ सरलीकृत ऋण अनुमोदन"}
          </p>
          <div className="relative flex justify-center my-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="30" viewBox="0 0 120 30" className="text-slate-600">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="15" cy="15" r="3" />
                <circle cx="30" cy="10" r="3" />
                <circle cx="45" cy="15" r="3" />
                <circle cx="60" cy="20" r="3" />
                <circle cx="75" cy="12" r="3" />
                <circle cx="90" cy="18" r="3" />
                <circle cx="105" cy="15" r="3" />
                <path d="M15,15 Q30,5 45,15 T75,15" />
                <path d="M30,10 Q45,20 60,10 T90,18" />
              </g>
            </svg>
          </div>
        </div>

        <LoginForm language={language} />

        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as "beneficiary" | "officer")}
              className="px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none text-sm"
            >
              <option value="" disabled>
                {language === "en" ? "Select Role" : "भूमिका चुनें"}
              </option>
              <option value="beneficiary">
                {language === "en" ? "Beneficiary" : "लाभार्थी"}
              </option>
              <option value="officer">
                {language === "en" ? "Loan Officer" : "ऋण अधिकारी"}
              </option>
            </select>
            <button 
              onClick={handleDashboardNavigate}
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-purple-400 font-medium transition-colors group"
            >
              {language === "en" ? "Go to Dashboard" : "डैशबोर्ड पर जाएं"}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
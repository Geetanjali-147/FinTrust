"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, CheckCircle, XCircle, TrendingUp, AlertTriangle, AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"

// API base URL - adjust based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

interface Application {
  _id: string
  userId: {
    _id?: string
    email?: string
    role?: string
  } | string
  loanAmount: number
  purpose: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW"
  createdAt: string
  updatedAt: string
}

interface ScoreBreakdown {
  status: string
  duration: number
  credit_history: string
  purpose: string
  credit_amount: number
  savings: string
  employment: string
  installment_rate: number
  personal_status_sex: string
  other_debtors: string
  residence_since: number
  property: string
  age: number
  other_installment_plans: string
  housing: string
  existing_credits: number
  job: string
  people_liable: number
  telephone: string
  foreign_worker: string
}

interface Score {
  _id: string
  applicationId: string
  userId: string
  probability: number
  creditworthy: boolean
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH"
  breakdown: ScoreBreakdown
  modelVersion: string
  scoredAt: string
}

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const [application, setApplication] = useState<Application | null>(null)
  const [score, setScore] = useState<Score | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null)
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "officer") {
      router.push("/")
      return
    }

    fetchApplicationData()
  }, [router, resolvedParams.id])

  const fetchApplicationData = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("token")
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      }

      // Fetch application details and score in parallel
      const [appResponse, scoreResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/applications/${resolvedParams.id}`, { headers }),
        fetch(`${API_BASE_URL}/api/applications/${resolvedParams.id}/score`, { headers }),
      ])

      if (!appResponse.ok) {
        if (appResponse.status === 404) {
          throw new Error("Application not found")
        }
        throw new Error("Failed to fetch application details")
      }

      const appData = await appResponse.json()
      setApplication(appData)

      // Score might not exist yet, handle gracefully
      if (scoreResponse.ok) {
        const scoreData = await scoreResponse.json()
        setScore(scoreData)
      } else {
        console.warn("Score not available for this application")
        setScore(null)
      }
    } catch (err) {
      console.error("Error fetching application data:", err)
      setError(err instanceof Error ? err.message : "Failed to load application")
    } finally {
      setLoading(false)
    }
  }

  const handleDecision = async (type: "approve" | "reject") => {
    try {
      setSubmitting(true)

      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/api/officer/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          applicationId: resolvedParams.id,
          decision: type === "approve" ? "APPROVE" : "REJECT",
          comments: notes,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to submit review")
      }

      setDecision(type)
      
      toast.success(
        type === "approve" ? "Application Approved" : "Application Rejected",
        {
          description: `The application has been ${type === "approve" ? "approved" : "rejected"} successfully.`,
        }
      )

      // Redirect after a short delay to show the success state
      setTimeout(() => {
        router.push("/officer/applications")
      }, 2000)
    } catch (err) {
      console.error("Error submitting review:", err)
      toast.error("Failed to Submit Review", {
        description: err instanceof Error ? err.message : "Please try again.",
      })
      setSubmitting(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getUserEmail = (userId: Application["userId"]) => {
    if (typeof userId === "object" && userId?.email) {
      return userId.email
    }
    return "Unknown"
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "LOW":
        return "default"
      case "MEDIUM":
        return "secondary"
      case "HIGH":
        return "destructive"
      case "VERY_HIGH":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getCreditScoreLabel = (probability: number) => {
    const scorePercent = probability * 100
    if (scorePercent >= 80) return "Excellent"
    if (scorePercent >= 60) return "Good"
    if (scorePercent >= 40) return "Fair"
    return "Poor"
  }

  // Convert probability (0-1) to a score (0-100)
  const getCreditScore = (probability: number) => Math.round(probability * 100)

  // Get human-readable factor names
  const getFactorLabel = (key: string): string => {
    const labels: Record<string, string> = {
      status: "Account Status",
      duration: "Loan Duration (months)",
      credit_history: "Credit History",
      purpose: "Loan Purpose",
      credit_amount: "Credit Amount",
      savings: "Savings Account",
      employment: "Employment Status",
      installment_rate: "Installment Rate",
      personal_status_sex: "Personal Status",
      other_debtors: "Other Debtors",
      residence_since: "Residence Duration",
      property: "Property",
      age: "Age",
      other_installment_plans: "Other Installments",
      housing: "Housing",
      existing_credits: "Existing Credits",
      job: "Job Type",
      people_liable: "Dependents",
      telephone: "Telephone",
      foreign_worker: "Foreign Worker",
    }
    return labels[key] || key
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Skeleton className="h-10 w-48 mb-6" />
          <div className="grid gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-3 w-24 mb-2" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Error State
  if (error || !application) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Button>
          <Card className="border-border bg-card">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <p className="text-lg font-medium text-destructive mb-2">Error Loading Application</p>
              <p className="text-muted-foreground mb-4">{error || "Application not found"}</p>
              <Button onClick={fetchApplicationData} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>

        <div className="grid gap-6">
          {/* Application Details Card */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Application Details</CardTitle>
                  <CardDescription>Review applicant information and credit score</CardDescription>
                </div>
                {score && (
                  <Badge variant={getRiskLevelColor(score.riskLevel)}>
                    {score.riskLevel.replace("_", " ")} Risk
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Application ID</p>
                  <p className="font-mono font-semibold">{application._id.slice(-12).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submitted Date</p>
                  <p className="font-medium">{formatDate(application.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Applicant Email</p>
                  <p className="font-medium">{getUserEmail(application.userId)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge variant={application.status === "APPROVED" ? "default" : application.status === "REJECTED" ? "destructive" : "secondary"}>
                    {application.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Purpose</p>
                  <p className="font-medium">{application.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                  <p className="font-medium">{formatCurrency(application.loanAmount)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Score Analysis Card */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <CardTitle>Credit Score Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {score ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-4xl font-bold">{getCreditScore(score.probability)}</p>
                      <p className="text-sm text-muted-foreground">Credit Score (0-100)</p>
                    </div>
                    <Badge className="text-lg px-4 py-2" variant={getRiskLevelColor(score.riskLevel)}>
                      {getCreditScoreLabel(score.probability)}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Creditworthiness</span>
                      <span className="font-medium">{getCreditScore(score.probability)}/100</span>
                    </div>
                    <Progress value={score.probability * 100} className="h-2" />
                  </div>

                  <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                    <p className="font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      AI Model Analysis
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      The AI credit risk model has analyzed this application and determined a{" "}
                      <span className="font-medium text-foreground">
                        {(score.probability * 100).toFixed(1)}% probability of creditworthiness
                      </span>
                      . Risk level is assessed as <span className="font-medium text-foreground">{score.riskLevel.replace("_", " ")}</span>.
                    </p>
                  </div>

                  {/* Score Factors Breakdown */}
                  <div className="space-y-3">
                    <p className="font-medium">Score Factors</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(score.breakdown)
                        .filter(([key]) => ["age", "employment", "savings", "credit_history", "housing", "property"].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className="p-3 bg-secondary/30 rounded-lg">
                            <p className="text-xs text-muted-foreground">{getFactorLabel(key)}</p>
                            <p className="font-medium text-sm truncate">{String(value)}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    score.creditworthy 
                      ? "bg-green-500/10 border border-green-500/20" 
                      : "bg-red-500/10 border border-red-500/20"
                  }`}>
                    {score.creditworthy ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium">
                      ML Model Recommendation: {score.creditworthy ? "Approve" : "Review Required"}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
                  <p className="font-medium">Score Not Available</p>
                  <p className="text-sm text-muted-foreground">
                    The credit score for this application is still being calculated or is not available.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Decision Card - Only show if application is still pending */}
          {(application.status === "PENDING" || application.status === "UNDER_REVIEW") && (
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle>Decision & Notes</CardTitle>
                <CardDescription>Make your decision and add any relevant notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Officer Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any notes or comments about this application..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-24 bg-secondary border-border"
                    disabled={!!decision || submitting}
                  />
                </div>

                {decision ? (
                  <div
                    className={`p-4 rounded-lg flex items-center gap-2 ${
                      decision === "approve"
                        ? "bg-green-500/10 border border-green-500/20"
                        : "bg-red-500/10 border border-red-500/20"
                    }`}
                  >
                    {decision === "approve" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <span className="font-medium">
                      Application {decision === "approve" ? "Approved" : "Rejected"} Successfully
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleDecision("reject")}
                      variant="destructive"
                      className="flex-1 gap-2"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                      Reject Application
                    </Button>
                    <Button
                      onClick={() => handleDecision("approve")}
                      className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      Approve Application
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Already Decided Notice */}
          {(application.status === "APPROVED" || application.status === "REJECTED") && (
            <Card className="border-border bg-card">
              <CardContent className="py-6">
                <div
                  className={`p-4 rounded-lg flex items-center gap-2 ${
                    application.status === "APPROVED"
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  {application.status === "APPROVED" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-medium">
                    This application has been {application.status.toLowerCase()}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, TrendingUp, AlertTriangle } from "lucide-react"

const mockApplication = {
  id: "LA-12345678",
  name: "Rajesh Kumar",
  gender: "Male",
  age: 35,
  district: "Mumbai",
  address: "123 Main Street, Andheri West",
  livelihood: "Small Business Owner",
  income: "₹25,000",
  submittedDate: "2024-01-15",
  creditScore: 720,
  riskLevel: "Low",
  recommendation: "Approve",
}

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null)
  const [notes, setNotes] = useState("")
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "officer") {
      router.push("/")
    }
  }, [router])

  const handleDecision = (type: "approve" | "reject") => {
    setDecision(type)
    localStorage.setItem(`decision-${params.id}`, JSON.stringify({ type, notes, timestamp: new Date().toISOString() }))
    setTimeout(() => {
      router.push("/officer/applications")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <Button variant="outline" size="sm" onClick={() => router.back()} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>

        <div className="grid gap-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Application Details</CardTitle>
                  <CardDescription>Review applicant information and credit score</CardDescription>
                </div>
                <Badge variant={mockApplication.riskLevel === "Low" ? "default" : "destructive"}>
                  {mockApplication.riskLevel} Risk
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Application ID</p>
                  <p className="font-mono font-semibold">{mockApplication.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Submitted Date</p>
                  <p className="font-medium">{mockApplication.submittedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                  <p className="font-medium">{mockApplication.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Age / Gender</p>
                  <p className="font-medium">
                    {mockApplication.age} / {mockApplication.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">District</p>
                  <p className="font-medium">{mockApplication.district}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Livelihood</p>
                  <p className="font-medium">{mockApplication.livelihood}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="font-medium">{mockApplication.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Income</p>
                  <p className="font-medium">{mockApplication.income}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <CardTitle>Credit Score Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{mockApplication.creditScore}</p>
                  <p className="text-sm text-muted-foreground">Credit Score</p>
                </div>
                <Badge className="text-lg px-4 py-2" variant="default">
                  Good
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Creditworthiness</span>
                  <span className="font-medium">{mockApplication.creditScore}/850</span>
                </div>
                <Progress value={(mockApplication.creditScore / 850) * 100} className="h-2" />
              </div>

              <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
                <p className="font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  AI Model Explanation
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The applicant demonstrates strong repayment capacity based on stable income, consistent payment
                  history, and low debt-to-income ratio. The credit risk prediction model indicates a{" "}
                  <span className="font-medium text-foreground">92% probability of timely repayment</span>. Key positive
                  factors include established business operations and no previous defaults.
                </p>
              </div>

              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">ML Model Recommendation: {mockApplication.recommendation}</span>
              </div>
            </CardContent>
          </Card>

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
                  <Button onClick={() => handleDecision("reject")} variant="destructive" className="flex-1 gap-2">
                    <XCircle className="h-4 w-4" />
                    Reject Application
                  </Button>
                  <Button
                    onClick={() => handleDecision("approve")}
                    className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve Application
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

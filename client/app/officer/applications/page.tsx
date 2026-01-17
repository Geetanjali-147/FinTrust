"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Search, LogOut, AlertCircle } from "lucide-react"

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

export default function ApplicationsListPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "officer") {
      router.push("/")
      return
    }

    fetchApplications()
  }, [router])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get the auth token from localStorage
      // In production with Clerk, use: const token = await getToken()
      const token = localStorage.getItem("token")

      const response = await fetch(`${API_BASE_URL}/api/officer/applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized. Please log in again.")
        }
        if (response.status === 403) {
          throw new Error("Access denied. Officer role required.")
        }
        throw new Error("Failed to fetch applications")
      }

      const data = await response.json()
      setApplications(data)
    } catch (err) {
      console.error("Error fetching applications:", err)
      setError(err instanceof Error ? err.message : "Failed to load applications")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "default"
      case "REJECTED":
        return "destructive"
      case "UNDER_REVIEW":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending"
      case "APPROVED":
        return "Approved"
      case "REJECTED":
        return "Rejected"
      case "UNDER_REVIEW":
        return "Under Review"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getUserEmail = (userId: Application["userId"]) => {
    if (typeof userId === "object" && userId?.email) {
      return userId.email
    }
    return "Unknown"
  }

  const filteredApplications = applications.filter((app) => {
    const email = getUserEmail(app.userId).toLowerCase()
    const purpose = app.purpose.toLowerCase()
    const id = app._id.toLowerCase()
    const query = searchQuery.toLowerCase()
    return email.includes(query) || purpose.includes(query) || id.includes(query)
  })

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Loan Officer Dashboard</h1>
            <p className="text-muted-foreground">Review and manage loan applications</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card className="border-border bg-card mb-6">
          <CardHeader>
            <CardTitle>Application List</CardTitle>
            <CardDescription>Click on any application to view details and make a decision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email, purpose, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-8 rounded" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <p className="text-lg font-medium text-destructive mb-2">Error Loading Applications</p>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={fetchApplications} variant="outline">
                  Try Again
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && applications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No Applications Found</p>
                <p className="text-muted-foreground">There are no loan applications to review at this time.</p>
              </div>
            )}

            {/* Applications List */}
            {!loading && !error && filteredApplications.length > 0 && (
              <div className="space-y-3">
                {filteredApplications.map((app) => (
                  <div
                    key={app._id}
                    onClick={() => router.push(`/officer/applications/${app._id}`)}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">{getUserEmail(app.userId)}</p>
                        <p className="text-sm text-muted-foreground">
                          {app._id.slice(-8).toUpperCase()} • {app.purpose} • {formatCurrency(app.loanAmount)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(app.loanAmount)}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(app.createdAt)}</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(app.status)}>{getStatusLabel(app.status)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Search Results */}
            {!loading && !error && applications.length > 0 && filteredApplications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No Results Found</p>
                <p className="text-muted-foreground">Try adjusting your search query.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

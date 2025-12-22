"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Search, LogOut } from "lucide-react"

const mockApplications = [
  {
    id: "LA-12345678",
    name: "Rajesh Kumar",
    district: "Mumbai",
    livelihood: "Small Business Owner",
    status: "pending",
    submittedDate: "2024-01-15",
    creditScore: 720,
  },
  {
    id: "LA-12345679",
    name: "Priya Sharma",
    district: "Delhi",
    livelihood: "Shopkeeper",
    status: "pending",
    submittedDate: "2024-01-14",
    creditScore: 680,
  },
  {
    id: "LA-12345680",
    name: "Amit Patel",
    district: "Ahmedabad",
    livelihood: "Farmer",
    status: "pending",
    submittedDate: "2024-01-13",
    creditScore: 650,
  },
]

export default function ApplicationsListPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role !== "officer") {
      router.push("/")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.clear()
    router.push("/")
  }

  const filteredApplications = applications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.district.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
                placeholder="Search by name, ID, or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>

            <div className="space-y-3">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  onClick={() => router.push(`/officer/applications/${app.id}`)}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{app.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {app.id} • {app.district} • {app.livelihood}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Score: {app.creditScore}</p>
                      <p className="text-xs text-muted-foreground">{app.submittedDate}</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

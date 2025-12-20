"use client"

import { useState } from "react"
import { MoreHorizontal, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Dummy data
const applications = [
    {
        id: "LA-2301",
        applicant: "Rahul Sharma",
        amount: "$25,000",
        date: "2023-12-19",
        status: "Pending",
        type: "Personal Loan",
    },
    {
        id: "LA-2302",
        applicant: "Priya Singh",
        amount: "$150,000",
        date: "2023-12-18",
        status: "Approved",
        type: "Home Loan",
    },
    {
        id: "LA-2303",
        applicant: "Amit Patel",
        amount: "$15,000",
        date: "2023-12-18",
        status: "Rejected",
        type: "Car Loan",
    },
    {
        id: "LA-2304",
        applicant: "Sneha Gupta",
        amount: "$50,000",
        date: "2023-12-17",
        status: "In Review",
        type: "Education Loan",
    },
    {
        id: "LA-2305",
        applicant: "Vikram Malhotra",
        amount: "$80,000",
        date: "2023-12-16",
        status: "Approved",
        type: "Business Loan",
    },
    {
        id: "LA-2306",
        applicant: "Anjali Desai",
        amount: "$10,000",
        date: "2023-12-15",
        status: "Pending",
        type: "Personal Loan",
    },
]

export default function ApplicationsPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredApplications = applications.filter(
        (app) =>
            app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "Rejected":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            case "In Review":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Applications</h2>
                    <p className="text-muted-foreground">Manage and review loan applications.</p>
                </div>
                <Button>New Application</Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>All Applications</CardTitle>
                    <CardDescription>
                        A list of all loan applications including their current status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search applications..."
                                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Application ID</TableHead>
                                <TableHead>Applicant</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplications.map((app) => (
                                <TableRow key={app.id}>
                                    <TableCell className="font-medium">{app.id}</TableCell>
                                    <TableCell>{app.applicant}</TableCell>
                                    <TableCell>{app.type}</TableCell>
                                    <TableCell>{app.amount}</TableCell>
                                    <TableCell>{app.date}</TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(app.status)} variant="outline">
                                            {app.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Application</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">Reject Application</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

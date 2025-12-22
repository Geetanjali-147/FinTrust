"use client"

import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const customers = [
    {
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 98765 43210",
        kycStatus: "Verified",
        loans: 1,
        initials: "RS"
    },
    {
        name: "Priya Singh",
        email: "priya.singh@example.com",
        phone: "+91 87654 32109",
        kycStatus: "Verified",
        loans: 2,
        initials: "PS"
    },
    {
        name: "Amit Patel",
        email: "amit.patel@example.com",
        phone: "+91 76543 21098",
        kycStatus: "Pending",
        loans: 0,
        initials: "AP"
    },
    {
        name: "Sneha Gupta",
        email: "sneha.gupta@example.com",
        phone: "+91 65432 10987",
        kycStatus: "Verified",
        loans: 3,
        initials: "SG"
    },
]

export default function CustomersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                    <p className="text-muted-foreground">Directory of all registered customers.</p>
                </div>
                <Button>Add Customer</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Customer Directory</CardTitle>
                    <CardDescription>
                        A list of all customers and their KYC status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>KYC Status</TableHead>
                                <TableHead className="text-right">Active Loans</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.email}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="" />
                                            <AvatarFallback>{customer.initials}</AvatarFallback>
                                        </Avatar>
                                        {customer.name}
                                    </TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>
                                        {customer.kycStatus === "Verified" ? (
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Verified</span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Pending</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">{customer.loans}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

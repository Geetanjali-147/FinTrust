import { OverviewChart } from "@/components/overview-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Users, TrendingUp, CheckCircle, UserPlus } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500/20">
                        <path d="M20 8h-6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z" />
                        <path d="M4 8h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
                        <path d="M18 12h.01" />
                        <path d="M6 12h.01" />
                    </svg>
                </div>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" className="text-blue-500/5 dark:text-blue-400/5">
                        <g fill="none" stroke="currentColor" strokeWidth="0.5">
                            <circle cx="100" cy="50" r="80" />
                            <circle cx="300" cy="150" r="80" />
                            <path d="M50,100 Q200,20 350,100" />
                            <path d="M50,150 Q200,180 350,150" />
                            <path d="M150,50 L250,150" />
                            <path d="M150,150 L250,50" />
                        </g>
                    </svg>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="multicolor-card bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/30 dark:border-blue-700/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,234</div>
                        <p className="text-xs text-blue-500/70 dark:text-blue-400/70 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="multicolor-card bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/30 dark:border-purple-700/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                        <Activity className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">+573</div>
                        <p className="text-xs text-purple-500/70 dark:text-purple-400/70 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +201 since last hour
                        </p>
                    </CardContent>
                </Card>
                <Card className="multicolor-card bg-linear-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border border-green-200/30 dark:border-green-700/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approvals</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">+12,234</div>
                        <p className="text-xs text-green-500/70 dark:text-green-400/70 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +19% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="multicolor-card bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200/30 dark:border-orange-700/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                        <UserPlus className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">+573</div>
                        <p className="text-xs text-orange-500/70 dark:text-orange-400/70 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> +201 since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 multicolor-card bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/30 dark:border-blue-700/30">
                    <CardHeader>
                        <CardTitle className="text-blue-600 dark:text-blue-400">Overview</CardTitle>
                        <CardDescription className="text-blue-500/70 dark:text-blue-400/70">Monthly loan applications overview.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart />
                    </CardContent>
                </Card>
                <Card className="col-span-3 multicolor-card bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/30 dark:border-purple-700/30">
                    <CardHeader>
                        <CardTitle className="text-purple-600 dark:text-purple-400">Recent Activity</CardTitle>
                        <CardDescription className="text-purple-500/70 dark:text-purple-400/70">
                            Latest loan application updates.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-blue-600 dark:text-blue-400">Rahul Sharma applied for Personal Loan</p>
                                    <p className="text-sm text-muted-foreground">
                                        2 minutes ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-blue-600 dark:text-blue-400">+$1,500</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-green-600 dark:text-green-400">Priya Singh approved</p>
                                    <p className="text-sm text-muted-foreground">
                                        15 minutes ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-green-600 dark:text-green-400">+$2,300</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none text-orange-600 dark:text-orange-400">Amit Patel applied for Home Loan</p>
                                    <p className="text-sm text-muted-foreground">
                                        45 minutes ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-orange-600 dark:text-orange-400">+$25,000</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

import { OverviewChart } from "@/components/overview-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight gradient-text">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="glass-strong hover-lift border-primary/20 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-cyan transition-all duration-300">
                            <DollarSign className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold gradient-text">1,234</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="glass-strong hover-lift border-accent/20 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
                        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:glow-purple transition-all duration-300">
                            <Activity className="h-4 w-4 text-accent" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold gradient-text">+573</div>
                        <p className="text-xs text-muted-foreground">+201 since last hour</p>
                    </CardContent>
                </Card>
                <Card className="glass-strong hover-lift border-primary/20 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Approvals</CardTitle>
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-cyan transition-all duration-300">
                            <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold gradient-text">+12,234</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>
                <Card className="glass-strong hover-lift border-accent/20 group">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                        <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:glow-purple transition-all duration-300">
                            <Users className="h-4 w-4 text-accent" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold gradient-text">+573</div>
                        <p className="text-xs text-muted-foreground">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 glass-strong border-primary/20">
                    <CardHeader>
                        <CardTitle className="gradient-text">Overview</CardTitle>
                        <CardDescription>Monthly loan applications overview.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart />
                    </CardContent>
                </Card>
                <Card className="col-span-3 glass-strong border-accent/20">
                    <CardHeader>
                        <CardTitle className="gradient-text">Recent Activity</CardTitle>
                        <CardDescription>
                            Latest loan application updates.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Rahul Sharma applied for Personal Loan</p>
                                    <p className="text-sm text-muted-foreground">
                                        2 minutes ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-primary">+$1,500</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Priya Singh approved</p>
                                    <p className="text-sm text-muted-foreground">
                                        15 minutes ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-accent">+$2,300</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Amit Patel applied for Home Loan</p>
                                    <p className="text-sm text-muted-foreground">
                                        45 minutes ago
                                    </p>
                                </div>
                                <div className="ml-auto font-medium text-primary">+$25,000</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

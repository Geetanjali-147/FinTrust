"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, CreditCard, Home, LayoutDashboard, Settings, UserCircle, Users } from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function DashboardSidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const routes = [
        {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: "Applications",
            icon: CreditCard,
            href: "/dashboard/applications",
            active: pathname?.startsWith("/dashboard/applications"),
        },
        {
            label: "Customers",
            icon: Users,
            href: "/dashboard/customers",
            active: pathname?.startsWith("/dashboard/customers"),
        },
        {
            label: "Analytics",
            icon: BarChart3,
            href: "/dashboard/analytics",
            active: pathname?.startsWith("/dashboard/analytics"),
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/dashboard/settings",
            active: pathname?.startsWith("/dashboard/settings"),
        },
    ]

    return (
        <div className={cn("pb-12 h-screen border-r bg-background", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <Link href="/" className="flex items-center pl-3 mb-9">
                        <h2 className="text-2xl font-bold tracking-tight text-primary">FinTrust</h2>
                    </Link>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                        User
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href="/dashboard/profile">
                                <UserCircle className="mr-2 h-4 w-4" />
                                Profile
                            </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start" asChild>
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Back to Website
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

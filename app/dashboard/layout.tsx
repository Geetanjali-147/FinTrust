import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { UserNav } from "@/components/user-nav" // We might need to create this later or just mock it for now
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <DashboardSidebar className="hidden md:block w-64 flex-shrink-0" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b px-6 bg-background">
                    <div className="md:hidden">
                        <span className="font-bold">LoanFlow</span>
                    </div>
                    <div className="flex items-center ml-auto gap-4">
                        {/* Placeholder for UserNav or just a Logout button for now */}
                        <Button variant="ghost" size="sm">Logout</Button>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
                    {children}
                </main>
            </div>
        </div>
    )
}

"use client"

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LogOut, User, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link";

export function AuthButtons() {
  const router = useRouter()

  const handleLogout = () => {
    // Clerk handles logout automatically through UserButton
    // This function is just for any additional cleanup if needed
  }

  return (
    <div className="flex items-center gap-4">
      <SignedOut>
        <SignInButton>
          <Button variant="outline" size="sm" className="bg-transparent border-border hover:bg-secondary">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </SignInButton>
        <Link href="/sign-up">
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Sign Up
          </Button>
        </Link>
      </SignedOut>
      
      <SignedIn>
        <div className="flex items-center gap-2">
          {/* Role indicators will be added once Clerk roles are properly configured in dashboard */}
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8",
                userButtonPopoverCard: "bg-card border-border shadow-lg",
                userButtonPopoverActions: "border-t border-border",
                userButtonPopoverActionButton: "hover:bg-secondary",
              }
            }}
          />
        </div>
      </SignedIn>
    </div>
  )
}

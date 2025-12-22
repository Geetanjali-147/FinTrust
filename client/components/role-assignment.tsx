"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"

export function RoleAssignment() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) {
      const pendingRole = localStorage.getItem("pendingRole")
      
      if (pendingRole) {
        // Store the role in localStorage for role checking functions
        localStorage.setItem("userRole", pendingRole)
        
        // Clear the pending role after processing
        localStorage.removeItem("pendingRole")
        
        // Redirect based on role
        if (pendingRole === "beneficiary") {
          router.push("/onboarding")
        } else if (pendingRole === "officer") {
          router.push("/officer/applications")
        }
      } else {
        // If no pending role, redirect to dashboard
        router.push("/dashboard")
      }
    }
  }, [isSignedIn, isLoaded, router])

  return null
}

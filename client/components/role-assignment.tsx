"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserRole } from "@/hooks/use-user-role"

/**
 * Component that handles role-based redirection after login
 * No longer manages role assignment (handled in signup components)
 */
export function RoleAssignment() {
  const { role, loading, isSignedIn, isLoaded } = useUserRole()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn && role) {
      const currentPath = window.location.pathname
      const upperRole = role.toUpperCase()
      console.log(`[RoleAssignment] User signed in with role: ${upperRole}. Current path: ${currentPath}`)

      // Redirect if on auth pages OR landing page
      const authPaths = ['/sign-up', '/login', '/', '/role-selection']
      const isAuthPath = authPaths.some(path => currentPath === path || currentPath.startsWith(path + '/'))

      if (isAuthPath) {
        console.log(`[RoleAssignment] On auth path, redirecting based on role: ${upperRole}`)
        // Redirect based on backend role
        if (upperRole === 'BENEFICIARY') {
          router.push("/onboarding")
        } else if (upperRole === 'OFFICER') {
          router.push("/officer/applications")
        } else if (upperRole === 'ADMIN') {
          router.push("/admin/dashboard")
        } else {
          router.push("/dashboard")
        }
      }
    } else if (isSignedIn && !role && !loading) {
      console.log('[RoleAssignment] User signed in but NO ROLE set yet.')
    }
  }, [isSignedIn, isLoaded, role, loading, router])

  return null
}

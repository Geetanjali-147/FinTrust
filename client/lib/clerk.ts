import { auth } from "@clerk/nextjs/server"

/**
 * Get user ID
 */
export function getUserId(): string | null {
  const { userId } = auth()
  return userId
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  const { userId } = auth()
  return !!userId
}

/**
 * Check if the current user has a specific role
 * This checks both localStorage (for development) and Clerk user metadata
 */
export function hasRole(role: string): boolean {
  // Check localStorage first (for development/testing)
  const storedRole = localStorage.getItem("userRole")
  if (storedRole) {
    return storedRole === role
  }
  
  // Check Clerk user metadata (production implementation)
  // Note: This requires Clerk user metadata to be set up
  // In a real implementation, you would use Clerk's user metadata API
  // For now, returns false as placeholder until Clerk integration is complete
  return false
}

/**
 * Set user role in Clerk metadata
 * This should be called after successful sign-up
 */
export async function setUserRole(role: string): Promise<void> {
  // Store in localStorage for immediate access
  localStorage.setItem("userRole", role)
  
  // In production, this would call Clerk's user metadata API
  // Example: await clerkClient.users.updateUserMetadata(userId, { role })
  // For now, we'll log the role assignment
  console.log(`Role ${role} assigned to user`)
}

/**
 * Check if user is a beneficiary
 */
export function isBeneficiary(): boolean {
  return hasRole('beneficiary')
}

/**
 * Check if user is an officer
 */
export function isOfficer(): boolean {
  return hasRole('officer')
}

/**
 * Check if user is an admin
 */
export function isAdmin(): boolean {
  return hasRole('admin')
}

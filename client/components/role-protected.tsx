import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { isOfficer, isBeneficiary, isAdmin } from "@/lib/clerk"

interface RoleProtectedProps {
  children: React.ReactNode
  requiredRole?: 'officer' | 'beneficiary' | 'admin'
  fallback?: React.ReactNode
}

export function RoleProtected({ children, requiredRole, fallback }: RoleProtectedProps) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      router.push('/login')
      return
    }

    if (requiredRole) {
      const hasOfficerRole = isOfficer()
      const hasBeneficiaryRole = isBeneficiary()

      if (requiredRole === 'officer' && !hasOfficerRole) {
        router.push('/dashboard')
        return
      }

      if (requiredRole === 'beneficiary' && !hasBeneficiaryRole) {
        router.push('/officer/applications')
        return
      }
    }
  }, [isSignedIn, isLoaded, requiredRole, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return <>{children}</>
}

interface OfficerOnlyProps {
  children: React.ReactNode
}

export function OfficerOnly({ children }: OfficerOnlyProps) {
  return (
    <RoleProtected requiredRole="officer" fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground mt-2">This page is only accessible to loan officers.</p>
        </div>
      </div>
    }>
      {children}
    </RoleProtected>
  )
}

interface BeneficiaryOnlyProps {
  children: React.ReactNode
}

export function BeneficiaryOnly({ children }: BeneficiaryOnlyProps) {
  return (
    <RoleProtected requiredRole="beneficiary" fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground mt-2">This page is only accessible to beneficiaries.</p>
        </div>
      </div>
    }>
      {children}
    </RoleProtected>
  )
}

interface AdminOnlyProps {
  children: React.ReactNode
}

export function AdminOnly({ children }: AdminOnlyProps) {
  return (
    <RoleProtected requiredRole="admin" fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground mt-2">This page is only accessible to administrators.</p>
        </div>
      </div>
    }>
      {children}
    </RoleProtected>
  )
}

interface AdminOrOfficerProps {
  children: React.ReactNode
}

export function AdminOrOfficer({ children }: AdminOrOfficerProps) {
  return (
    <RoleProtected requiredRole="officer" fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground mt-2">This page is only accessible to administrators or loan officers.</p>
        </div>
      </div>
    }>
      {children}
    </RoleProtected>
  )
}

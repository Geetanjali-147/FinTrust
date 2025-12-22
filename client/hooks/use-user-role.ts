'use client'

import { useAuth } from '@clerk/nextjs'
import { useEffect, useState, useCallback, useRef } from 'react'
import { authAPI, type User } from '@/lib/api'

/**
 * Hook for managing user role with backend synchronization
 * Backend stores role in Clerk's private metadata
 */
export function useUserRole() {
    const { isSignedIn, getToken, isLoaded } = useAuth()
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Use a ref to prevent infinite loops and track if we're currently assigning
    const isAssigningRef = useRef(false)

    /**
     * Assign role to user (called during signup or via auto-assignment)
     */
    const assignRole = useCallback(async (newRole: 'BENEFICIARY' | 'OFFICER') => {
        if (isAssigningRef.current) return

        try {
            console.log(`[useUserRole] Assigning role: ${newRole}`)
            isAssigningRef.current = true
            setLoading(true)

            const { user: userData } = await authAPI.assignRole(getToken, newRole)

            console.log(`[useUserRole] Role assigned successfully:`, userData)
            setUser(userData)
            setRole(userData.role)

            // Sync to localStorage
            localStorage.setItem('userRole', userData.role.toLowerCase())
            localStorage.removeItem('pendingRole')
            setError(null)

            return userData
        } catch (err) {
            console.error('[useUserRole] Failed to assign role:', err)
            const errorMessage = err instanceof Error ? err.message : 'Failed to assign role'
            setError(errorMessage)
            throw err
        } finally {
            setLoading(false)
            isAssigningRef.current = false
        }
    }, [getToken])

    // Fetch user role from backend on mount and auth state changes
    useEffect(() => {
        async function fetchUser() {
            if (!isLoaded) return

            if (!isSignedIn) {
                console.log('[useUserRole] User not signed in, clearing state')
                setUser(null)
                setRole(null)
                setLoading(false)
                // Clear localStorage
                localStorage.removeItem('userRole')
                localStorage.removeItem('pendingRole')
                return
            }

            try {
                console.log('[useUserRole] Fetching user role from backend...')
                setLoading(true)
                const userData = await authAPI.getMe(getToken)

                console.log('[useUserRole] Fetched user data:', userData)
                setUser(userData)
                setRole(userData.role)

                // Sync to localStorage for backward compatibility
                localStorage.setItem('userRole', userData.role.toLowerCase())
                // Clear pending role if we successfully got a role
                localStorage.removeItem('pendingRole')
                setError(null)
            } catch (err) {
                console.warn('[useUserRole] Error fetching role:', err)
                const errorMessage = err instanceof Error ? err.message : 'Failed to load user information'

                // Handle "ROLE_NOT_SET" error - potentially assign pending role
                if (errorMessage.includes('role not set') || errorMessage.includes('ROLE_NOT_SET')) {
                    const pendingRole = localStorage.getItem('pendingRole')
                    console.log(`[useUserRole] Role not set. Checking for pendingRole in localStorage: ${pendingRole}`)

                    if (pendingRole && (pendingRole === 'beneficiary' || pendingRole === 'officer')) {
                        console.log(`[useUserRole] Auto-assigning pending role: ${pendingRole}`)
                        try {
                            const upperRole = pendingRole.toUpperCase() as 'BENEFICIARY' | 'OFFICER'
                            await assignRole(upperRole)
                            return // assignRole handles state updates
                        } catch (assignErr) {
                            console.error('[useUserRole] Auto-assignment failed:', assignErr)
                        }
                    } else {
                        console.log('[useUserRole] No valid pendingRole found.')
                    }
                }

                setError(errorMessage)
                setUser(null)
                setRole(null)
                localStorage.removeItem('userRole')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [isSignedIn, isLoaded, getToken, assignRole])

    return {
        user,
        role,
        loading,
        error,
        assignRole,
        isSignedIn,
        isLoaded
    }
}

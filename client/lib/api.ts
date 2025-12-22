/**
 * Backend API client
 * Handles all communication with the Express server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export interface User {
    id: string
    email: string
    role: 'BENEFICIARY' | 'OFFICER' | 'ADMIN'
    createdAt: string
}

export interface ApiError {
    error: string
    code?: string
}

/**
 * Get authorization headers with Clerk token
 */
async function getAuthHeaders(getToken: () => Promise<string | null>): Promise<HeadersInit> {
    const token = await getToken()
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    }
}

/**
 * Auth API handlers
 */
export const authAPI = {
    /**
     * Assign role to user (stored in Clerk private metadata)
     */
    async assignRole(
        getToken: () => Promise<string | null>,
        role: 'BENEFICIARY' | 'OFFICER'
    ): Promise<{ success: boolean; user: User }> {
        const headers = await getAuthHeaders(getToken)
        const response = await fetch(`${API_BASE_URL}/auth/assign-role`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ role: role.toUpperCase() })
        })

        if (!response.ok) {
            const error: ApiError = await response.json()
            throw new Error(error.error || 'Failed to assign role')
        }

        return response.json()
    },

    /**
     * Get current user with role from Clerk
     */
    async getMe(getToken: () => Promise<string | null>): Promise<User> {
        const headers = await getAuthHeaders(getToken)
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers
        })

        if (!response.ok) {
            const error: ApiError = await response.json()
            throw new Error(error.error || 'Failed to get user information')
        }

        return response.json()
    }
}

/**
 * Health check
 */
export const healthAPI = {
    async check(): Promise<{ status: string; timestamp: string; message: string }> {
        const response = await fetch(`${API_BASE_URL}/health`)

        if (!response.ok) {
            throw new Error('Health check failed')
        }

        return response.json()
    }
}

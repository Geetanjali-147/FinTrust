import express from 'express'
import { authenticateUser } from '../middleware/auth'
import { ClerkService } from '../services/clerkService'

interface AuthenticatedRequest extends express.Request {
    user?: {
        id: string
        email: string
        role: string | null
    }
}

const router = express.Router()

/**
 * Assign role to user after Clerk signup
 * Stores role in Clerk's private metadata
 */
router.post('/assign-role', authenticateUser, async (req: AuthenticatedRequest, res) => {
    try {
        const { role } = req.body

        // Validate role
        if (!['BENEFICIARY', 'OFFICER'].includes(role)) {
            res.status(400).json({ error: 'Invalid role. Must be BENEFICIARY or OFFICER' })
            return
        }

        // Assign role to Clerk user's private metadata
        await ClerkService.assignRole(req.user!.id, role as 'BENEFICIARY' | 'OFFICER')

        // Get updated user data
        const user = await ClerkService.getUserWithRole(req.user!.id)

        res.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        })
    } catch (error) {
        console.error('Role assignment error:', error)
        res.status(500).json({ error: 'Failed to assign role' })
    }
})

/**
 * Get current user with role from Clerk
 */
router.get('/me', authenticateUser, async (req: AuthenticatedRequest, res) => {
    try {
        const user = await ClerkService.getUserWithRole(req.user!.id)

        if (!user.role) {
            res.status(404).json({
                error: 'User role not set. Please complete signup.',
                code: 'ROLE_NOT_SET'
            })
            return
        }

        res.json({
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        })
    } catch (error) {
        console.error('Get user error:', error)
        res.status(500).json({ error: 'Failed to get user information' })
    }
})

export default router

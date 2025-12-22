import { clerkClient } from '@clerk/clerk-sdk-node'
import { Request, Response, NextFunction } from 'express'
import { User } from '../models/User'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
  }
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    const token = authHeader.split(' ')[1]
    
    // Verify token with Clerk
    const session = await clerkClient.sessions.verifySession(token, process.env.CLERK_SECRET_KEY || '')
    
    if (!session) {
      res.status(401).json({ error: 'Invalid token' })
      return
    }

    // Get user from Clerk
    const clerkUser = await clerkClient.users.getUser(session.userId)
    
    // Get user from database
    let user = await User.findOne({ clerkUserId: clerkUser.id })
    
    // Create user if doesn't exist
    if (!user) {
      user = await User.create({
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        role: 'BENEFICIARY' // Default role
      })
    }

    req.user = {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress || '',
      role: user.role
    }

    next()
  } catch (error) {
    console.error('Auth error:', error)
    res.status(500).json({ error: 'Authentication failed' })
  }
}

export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' })
      return
    }

    next()
  }
}

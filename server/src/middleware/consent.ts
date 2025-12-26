import { Request, Response, NextFunction } from 'express'
import { Consent } from '../models/Consent'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: string | null
  }
  consent?: {
    id: string
    applicationType: string
    timestamp: Date
  }
}

/**
 * Middleware to verify that the authenticated user has provided valid consent
 * before allowing data processing or scoring operations.
 * 
 * Consent is considered valid if:
 * - User has agreed (agreed: true)
 * - Consent was given within the last 24 hours (not expired)
 * - Consent has not been revoked
 * 
 * @param applicationType - The type of consent required (default: 'LOAN')
 */
export const verifyConsent = (applicationType: string = 'LOAN') => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Ensure user is authenticated
      if (!req.user || !req.user.id) {
        res.status(401).json({
          error: 'Authentication required',
          code: 'AUTH_REQUIRED'
        })
        return
      }

      const userId = req.user.id
      const now = new Date()

      // Find the most recent valid consent
      const consent = await Consent.findOne({
        userId,
        applicationType,
        agreed: true,
        expiresAt: { $gt: now },
        revokedAt: { $exists: false }
      }).sort({ timestamp: -1 })

      if (!consent) {
        res.status(403).json({
          error: 'Consent required',
          code: 'CONSENT_REQUIRED',
          message: 'You must provide consent before submitting an application. Please review and accept the data processing terms.',
          applicationType
        })
        return
      }

      // Attach consent info to request for audit purposes
      req.consent = {
        id: consent._id.toString(),
        applicationType: consent.applicationType,
        timestamp: consent.timestamp
      }

      console.log(`✅ Consent verified for user ${userId} (Consent ID: ${consent._id})`)
      next()
    } catch (error) {
      console.error('Consent verification error:', error)
      res.status(500).json({
        error: 'Failed to verify consent',
        code: 'CONSENT_VERIFICATION_ERROR'
      })
    }
  }
}

/**
 * Middleware that checks consent but doesn't block - just attaches consent status
 * Useful for routes that need to know consent status but don't require it
 */
export const checkConsentStatus = (applicationType: string = 'LOAN') => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        next()
        return
      }

      const hasConsent = await Consent.hasValidConsent(req.user.id, applicationType)
      
      // Attach consent status to request
      ;(req as any).hasValidConsent = hasConsent

      next()
    } catch (error) {
      console.error('Consent status check error:', error)
      // Don't block, just continue without consent info
      next()
    }
  }
}

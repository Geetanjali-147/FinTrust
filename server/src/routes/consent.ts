import express, { Request, Response } from 'express'
import { Consent } from '../models/Consent'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
    email: string
    role: string | null
  }
}

interface ConsentRequestBody {
  agreed: boolean
  ipAddress: string
  applicationType?: 'LOAN' | 'CREDIT_CHECK' | 'DATA_PROCESSING'
  userAgent?: string
}

const router = express.Router()

/**
 * POST /api/consent
 * Record user consent for data processing
 * 
 * Body: { agreed: boolean, ipAddress: string, applicationType?: string }
 */
router.post('/', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { agreed, ipAddress, applicationType = 'LOAN', userAgent } = req.body as ConsentRequestBody

    // Validate required fields
    if (typeof agreed !== 'boolean') {
      res.status(400).json({
        error: 'Invalid request',
        message: 'Field "agreed" must be a boolean value'
      })
      return
    }

    if (!ipAddress || typeof ipAddress !== 'string') {
      res.status(400).json({
        error: 'Invalid request',
        message: 'Field "ipAddress" is required for audit purposes'
      })
      return
    }

    const userId = req.user!.id

    // Create new consent record (never update - for audit trail)
    const consent = new Consent({
      userId,
      applicationType,
      agreed,
      ipAddress,
      userAgent: userAgent || req.headers['user-agent'],
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    })

    await consent.save()

    console.log(`📝 Consent recorded for user ${userId}: ${agreed ? 'AGREED' : 'DECLINED'} (Type: ${applicationType})`)

    res.status(201).json({
      success: true,
      consent: {
        id: consent._id,
        applicationType: consent.applicationType,
        agreed: consent.agreed,
        timestamp: consent.timestamp,
        expiresAt: consent.expiresAt
      },
      message: agreed
        ? 'Consent recorded successfully. You may now submit applications.'
        : 'Your preference has been recorded. You cannot submit applications without consent.'
    })
  } catch (error) {
    console.error('Failed to record consent:', error)
    res.status(500).json({ error: 'Failed to record consent' })
  }
})

/**
 * GET /api/consent/status
 * Check if user has valid consent
 */
router.get('/status', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const applicationType = (req.query.type as string) || 'LOAN'

    const hasValidConsent = await Consent.hasValidConsent(userId, applicationType)
    const latestConsent = await Consent.getLatestConsent(userId, applicationType)

    res.json({
      hasValidConsent,
      applicationType,
      latestConsent: latestConsent ? {
        id: latestConsent._id,
        agreed: latestConsent.agreed,
        timestamp: latestConsent.timestamp,
        expiresAt: latestConsent.expiresAt,
        isExpired: latestConsent.expiresAt < new Date(),
        isRevoked: !!latestConsent.revokedAt
      } : null
    })
  } catch (error) {
    console.error('Failed to check consent status:', error)
    res.status(500).json({ error: 'Failed to check consent status' })
  }
})

/**
 * POST /api/consent/revoke
 * Revoke existing consent (for GDPR compliance)
 */
router.post('/revoke', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const { applicationType = 'LOAN' } = req.body

    // Find and revoke the latest valid consent
    const consent = await Consent.findOneAndUpdate(
      {
        userId,
        applicationType,
        agreed: true,
        revokedAt: { $exists: false }
      },
      {
        revokedAt: new Date()
      },
      { new: true, sort: { timestamp: -1 } }
    )

    if (!consent) {
      res.status(404).json({
        error: 'No active consent found',
        message: 'No valid consent record found to revoke'
      })
      return
    }

    console.log(`🚫 Consent revoked for user ${userId} (Consent ID: ${consent._id})`)

    res.json({
      success: true,
      message: 'Consent has been revoked. You will need to provide consent again to submit applications.',
      revokedAt: consent.revokedAt
    })
  } catch (error) {
    console.error('Failed to revoke consent:', error)
    res.status(500).json({ error: 'Failed to revoke consent' })
  }
})

/**
 * GET /api/consent/history
 * Get user's consent history (for transparency/audit)
 */
router.get('/history', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id
    const limit = parseInt(req.query.limit as string) || 10

    const consents = await Consent.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('-__v')

    res.json({
      total: consents.length,
      consents: consents.map(c => ({
        id: c._id,
        applicationType: c.applicationType,
        agreed: c.agreed,
        ipAddress: c.ipAddress,
        timestamp: c.timestamp,
        expiresAt: c.expiresAt,
        revokedAt: c.revokedAt,
        status: c.revokedAt
          ? 'REVOKED'
          : c.expiresAt < new Date()
            ? 'EXPIRED'
            : c.agreed
              ? 'ACTIVE'
              : 'DECLINED'
      }))
    })
  } catch (error) {
    console.error('Failed to get consent history:', error)
    res.status(500).json({ error: 'Failed to get consent history' })
  }
})

export default router

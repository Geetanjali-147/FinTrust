import express from 'express'
import { authenticateUser, requireRole } from '../middleware/auth'
import { ApplicationService } from '../services/applicationService'
import { ReviewService } from '../services/reviewService'
import { ScoringService } from '../services/scoringService'
import authRoutes from './auth'

interface AuthenticatedRequest extends express.Request {
  user?: {
    id: string
    email: string
    role: string
    // Additional user context from frontend
    age?: number
    gender?: string
    income?: number
    livelihood?: string
    district?: string
  }
}

const router = express.Router()

// Public routes
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: 'connected',
    message: 'FinTrust API is running'
  })
})

// Auth routes (includes authentication middleware internally)
router.use('/auth', authRoutes)

// Protected routes
router.use(authenticateUser)

// Application routes
router.post('/applications', async (req: AuthenticatedRequest, res) => {
  try {
    // Create the application
    const application = await ApplicationService.createApplication(
      req.user!.id,
      req.body
    )

    // Extract user context from request body for scoring
    // Frontend sends: name, gender, age, address, district, livelihood, income
    const userContext = {
      age: req.body.age,
      gender: req.body.gender,
      income: req.body.income,
      livelihood: req.body.livelihood,
      district: req.body.district
    }

    // Trigger scoring asynchronously
    // Score is calculated and saved in the background
    if (ScoringService.isReady()) {
      ScoringService.scoreAndSave(application, userContext)
        .then(score => {
          console.log(`📊 Application ${application._id} scored: ${score.creditworthy ? 'Approved' : 'Review needed'} (${(score.probability * 100).toFixed(1)}%)`)
        })
        .catch(err => {
          console.error(`❌ Failed to score application ${application._id}:`, err)
        })
    } else {
      console.warn('⚠️ Scoring service not ready, skipping automatic scoring')
    }

    res.status(201).json(application)
  } catch (error) {
    console.error('Failed to create application:', error)
    res.status(500).json({ error: 'Failed to create application' })
  }
})

router.get('/applications', async (req: AuthenticatedRequest, res) => {
  try {
    const applications = await ApplicationService.getUserApplications(req.user!.id)
    res.json(applications)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get applications' })
  }
})

router.get('/applications/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const application = await ApplicationService.getApplicationById(req.params.id)
    if (!application) {
      res.status(404).json({ error: 'Application not found' })
      return
    }
    res.json(application)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get application' })
  }
})

// Score routes
router.get('/applications/:id/score', async (req: AuthenticatedRequest, res) => {
  try {
    const score = await ScoringService.getScoreByApplicationId(req.params.id)
    if (!score) {
      res.status(404).json({ error: 'Score not found for this application' })
      return
    }
    res.json(score)
  } catch (error) {
    console.error('Failed to get score:', error)
    res.status(500).json({ error: 'Failed to get score' })
  }
})

router.get('/scores', async (req: AuthenticatedRequest, res) => {
  try {
    const scores = await ScoringService.getUserScores(req.user!.id)
    res.json(scores)
  } catch (error) {
    console.error('Failed to get user scores:', error)
    res.status(500).json({ error: 'Failed to get scores' })
  }
})

// Officer routes (require OFFICER or ADMIN role)
router.get('/officer/applications',
  requireRole(['OFFICER', 'ADMIN']),
  async (req, res) => {
    try {
      const applications = await ApplicationService.getAllApplications()
      res.json(applications)
    } catch (error) {
      res.status(500).json({ error: 'Failed to get applications' })
    }
  }
)

router.put('/officer/applications/:id/status',
  requireRole(['OFFICER', 'ADMIN']),
  async (req, res) => {
    try {
      const { status } = req.body
      const application = await ApplicationService.updateApplicationStatus(
        req.params.id,
        status
      )
      if (!application) {
        res.status(404).json({ error: 'Application not found' })
        return
      }
      res.json(application)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update application status' })
    }
  }
)

// Review routes
router.post('/officer/reviews',
  requireRole(['OFFICER', 'ADMIN']),
  async (req: AuthenticatedRequest, res) => {
    try {
      const review = await ReviewService.createReview({
        ...req.body,
        officerId: req.user!.id
      })
      res.status(201).json(review)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create review' })
    }
  }
)

router.get('/officer/applications/:id/reviews',
  requireRole(['OFFICER', 'ADMIN']),
  async (req: AuthenticatedRequest, res) => {
    try {
      const reviews = await ReviewService.getApplicationReviews(req.params.id)
      res.json(reviews)
    } catch (error) {
      res.status(500).json({ error: 'Failed to get reviews' })
    }
  }
)

export default router

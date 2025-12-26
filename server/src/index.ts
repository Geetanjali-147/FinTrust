import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { connectDB } from './config/database'
import { ScoringService } from './services/scoringService'
import routes from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api', routes)

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Initialize services and start server
async function startServer() {
  try {
    // Connect to database first
    await connectDB()
    console.log('✅ Database connected')

    // Initialize ONNX scoring model
    try {
      await ScoringService.initialize()
      console.log('✅ Scoring service initialized')
    } catch (modelError) {
      console.error('⚠️ Warning: Scoring service failed to initialize:', modelError)
      console.log('⚠️ Server will continue without ML scoring capabilities')
    }

    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📍 Environment: ${process.env.NODE_ENV}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

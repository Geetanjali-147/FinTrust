# FinTrust Backend Development Guide

This guide provides a comprehensive setup for developing the backend API for the FinTrust application using Node.js, Express, and MongoDB with Mongoose.

## 🏗️ Backend Architecture

### Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk integration
- **API**: RESTful API with role-based access control

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/           # Mongoose models
│   ├── controllers/      # API controllers
│   ├── middleware/       # Authentication & authorization
│   ├── services/         # Business logic
│   ├── routes/           # API routes
│   ├── utils/            # Helper functions
│   ├── config/           # Configuration files
│   └── index.ts          # Entry point
├── tests/                # Unit & integration tests
├── package.json
├── tsconfig.json
└── .env                  # Environment variables
```

## 🚀 Quick Start

### 1. Initialize Project
```bash
# Create backend directory
mkdir backend && cd backend

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors helmet morgan dotenv mongoose
npm install -D typescript ts-node @types/node @types/express @types/cors @types/morgan @types/morgan

# Install MongoDB dependencies
npm install mongoose @types/mongoose

# Install authentication dependencies
npm install @clerk/clerk-sdk-node
```

### 2. Environment Configuration
Create `.env` file:
```env
# Database
MONGODB_URI="mongodb://localhost:27017/fintrust"

# Clerk Configuration
CLERK_SECRET_KEY="your-clerk-secret-key"
CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"

# Server
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN="http://localhost:3000"
```

## 📊 Database Models

### User Model (`src/models/User.ts`)
```typescript
import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  clerkUserId: string
  email: string
  role: 'BENEFICIARY' | 'OFFICER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  clerkUserId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['BENEFICIARY', 'OFFICER', 'ADMIN'],
    default: 'BENEFICIARY'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const User = mongoose.model<IUser>('User', userSchema)
```

### Application Model (`src/models/Application.ts`)
```typescript
import mongoose, { Document, Schema } from 'mongoose'

export interface IApplication extends Document {
  userId: string
  loanAmount: number
  purpose: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW'
  createdAt: Date
  updatedAt: Date
}

const applicationSchema = new Schema<IApplication>({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  loanAmount: {
    type: Number,
    required: true,
    min: 0
  },
  purpose: {
    type: String,
    required: true,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW'],
    default: 'PENDING'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

applicationSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const Application = mongoose.model<IApplication>('Application', applicationSchema)
```

### Review Model (`src/models/Review.ts`)
```typescript
import mongoose, { Document, Schema } from 'mongoose'

export interface IReview extends Document {
  applicationId: string
  officerId: string
  decision: 'APPROVE' | 'REJECT' | 'REVIEW'
  comments?: string
  createdAt: Date
}

const reviewSchema = new Schema<IReview>({
  applicationId: {
    type: String,
    required: true,
    ref: 'Application'
  },
  officerId: {
    type: String,
    required: true,
    ref: 'User'
  },
  decision: {
    type: String,
    enum: ['APPROVE', 'REJECT', 'REVIEW'],
    required: true
  },
  comments: {
    type: String,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Review = mongoose.model<IReview>('Review', reviewSchema)
```

## 🔐 Authentication & Authorization

### Database Connection (`src/config/database.ts`)
```typescript
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '')
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}
```

### Authentication Middleware (`src/middleware/auth.ts`)
```typescript
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
) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    
    // Verify token with Clerk
    const session = await clerkClient.sessions.verifySession(token)
    
    if (!session) {
      return res.status(401).json({ error: 'Invalid token' })
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
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    next()
  }
}
```

## 🎯 Services

### User Service (`src/services/userService.ts`)
```typescript
import { User } from '../models/User'

export class UserService {
  static async createUser(clerkUserId: string, email: string, role: string = 'BENEFICIARY') {
    return await User.create({
      clerkUserId,
      email,
      role
    })
  }

  static async getUserByClerkId(clerkUserId: string) {
    return await User.findOne({ clerkUserId })
  }

  static async updateUserRole(clerkUserId: string, role: string) {
    return await User.findOneAndUpdate(
      { clerkUserId },
      { role },
      { new: true }
    )
  }

  static async getAllUsers() {
    return await User.find().select('-__v')
  }
}
```

### Application Service (`src/services/applicationService.ts`)
```typescript
import { Application } from '../models/Application'
import { User } from '../models/User'

export class ApplicationService {
  static async createApplication(userId: string, data: {
    loanAmount: number
    purpose: string
  }) {
    return await Application.create({
      userId,
      loanAmount: data.loanAmount,
      purpose: data.purpose
    })
  }

  static async getUserApplications(userId: string) {
    return await Application.find({ userId })
      .sort({ createdAt: -1 })
  }

  static async getAllApplications() {
    return await Application.find()
      .populate('userId', 'email role')
      .sort({ createdAt: -1 })
  }

  static async updateApplicationStatus(id: string, status: string) {
    return await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
  }

  static async getApplicationById(id: string) {
    return await Application.findById(id)
      .populate('userId', 'email role')
  }
}
```

### Review Service (`src/services/reviewService.ts`)
```typescript
import { Review } from '../models/Review'
import { Application } from '../models/Application'

export class ReviewService {
  static async createReview(data: {
    applicationId: string
    officerId: string
    decision: string
    comments?: string
  }) {
    const review = await Review.create(data)
    
    // Update application status based on review
    await Application.findByIdAndUpdate(
      data.applicationId,
      { status: data.decision === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
    )
    
    return review
  }

  static async getApplicationReviews(applicationId: string) {
    return await Review.find({ applicationId })
      .populate('officerId', 'email')
      .sort({ createdAt: -1 })
  }
}
```

## 🛣️ API Routes

### Main Routes (`src/routes/index.ts`)
```typescript
import express from 'express'
import { authenticateUser, requireRole } from '../middleware/auth'
import { UserService } from '../services/userService'
import { ApplicationService } from '../services/applicationService'
import { ReviewService } from '../services/reviewService'

const router = express.Router()

// Public routes
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: 'connected'
  })
})

// Protected routes
router.use(authenticateUser)

// User routes
router.get('/user', async (req, res) => {
  try {
    const user = await UserService.getUserByClerkId(req.user!.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user' })
  }
})

// Application routes
router.post('/applications', async (req, res) => {
  try {
    const application = await ApplicationService.createApplication(
      req.user!.id,
      req.body
    )
    res.status(201).json(application)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create application' })
  }
})

router.get('/applications', async (req, res) => {
  try {
    const applications = await ApplicationService.getUserApplications(req.user!.id)
    res.json(applications)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get applications' })
  }
})

router.get('/applications/:id', async (req, res) => {
  try {
    const application = await ApplicationService.getApplicationById(req.params.id)
    if (!application) {
      return res.status(404).json({ error: 'Application not found' })
    }
    res.json(application)
  } catch (error) {
    res.status(500).json({ error: 'Failed to get application' })
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
        return res.status(404).json({ error: 'Application not found' })
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
  async (req, res) => {
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
  async (req, res) => {
    try {
      const reviews = await ReviewService.getApplicationReviews(req.params.id)
      res.json(reviews)
    } catch (error) {
      res.status(500).json({ error: 'Failed to get reviews' })
    }
  }
)

export default router
```

## 🚀 Main Server

### Server Entry Point (`src/index.ts`)
```typescript
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { connectDB } from './config/database'
import routes from './routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

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
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})
```

## 🔧 Frontend Integration

### API Client (`src/lib/api.ts`)
```typescript
export const api = {
  async getUser() {
    const token = localStorage.getItem('clerk-token')
    const response = await fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.json()
  },

  async createApplication(data: { loanAmount: number; purpose: string }) {
    const token = localStorage.getItem('clerk-token')
    const response = await fetch('/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  },

  async getUserApplications() {
    const token = localStorage.getItem('clerk-token')
    const response = await fetch('/api/applications', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.json()
  },

  async getAllApplications() {
    const token = localStorage.getItem('clerk-token')
    const response = await fetch('/api/officer/applications', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.json()
  },

  async updateApplicationStatus(id: string, status: string) {
    const token = localStorage.getItem('clerk-token')
    const response = await fetch(`/api/officer/applications/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    })
    return response.json()
  }
}
```

### Updated Role Checking (`src/lib/clerk.ts`)
```typescript
export async function hasRole(role: string): Promise<boolean> {
  try {
    const token = localStorage.getItem('clerk-token')
    const response = await fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const user = await response.json()
    return user.role === role
  } catch (error) {
    return false
  }
}
```

## 🚀 Development Workflow

### 1. Start MongoDB
```bash
# Using Docker
docker run --name fintrust-mongo -p 27017:27017 -d mongo:latest

# Or install MongoDB locally
# https://docs.mongodb.com/manual/installation/
```

### 2. Start Backend
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Start Frontend
```bash
# In separate terminal
cd ../frontend
npm run dev
```

### 4. Testing
```bash
# Install testing dependencies
npm install -D jest @types/jest supertest @types/supertest

# Create test files
mkdir tests && touch tests/user.test.ts

# Run tests
npm test
```

## 📋 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check

### User Endpoints
- `GET /api/user` - Get current user (Protected)

### Application Endpoints
- `POST /api/applications` - Create application (Protected)
- `GET /api/applications` - Get user applications (Protected)
- `GET /api/applications/:id` - Get specific application (Protected)

### Officer Endpoints
- `GET /api/officer/applications` - Get all applications (Officer/Admin only)
- `PUT /api/officer/applications/:id/status` - Update application status (Officer/Admin only)
- `POST /api/officer/reviews` - Create review (Officer/Admin only)
- `GET /api/officer/applications/:id/reviews` - Get application reviews (Officer/Admin only)

## 🛡️ Security Features

1. **Authentication**: Clerk integration with JWT tokens
2. **Authorization**: Role-based access control
3. **Input Validation**: Mongoose schema validation
4. **CORS**: Configured for frontend origin
5. **Helmet**: Security headers
6. **Error Handling**: Proper error responses

## 🚀 Deployment

### Environment Variables for Production
```env
# Database
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/fintrust"

# Clerk Configuration
CLERK_SECRET_KEY="your-production-secret-key"
CLERK_PUBLISHABLE_KEY="your-production-publishable-key"

# Server
PORT=5000
NODE_ENV=production

# CORS
CORS_ORIGIN="https://your-frontend-domain.com"
```

### Docker Setup
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

This backend setup provides a robust, scalable foundation for your FinTrust application with proper MongoDB integration using Mongoose, comprehensive authentication with Clerk, and role-based access control.

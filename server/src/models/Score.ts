import mongoose, { Document, Schema } from 'mongoose'

export interface IScoreBreakdown {
  // Input factors used for scoring
  status: string
  duration: number
  credit_history: string
  purpose: string
  credit_amount: number
  savings: string
  employment: string
  installment_rate: number
  personal_status_sex: string
  other_debtors: string
  residence_since: number
  property: string
  age: number
  other_installment_plans: string
  housing: string
  existing_credits: number
  job: string
  people_liable: number
  telephone: string
  foreign_worker: string
}

export interface IScore extends Document {
  applicationId: mongoose.Types.ObjectId
  userId: string
  probability: number
  creditworthy: boolean
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  breakdown: IScoreBreakdown
  modelVersion: string
  scoredAt: Date
  createdAt: Date
  updatedAt: Date
}

const scoreBreakdownSchema = new Schema<IScoreBreakdown>({
  status: { type: String, required: true },
  duration: { type: Number, required: true },
  credit_history: { type: String, required: true },
  purpose: { type: String, required: true },
  credit_amount: { type: Number, required: true },
  savings: { type: String, required: true },
  employment: { type: String, required: true },
  installment_rate: { type: Number, required: true },
  personal_status_sex: { type: String, required: true },
  other_debtors: { type: String, required: true },
  residence_since: { type: Number, required: true },
  property: { type: String, required: true },
  age: { type: Number, required: true },
  other_installment_plans: { type: String, required: true },
  housing: { type: String, required: true },
  existing_credits: { type: Number, required: true },
  job: { type: String, required: true },
  people_liable: { type: Number, required: true },
  telephone: { type: String, required: true },
  foreign_worker: { type: String, required: true }
}, { _id: false })

const scoreSchema = new Schema<IScore>({
  applicationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Application',
    unique: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  probability: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  creditworthy: {
    type: Boolean,
    required: true
  },
  riskLevel: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'],
    required: true
  },
  breakdown: {
    type: scoreBreakdownSchema,
    required: true
  },
  modelVersion: {
    type: String,
    required: true,
    default: '1.0.0'
  },
  scoredAt: {
    type: Date,
    required: true,
    default: Date.now
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

// Index for efficient queries
scoreSchema.index({ userId: 1, scoredAt: -1 })
scoreSchema.index({ applicationId: 1 })

export const Score = mongoose.model<IScore>('Score', scoreSchema)

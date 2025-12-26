import mongoose, { Document, Schema } from 'mongoose'

export interface IConsent extends Document {
  userId: string
  applicationType: 'LOAN' | 'CREDIT_CHECK' | 'DATA_PROCESSING'
  agreed: boolean
  ipAddress: string
  userAgent?: string
  timestamp: Date
  expiresAt: Date
  revokedAt?: Date
}

const consentSchema = new Schema<IConsent>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
    index: true
  },
  applicationType: {
    type: String,
    enum: ['LOAN', 'CREDIT_CHECK', 'DATA_PROCESSING'],
    required: true,
    default: 'LOAN'
  },
  agreed: {
    type: Boolean,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    // Default: 24 hours from creation
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  revokedAt: {
    type: Date,
    required: false
  }
})

// Compound index for efficient consent lookups
consentSchema.index({ userId: 1, applicationType: 1, timestamp: -1 })

// Index for audit queries
consentSchema.index({ timestamp: -1 })

// Static method to check if user has valid consent
consentSchema.statics.hasValidConsent = async function(
  userId: string,
  applicationType: string = 'LOAN'
): Promise<boolean> {
  const now = new Date()
  const consent = await this.findOne({
    userId,
    applicationType,
    agreed: true,
    expiresAt: { $gt: now },
    revokedAt: { $exists: false }
  }).sort({ timestamp: -1 })

  return !!consent
}

// Static method to get user's latest consent
consentSchema.statics.getLatestConsent = async function(
  userId: string,
  applicationType: string = 'LOAN'
): Promise<IConsent | null> {
  return this.findOne({
    userId,
    applicationType
  }).sort({ timestamp: -1 })
}

export interface IConsentModel extends mongoose.Model<IConsent> {
  hasValidConsent(userId: string, applicationType?: string): Promise<boolean>
  getLatestConsent(userId: string, applicationType?: string): Promise<IConsent | null>
}

export const Consent = mongoose.model<IConsent, IConsentModel>('Consent', consentSchema)

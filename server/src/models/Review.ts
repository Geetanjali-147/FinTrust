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

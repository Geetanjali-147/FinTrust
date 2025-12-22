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


export const Application = mongoose.model<IApplication>('Application', applicationSchema)

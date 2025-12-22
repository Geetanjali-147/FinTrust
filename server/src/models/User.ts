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


export const User = mongoose.model<IUser>('User', userSchema)

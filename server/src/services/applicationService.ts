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

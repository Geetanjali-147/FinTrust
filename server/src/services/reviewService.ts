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

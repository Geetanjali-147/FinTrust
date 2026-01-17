import { Review } from '../models/Review'
import { Application } from '../models/Application'

export class ReviewService {
  static async createReview(data: {
    applicationId: string
    officerId: string
    decision: string
    comments?: string
  }) {
    // Create the review record
    const review = await Review.create(data)
    
    // Determine the new application status based on the review decision
    // Map review decision (APPROVE/REJECT) to application status (APPROVED/REJECTED)
    let newStatus: 'APPROVED' | 'REJECTED' | 'UNDER_REVIEW'
    
    if (data.decision === 'APPROVE' || data.decision === 'APPROVED') {
      newStatus = 'APPROVED'
    } else if (data.decision === 'REJECT' || data.decision === 'REJECTED') {
      newStatus = 'REJECTED'
    } else {
      // For 'REVIEW' or other decisions, set to UNDER_REVIEW
      newStatus = 'UNDER_REVIEW'
    }
    
    // Update the parent Application's status
    await Application.findByIdAndUpdate(
      data.applicationId,
      { 
        status: newStatus,
        updatedAt: new Date()
      },
      { new: true }
    )
    
    return review
  }

  static async getApplicationReviews(applicationId: string) {
    return await Review.find({ applicationId })
      .populate('officerId', 'email')
      .sort({ createdAt: -1 })
  }
}

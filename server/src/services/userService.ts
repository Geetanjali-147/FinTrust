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

import { clerkClient } from '@clerk/clerk-sdk-node'

export class ClerkService {
  /**
   * Assign role to user's private metadata
   */
  static async assignRole(userId: string, role: 'BENEFICIARY' | 'OFFICER'): Promise<void> {
    await clerkClient.users.updateUserMetadata(userId, {
      privateMetadata: {
        role: role
      }
    })
  }

  /**
   * Get user role from private metadata
   */
  static async getUserRole(userId: string): Promise<string | null> {
    const user = await clerkClient.users.getUser(userId)
    return (user.privateMetadata.role as string) || null
  }

  /**
   * Get user with role
   */
  static async getUserWithRole(userId: string) {
    const user = await clerkClient.users.getUser(userId)
    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      role: (user.privateMetadata.role as string) || null,
      createdAt: user.createdAt
    }
  }
}

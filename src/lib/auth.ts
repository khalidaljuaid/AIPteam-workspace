import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'

export interface AuthUser {
    id: string
    email: string
    role: UserRole
    firstName?: string | null
    lastName?: string | null
    avatarUrl?: string | null
}

export class AuthService {
    /**
     * Hash a password using bcrypt
     */
    static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10
        return bcrypt.hash(password, saltRounds)
    }

    /**
     * Compare a plain password with a hashed password
     */
    static async comparePasswords(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }

    /**
     * Check if user has required role or higher
     */
    static hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
        const roleHierarchy: Record<UserRole, number> = {
            MEMBER: 1,
            LEADER: 2,
            VICE_PRESIDENT: 3,
            PRESIDENT: 4,
        }

        return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
    }

    /**
     * Check if user can access resource
     */
    static canAccessResource(
        userRole: UserRole,
        resourceOwnerId: string,
        userId: string
    ): boolean {
        // President and VP can access all resources
        if (
            userRole === UserRole.PRESIDENT ||
            userRole === UserRole.VICE_PRESIDENT
        ) {
            return true
        }

        // Leaders can access their team's resources (to be implemented with team check)
        if (userRole === UserRole.LEADER) {
            return true // Will need team validation
        }

        // Members can only access their own resources
        return resourceOwnerId === userId
    }
}

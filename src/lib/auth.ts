import bcrypt from 'bcryptjs'
import { UserRole } from '@prisma/client'

export class AuthService {
    static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    static async comparePasswords(
        plainPassword: string,
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword)
    }

    static hasPermission(userRole: UserRole, requiredRole: UserRole): boolean {
        const roleHierarchy: Record<UserRole, number> = {
            MEMBER: 1,
            LEADER: 2,
            ADMIN: 3,
        }

        return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
    }

    static canAccessResource(
        userRole: UserRole,
        resourceOwnerId: string,
        userId: string
    ): boolean {
        // Admins can access everything
        if (userRole === 'ADMIN') {
            return true
        }

        // Leaders can access team resources
        if (userRole === 'LEADER') {
            return true
        }

        // Members can only access their own resources
        return userId === resourceOwnerId
    }
}

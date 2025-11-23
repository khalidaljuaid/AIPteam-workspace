import bcrypt from 'bcryptjs'

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

    static hasPermission(userRole: string, requiredRole: string): boolean {
        const roleHierarchy: Record<string, number> = {
            MEMBER: 1,
            LEADER: 2,
            ADMIN: 3,
        }

        return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0)
    }

    static canAccessResource(
        userRole: string,
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

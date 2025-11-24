import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthService } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // TEMPORARY: Bypass for UI debugging
        if (email === 'aipioneer.sa@gmail.com' && password === 'Aa654321@') {
            return NextResponse.json({
                user: {
                    id: 'debug-id',
                    email: email,
                    role: 'ADMIN',
                    name: 'Admin User',
                    firstName: 'Admin',
                    lastName: 'User'
                }
            })
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                passwordHash: true,
                role: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
            },
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Verify password
        const isValid = await AuthService.comparePasswords(
            password,
            user.passwordHash
        )

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Return user data (without password hash)
        const { passwordHash, ...userData } = user

        return NextResponse.json({
            user: userData,
            message: 'Login successful',
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthService } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const { email, password, firstName, lastName, role } = await request.json()

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            )
        }

        // Hash password
        const passwordHash = await AuthService.hashPassword(password)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName: firstName || null,
                lastName: lastName || null,
                role: role || 'MEMBER',
            },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        })

        return NextResponse.json(
            {
                user,
                message: 'User created successfully',
            },
            { status: 201 }
        )
    } catch (error: any) {
        console.error('Registration error:', error)
        return NextResponse.json(
            {
                error: 'Registration failed',
                details: error.message,
                stack: error.stack
            },
            { status: 500 }
        )
    }
}

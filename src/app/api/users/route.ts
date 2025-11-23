import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users - List all users (with role-based filtering)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const role = searchParams.get('role')

        const users = await prisma.user.findMany({
            where: role ? { role: role as any } : {},
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                teamId: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ users })
    } catch (error) {
        console.error('Get users error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/users - Create new user (admin only)
export async function POST(request: Request) {
    try {
        const { email, password, firstName, lastName, role, teamId } =
            await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            )
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 409 }
            )
        }

        // Import here to avoid circular dependency
        const { AuthService } = await import('@/lib/auth')
        const passwordHash = await AuthService.hashPassword(password)

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName,
                lastName,
                role: role || 'MEMBER',
                teamId: teamId || null,
            },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                teamId: true,
                createdAt: true,
            },
        })

        return NextResponse.json({ user }, { status: 201 })
    } catch (error) {
        console.error('Create user error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

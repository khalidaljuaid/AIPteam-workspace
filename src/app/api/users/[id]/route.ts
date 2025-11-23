import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/users/[id] - Get specific user
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                teamId: true,
                team: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PUT /api/users/[id] - Update user
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const { firstName, lastName, role, teamId, avatarUrl } =
            await request.json()

        const user = await prisma.user.update({
            where: { id },
            data: {
                firstName,
                lastName,
                role,
                teamId,
                avatarUrl,
            },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                avatarUrl: true,
                teamId: true,
                updatedAt: true,
            },
        })

        return NextResponse.json({ user })
    } catch (error) {
        console.error('Update user error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/users/[id] - Delete user
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.user.delete({
            where: { id },
        })

        return NextResponse.json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error('Delete user error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

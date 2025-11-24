import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { role, department } = body

        // Update user
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                role: role,
                department: department,
            },
            select: {
                id: true,
                email: true,
                role: true,
                department: true,
            }
        })

        return NextResponse.json(updatedUser)
    } catch (error: any) {
        console.error('Error updating user:', error)
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.user.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'User deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting user:', error)
        return NextResponse.json(
            { error: 'Failed to delete user' },
            { status: 500 }
        )
    }
}

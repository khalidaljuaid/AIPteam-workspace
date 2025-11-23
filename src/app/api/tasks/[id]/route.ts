import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tasks/[id] - Get specific task
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const task = await prisma.task.findUnique({
            where: { id },
            include: {
                assignedTo: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        avatarUrl: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    },
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatarUrl: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        })

        if (!task) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 })
        }

        return NextResponse.json({ task })
    } catch (error) {
        console.error('Get task error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// PUT /api/tasks/[id] - Update task
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const {
            title,
            description,
            status,
            priority,
            assignedToId,
            projectId,
            dueDate,
            userId,
        } = await request.json()

        const task = await prisma.task.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description !== undefined && { description }),
                ...(status && { status }),
                ...(priority && { priority }),
                ...(assignedToId !== undefined && { assignedToId }),
                ...(projectId !== undefined && { projectId }),
                ...(dueDate !== undefined && {
                    dueDate: dueDate ? new Date(dueDate) : null,
                }),
                ...(status === 'COMPLETED' && { completedAt: new Date() }),
            },
            include: {
                assignedTo: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        })

        // Log activity
        if (userId) {
            await prisma.activityLog.create({
                data: {
                    userId,
                    action: 'task_updated',
                    entityType: 'task',
                    entityId: task.id,
                    details: JSON.stringify({ title: task.title, status: task.status }),
                },
            })
        }

        return NextResponse.json({ task })
    } catch (error) {
        console.error('Update task error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/tasks/[id] - Delete task
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.task.delete({
            where: { id },
        })

        return NextResponse.json({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error('Delete task error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

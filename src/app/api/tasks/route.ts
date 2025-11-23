import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tasks - List tasks with filters
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')
        const priority = searchParams.get('priority')
        const assignedToId = searchParams.get('assignedTo')
        const projectId = searchParams.get('project')

        const tasks = await prisma.task.findMany({
            where: {
                ...(status && { status: status as any }),
                ...(priority && { priority: priority as any }),
                ...(assignedToId && { assignedToId }),
                ...(projectId && { projectId }),
            },
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
                    },
                },
                _count: {
                    select: {
                        comments: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ tasks })
    } catch (error) {
        console.error('Get tasks error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/tasks - Create new task
export async function POST(request: Request) {
    try {
        const {
            title,
            description,
            status,
            priority,
            assignedToId,
            createdById,
            projectId,
            dueDate,
        } = await request.json()

        if (!title || !createdById) {
            return NextResponse.json(
                { error: 'Title and creator are required' },
                { status: 400 }
            )
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status: status || 'TODO',
                priority: priority || 'MEDIUM',
                assignedToId,
                createdById,
                projectId,
                dueDate: dueDate ? new Date(dueDate) : null,
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
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })

        // Log activity
        await prisma.activityLog.create({
            data: {
                userId: createdById,
                action: 'task_created',
                entityType: 'task',
                entityId: task.id,
                details: JSON.stringify({ title: task.title }),
            },
        })

        return NextResponse.json({ task }, { status: 201 })
    } catch (error) {
        console.error('Create task error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AuthService } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const { users, tasks } = await request.json()

        const importResults = {
            usersCreated: 0,
            tasksCreated: 0,
            errors: [] as string[],
        }

        // Import users first
        if (users && Array.isArray(users)) {
            for (const userData of users) {
                try {
                    // Check if user exists
                    const existing = await prisma.user.findUnique({
                        where: { email: userData.email },
                    })

                    if (!existing) {
                        // Create default password (should be reset on first login)
                        const passwordHash = await AuthService.hashPassword(
                            userData.password || 'DefaultPassword123!'
                        )

                        await prisma.user.create({
                            data: {
                                email: userData.email,
                                passwordHash,
                                firstName: userData.firstName || null,
                                lastName: userData.lastName || null,
                                role: userData.role || 'MEMBER',
                            },
                        })

                        importResults.usersCreated++
                    }
                } catch (error: unknown) {
                    const errorMessage =
                        error instanceof Error ? error.message : 'Unknown error'
                    importResults.errors.push(
                        `Error creating user ${userData.email}: ${errorMessage}`
                    )
                }
            }
        }

        // Import tasks
        if (tasks && Array.isArray(tasks)) {
            for (const taskData of tasks) {
                try {
                    await prisma.task.create({
                        data: {
                            title: taskData.title,
                            description: taskData.description || null,
                            status: taskData.status || 'TODO',
                            priority: taskData.priority || 'MEDIUM',
                            createdById: taskData.createdById,
                            assignedToId: taskData.assignedToId || null,
                            projectId: taskData.projectId || null,
                            dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null,
                        },
                    })

                    importResults.tasksCreated++
                } catch (error: unknown) {
                    const errorMessage =
                        error instanceof Error ? error.message : 'Unknown error'
                    importResults.errors.push(
                        `Error creating task ${taskData.title}: ${errorMessage}`
                    )
                }
            }
        }

        return NextResponse.json({
            message: 'Import completed',
            results: importResults,
        })
    } catch (error) {
        console.error('Import error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/projects - List all projects
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                team: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                _count: {
                    select: {
                        tasks: true,
                        members: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ projects })
    } catch (error) {
        console.error('Get projects error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/projects - Create new project
export async function POST(request: Request) {
    try {
        const { name, description, ownerId, teamId, startDate, endDate } =
            await request.json()

        if (!name || !ownerId) {
            return NextResponse.json(
                { error: 'Name and owner are required' },
                { status: 400 }
            )
        }

        const project = await prisma.project.create({
            data: {
                name,
                description,
                ownerId,
                teamId,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                team: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        })

        return NextResponse.json({ project }, { status: 201 })
    } catch (error) {
        console.error('Create project error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

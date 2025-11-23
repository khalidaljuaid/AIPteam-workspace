import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/teams - List all teams
export async function GET() {
    try {
        const teams = await prisma.team.findMany({
            include: {
                _count: {
                    select: {
                        members: true,
                        projects: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ teams })
    } catch (error) {
        console.error('Get teams error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/teams - Create new team
export async function POST(request: Request) {
    try {
        const { name, description, leaderId } = await request.json()

        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            )
        }

        const team = await prisma.team.create({
            data: {
                name,
                description,
                leaderId,
            },
        })

        return NextResponse.json({ team }, { status: 201 })
    } catch (error) {
        console.error('Create team error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

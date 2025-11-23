import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/rankings - Get rankings with filters
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const category = searchParams.get('category')
        const period = searchParams.get('period')

        const rankings = await prisma.ranking.findMany({
            where: {
                ...(userId && { userId }),
                ...(category && { category }),
                ...(period && { period }),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        avatarUrl: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                score: 'desc',
            },
        })

        return NextResponse.json({ rankings })
    } catch (error) {
        console.error('Get rankings error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// POST /api/rankings - Create ranking/assessment
export async function POST(request: Request) {
    try {
        const { userId, category, score, period, notes } = await request.json()

        if (!userId || !category || score === undefined || !period) {
            return NextResponse.json(
                { error: 'userId, category, score, and period are required' },
                { status: 400 }
            )
        }

        if (score < 0 || score > 100) {
            return NextResponse.json(
                { error: 'Score must be between 0 and 100' },
                { status: 400 }
            )
        }

        const ranking = await prisma.ranking.create({
            data: {
                userId,
                category,
                score,
                period,
                notes,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
        })

        return NextResponse.json({ ranking }, { status: 201 })
    } catch (error) {
        console.error('Create ranking error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

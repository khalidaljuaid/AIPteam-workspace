import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/rankings/leaderboard - Get leaderboard
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const period = searchParams.get('period')
        const category = searchParams.get('category')

        // Get average scores per user for the period
        const rankings = await prisma.ranking.groupBy({
            by: ['userId'],
            where: {
                ...(period && { period }),
                ...(category && { category }),
            },
            _avg: {
                score: true,
            },
            _count: {
                id: true,
            },
        })

        // Get user details for each ranking
        const leaderboard = await Promise.all(
            rankings.map(async (rank) => {
                const user = await prisma.user.findUnique({
                    where: { id: rank.userId },
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        avatarUrl: true,
                        role: true,
                        team: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                })

                return {
                    user,
                    averageScore: rank._avg.score,
                    assessmentCount: rank._count.id,
                }
            })
        )

        // Sort by average score descending
        leaderboard.sort((a, b) => (b.averageScore || 0) - (a.averageScore || 0))

        return NextResponse.json({ leaderboard })
    } catch (error) {
        console.error('Get leaderboard error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

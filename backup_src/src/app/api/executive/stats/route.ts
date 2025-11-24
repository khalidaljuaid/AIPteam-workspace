import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Fetch counts from all departments
        const [
            contentPosts,
            deptTasks,
            eventTracking,
            disciplineRecords,
            creativeTasks,
            educationalContent,
            activities,
            projects
        ] = await Promise.all([
            prisma.contentPost.count(),
            prisma.departmentTask.count(),
            prisma.eventTracking.count(),
            prisma.disciplineRecord.count(),
            prisma.creativeTask.count(),
            prisma.educationalContent.count(),
            prisma.activity.count(),
            prisma.project.count()
        ])

        // Fetch recent deadlines (example: next 7 days) from key tables
        const now = new Date()
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

        const upcomingDeadlines = await Promise.all([
            prisma.departmentTask.findMany({
                where: { deadline: { lte: nextWeek, gte: now } },
                take: 5,
                select: { id: true, task: true, deadline: true, responsibleDept: true }
            }),
            prisma.creativeTask.findMany({
                where: { deliveryDate: { lte: nextWeek, gte: now } },
                take: 5,
                select: { id: true, task: true, deliveryDate: true, memberName: true }
            }),
            prisma.project.findMany({
                where: { expectedEnd: { lte: nextWeek, gte: now } },
                take: 5,
                select: { id: true, projectName: true, expectedEnd: true, status: true }
            })
        ])

        return NextResponse.json({
            stats: {
                contentPosts,
                deptTasks,
                eventTracking,
                disciplineRecords,
                creativeTasks,
                educationalContent,
                activities,
                projects,
                totalTasks: contentPosts + deptTasks + eventTracking + creativeTasks + educationalContent + projects
            },
            deadlines: {
                tasks: upcomingDeadlines[0],
                creative: upcomingDeadlines[1],
                projects: upcomingDeadlines[2]
            }
        })
    } catch (error: any) {
        console.error('Error fetching executive stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch executive stats' },
            { status: 500 }
        )
    }
}

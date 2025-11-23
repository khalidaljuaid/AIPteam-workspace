import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()


async function main() {
    console.log('🌱 Starting database seed...')

    // Create admin/president user
    const adminPassword = await bcrypt.hash('password', 10)
    const admin = await prisma.user.upsert({
        where: { email: 'admin@team.com' },
        update: {},
        create: {
            email: 'admin@team.com',
            passwordHash: adminPassword,
            firstName: 'Admin',
            lastName: 'User',
            role: UserRole.PRESIDENT,
        },
    })

    console.log('✅ Created admin user')

    // Create a team
    const team = await prisma.team.create({
        data: {
            name: 'Engineering Team',
            description: 'Main engineering department',
            leaderId: admin.id,
        },
    })

    console.log('✅ Created team')

    // Create more users
    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: 'vp@team.com',
                passwordHash: await bcrypt.hash('password', 10),
                firstName: 'Vice',
                lastName: 'President',
                role: UserRole.VICE_PRESIDENT,
                teamId: team.id,
            },
        }),
        prisma.user.create({
            data: {
                email: 'leader@team.com',
                passwordHash: await bcrypt.hash('password', 10),
                firstName: 'Team',
                lastName: 'Leader',
                role: UserRole.LEADER,
                teamId: team.id,
            },
        }),
        prisma.user.create({
            data: {
                email: 'member1@team.com',
                passwordHash: await bcrypt.hash('password', 10),
                firstName: 'John',
                lastName: 'Doe',
                role: UserRole.MEMBER,
                teamId: team.id,
            },
        }),
        prisma.user.create({
            data: {
                email: 'member2@team.com',
                passwordHash: await bcrypt.hash('password', 10),
                firstName: 'Jane',
                lastName: 'Smith',
                role: UserRole.MEMBER,
                teamId: team.id,
            },
        }),
    ])

    console.log('✅ Created 4 additional users')

    // Create a project
    const project = await prisma.project.create({
        data: {
            name: 'Website Redesign',
            description: 'Complete redesign of company website',
            ownerId: admin.id,
            teamId: team.id,
            status: 'active',
        },
    })

    console.log('✅ Created project')

    // Create sample tasks
    await prisma.task.createMany({
        data: [
            {
                title: 'Design homepage mockup',
                description: 'Create initial design concepts for new homepage',
                status: 'COMPLETED',
                priority: 'HIGH',
                createdById: admin.id,
                assignedToId: users[2].id,
                projectId: project.id,
            },
            {
                title: 'Implement authentication system',
                description: 'Build secure login and registration',
                status: 'IN_PROGRESS',
                priority: 'CRITICAL',
                createdById: users[1].id,
                assignedToId: users[3].id,
                projectId: project.id,
            },
            {
                title: 'Write user documentation',
                description: 'Create comprehensive user guide',
                status: 'TODO',
                priority: 'MEDIUM',
                createdById: users[0].id,
                assignedToId: users[2].id,
                projectId: project.id,
            },
            {
                title: 'Set up database backup',
                description: 'Configure automated daily backups',
                status: 'TODO',
                priority: 'HIGH',
                createdById: admin.id,
                projectId: project.id,
            },
            {
                title: 'Code review for PR #123',
                description: 'Review and approve pull request',
                status: 'REVIEW',
                priority: 'MEDIUM',
                createdById: users[1].id,
                assignedToId: admin.id,
                projectId: project.id,
            },
        ],
    })

    console.log('✅ Created 5 sample tasks')

    // Create some rankings
    await prisma.ranking.createMany({
        data: [
            {
                userId: users[2].id,
                category: 'Productivity',
                score: 85,
                period: '2024-11',
                notes: 'Excellent performance this month',
            },
            {
                userId: users[3].id,
                category: 'Productivity',
                score: 92,
                period: '2024-11',
                notes: 'Outstanding work',
            },
            {
                userId: users[2].id,
                category: 'Collaboration',
                score: 88,
                period: '2024-11',
            },
            {
                userId: users[3].id,
                category: 'Collaboration',
                score: 90,
                period: '2024-11',
            },
        ],
    })

    console.log('✅ Created sample rankings')

    console.log('🎉 Database seeded successfully!')
    console.log('\n📝 Demo credentials:')
    console.log('   Email: admin@team.com')
    console.log('   Password: password')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

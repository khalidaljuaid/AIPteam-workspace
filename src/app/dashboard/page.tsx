'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Department {
    id: string
    name: string
    description: string
    icon: string
    color: string
}

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeTasks: 0,
        completedProjects: 0,
        departments: 0,
    })

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const departments: Department[] = [
        {
            id: 'content',
            name: 'المحتوى والإبداع',
            description: 'إنشاء وإدارة المحتوى الرقمي والإبداعي',
            icon: '✍️',
            color: 'from-purple-500 to-pink-500',
        },
        {
            id: 'technical',
            name: 'التقنية والبرمجة',
            description: 'تطوير الحلول التقنية والبرمجية',
            icon: '💻',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 'media',
            name: 'الإعلام والتواصل',
            description: 'إدارة وسائل التواصل والإعلام',
            icon: '📱',
            color: 'from-green-500 to-teal-500',
        },
        {
            id: 'design',
            name: 'التصميم والجرافيك',
            description: 'تصميم الهويات البصرية والمواد الإبداعية',
            icon: '🎨',
            color: 'from-orange-500 to-red-500',
        },
    ]

    const statCards = [
        { title: 'إجمالي الأعضاء', value: stats.totalMembers, icon: '👥', color: 'bg-gradient-to-br from-brand-primary to-brand-purple-400' },
        { title: 'المهام النشطة', value: stats.activeTasks, icon: '✅', color: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
        { title: 'المشاريع المكتملة', value: stats.completedProjects, icon: '🎯', color: 'bg-gradient-to-br from-green-500 to-teal-500' },
        { title: 'الأقسام', value: stats.departments, icon: '🏢', color: 'bg-gradient-to-br from-orange-500 to-pink-500' },
    ]

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Card */}
            <div className="gradient-purple-cyan rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-white mb-3">
                        مرحباً بك، {user?.name} 👋
                    </h1>
                    <p className="text-white/90 text-lg">
                        {user?.role === 'ADMIN' ? 'أنت مسؤول النظام' :
                            user?.role === 'LEADER' ? 'أنت قائد قسم' :
                                'أنت عضو في الفريق'}
                    </p>
                    <div className="mt-6 flex gap-4">
                        <Link
                            href="/dashboard/tasks"
                            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all backdrop-blur-sm"
                        >
                            مهامي
                        </Link>
                        <Link
                            href="/dashboard/projects"
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/20"
                        >
                            المشاريع
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.color} rounded-xl p-6 shadow-lg card-hover cursor-pointer`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{stat.icon}</span>
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                <span className="text-2xl font-bold text-white">{stat.value}</span>
                            </div>
                        </div>
                        <h3 className="text-white font-bold text-lg">{stat.title}</h3>
                        <p className="text-white/80 text-sm mt-1">+12% عن الشهر الماضي</p>
                    </div>
                ))}
            </div>

            {/* Departments Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">الأقسام</h2>
                    <Link
                        href="/dashboard/departments"
                        className="text-brand-purple-100 hover:text-brand-primary transition-colors text-sm font-medium"
                    >
                        عرض الكل ←
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {departments.map((dept, index) => (
                        <Link
                            key={dept.id}
                            href={`/departments/${dept.id}`}
                            className="group"
                        >
                            <div
                                className={`glass rounded-2xl p-6 card-hover relative overflow-hidden`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-3xl shadow-lg">
                                            {dept.icon}
                                        </div>
                                        <span className="text-white/40 group-hover:text-white/60 transition-colors">→</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-purple-100 transition-colors">
                                        {dept.name}
                                    </h3>
                                    <p className="text-white/70 text-sm">
                                        {dept.description}
                                    </p>

                                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-xs text-white/50">12 عضو</span>
                                        <span className="text-xs text-white/50">8 مهام نشطة</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">النشاط الأخير</h2>

                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                                A
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium">أحمد محمد قام بإنهاء مهمة "تصميم الشعار"</p>
                                <p className="text-white/50 text-sm mt-1">منذ ساعتين</p>
                            </div>
                            <span className="text-green-400 text-sm bg-green-500/20 px-3 py-1 rounded-full">مكتملة</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

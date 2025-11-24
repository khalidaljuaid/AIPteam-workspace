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
                    <div className="mt-8 flex gap-4">
                        <Link
                            href="/dashboard/tasks"
                            className="btn-aip btn-aip-primary"
                        >
                            <span className="ml-2">✅</span>
                            مهامي
                        </Link>
                        <Link
                            href="/dashboard/projects"
                            className="btn-aip btn-aip-secondary"
                        >
                            <span className="ml-2">🚀</span>
                            المشاريع
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Grid - Improved Spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.color} rounded-2xl p-8 shadow-lg card-hover cursor-pointer relative overflow-hidden group`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-4xl filter drop-shadow-lg">{stat.icon}</span>
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                                </div>
                            </div>
                            <h3 className="text-white font-bold text-xl mb-1">{stat.title}</h3>
                            <p className="text-white/80 text-sm font-medium bg-black/10 inline-block px-2 py-1 rounded-lg">+12% نمو</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Departments Section - Freer Colors */}
            <div className="section-spacing">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">الأقسام</h2>
                        <p className="text-white/60">استعرض جميع أقسام الفريق</p>
                    </div>
                    <Link
                        href="/dashboard/departments"
                        className="btn-aip btn-aip-secondary text-sm"
                    >
                        عرض الكل ←
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {departments.map((dept, index) => (
                        <Link
                            key={dept.id}
                            href={`/departments/${dept.id}`}
                            className="group"
                        >
                            <div
                                className={`glass rounded-3xl p-8 card-hover relative overflow-hidden border border-white/5`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                {/* Gradient Overlay on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                                            {dept.icon}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                            <span className="text-white/60 group-hover:text-white">↗</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-purple-100 transition-colors">
                                        {dept.name}
                                    </h3>
                                    <p className="text-white/70 text-base leading-relaxed mb-6">
                                        {dept.description}
                                    </p>

                                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                                        <div className="flex -space-x-3 space-x-reverse">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-brand-dark border-2 border-white/10 flex items-center justify-center text-[10px] text-white">U{i}</div>
                                            ))}
                                        </div>
                                        <span className="text-sm text-white/50">+9 أعضاء</span>
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

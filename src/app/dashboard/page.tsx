'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (userData) {
            setUser(JSON.parse(userData))
        }
    }, [])

    const departments = [
        { id: 'content_posts', name: 'إدارة المحتوى والمنشورات', icon: '✍️', desc: 'إدارة المحتوى الرقمي والنشر' },
        { id: 'creativity', name: 'إدارة الإبداع', icon: '🎨', desc: 'تطوير الأفكار والحلول الإبداعية' },
        { id: 'pr', name: 'إدارة العلاقات العامة', icon: '🤝', desc: 'التواصل والشراكات الخارجية' },
        { id: 'events', name: 'إدارة الأنشطة والفعاليات', icon: '🎉', desc: 'تخطيط وتنفيذ الفعاليات' },
        { id: 'projects', name: 'إدارة المشاريع', icon: '🚀', desc: 'إدارة ومتابعة المشاريع التقنية' },
        { id: 'development', name: 'إدارة المتابعة والتطوير', icon: '📈', desc: 'متابعة الأداء وتطوير الجودة' },
        { id: 'executive', name: 'الإدارة التنفيذية', icon: '👑', desc: 'القرارات الاستراتيجية والإدارية' },
        { id: 'education', name: 'إدارة المحتوى التعليمي', icon: '📚', desc: 'تطوير المناهج والمحتوى التعليمي' },
    ]

    const stats = [
        { title: 'إجمالي الأعضاء', value: '124', icon: '👥', color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
        { title: 'المهام النشطة', value: '45', icon: '✅', color: 'text-green-500', bg: 'bg-green-500/10' },
        { title: 'المشاريع', value: '12', icon: '🚀', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { title: 'الأقسام', value: '8', icon: '🏢', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    ]

    return (
        <div className="space-y-10">

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-brand-secondary to-brand-primary rounded-3xl p-10 shadow-2xl relative overflow-hidden text-white">
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold mb-4">
                        مرحباً بك، {user?.firstName} 👋
                    </h1>
                    <p className="text-white/80 text-xl font-light max-w-2xl">
                        {user?.role === 'ADMIN' ? 'لوحة تحكم المسؤول - لديك صلاحيات كاملة لإدارة النظام.' : 'لوحة تحكم العضو - تابع مهامك ومشاريعك من هنا.'}
                    </p>

                    <div className="mt-8 flex gap-4">
                        <Link href="/dashboard/tasks" className="bg-white text-brand-primary px-6 py-3 rounded-full font-bold hover:bg-white/90 transition-colors shadow-lg">
                            عرض مهامي
                        </Link>
                        <Link href="/dashboard/projects" className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full font-bold hover:bg-white/20 transition-colors">
                            المشاريع
                        </Link>
                    </div>
                </div>

                {/* Decorative Circle */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#1E1E2D] border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition-all group">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{stat.title}</p>
                            <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
                        </div>
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center text-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Departments Grid */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">الأقسام</h2>
                    <span className="text-sm text-gray-500">8 أقسام نشطة</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {departments.map((dept) => (
                        <Link
                            key={dept.id}
                            href={`/dashboard/departments/${dept.id}`}
                            className="bg-white dark:bg-[#1E1E2D] border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm p-6 hover:-translate-y-1 hover:shadow-xl hover:border-brand-primary/30 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-brand-light dark:bg-white/5 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-inner text-brand-primary">
                                {dept.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-brand-primary transition-colors">
                                {dept.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                {dept.desc}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

        </div>
    )
}

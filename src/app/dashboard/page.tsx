'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: string
    email: string
    name?: string
    department?: string
    role?: string
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (!userData) {
            router.push('/')
            return
        }

        setUser(JSON.parse(userData))
        setLoading(false)
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('user')
        router.push('/')
    }

    const departments = [
        {
            id: 'content',
            name: 'إدارة المحتوى والمنشورات',
            icon: '📝',
            color: 'from-purple-500 to-blue-500',
            link: '/departments/content'
        },
        {
            id: 'followup',
            name: 'إدارة المتابعة والتطوير',
            icon: '📊',
            color: 'from-blue-500 to-cyan-500',
            link: '/departments/followup'
        },
        {
            id: 'public-relations',
            name: 'إدارة العلاقات العامة',
            icon: '🤝',
            color: 'from-green-500 to-teal-500',
            link: '/departments/public-relations'
        },
        {
            id: 'creativity',
            name: 'إدارة الإبداع',
            icon: '🎨',
            color: 'from-pink-500 to-purple-500',
            link: '/departments/creativity'
        },
        {
            id: 'educational',
            name: 'إدارة المحتوى التعليمي',
            icon: '📚',
            color: 'from-orange-500 to-red-500',
            link: '/departments/educational'
        },
        {
            id: 'activities',
            name: 'إدارة الأنشطة والفعاليات',
            icon: '🎯',
            color: 'from-yellow-500 to-orange-500',
            link: '/departments/activities'
        },
        {
            id: 'projects',
            name: 'إدارة المشاريع',
            icon: '🚀',
            color: 'from-indigo-500 to-purple-500',
            link: '/departments/projects'
        }
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]" dir="rtl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">جاري التحميل...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8" dir="rtl">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">نظرة عامة على الأقسام</h2>
                    <p className="text-gray-400 text-sm">
                        اختر القسم للوصول إلى البيانات والمهام
                    </p>
                </div>
            </div>

            {/* الأقسام السبعة */}
            {/* الأقسام */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Executive Card - Only for Admins */}
                {user?.role === 'ADMIN' && (
                    <a
                        href="/departments/executive"
                        className="dept-card group border-2 border-yellow-400 bg-yellow-50/50 dark:bg-yellow-900/10"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-lg">
                                👑
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-1 text-yellow-800 dark:text-yellow-500">الإدارة التنفيذية</h3>
                                <p className="text-sm text-muted-foreground">
                                    لوحة التحكم الشاملة
                                </p>
                            </div>
                        </div>
                    </a>
                )}

                {departments.filter(dept => {
                    // Admin sees everything
                    if (user?.role === 'ADMIN') return true;

                    // Member/Leader sees only their department
                    // Map department IDs to enum values stored in DB
                    const deptMapping: Record<string, string> = {
                        'content': 'CONTENT_PUBLISHING',
                        'followup': 'FOLLOW_UP',
                        'public-relations': 'PUBLIC_RELATIONS',
                        'creativity': 'CREATIVITY',
                        'educational': 'EDUCATIONAL_CONTENT',
                        'activities': 'ACTIVITIES',
                        'projects': 'PROJECTS'
                    };

                    // If user has no department assigned, maybe show nothing or show all? 
                    // Requirement: "every member or leader has access only to his department"
                    // So if no department, show nothing (or maybe a message).
                    if (!user?.department) return false;

                    return deptMapping[dept.id] === user.department;
                }).map((dept) => (
                    <a
                        key={dept.id}
                        href={dept.link}
                        className="bg-[#1E1E2D]/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-[#009EF7] group transition-all duration-300"
                    >
                        <div className="flex items-center gap-5">
                            <div className={`h-14 w-14 rounded-lg bg-[#351962] flex items-center justify-center text-2xl group-hover:bg-[#009EF7] text-white transition-colors duration-200`}>
                                {dept.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white mb-1">{dept.name}</h3>
                                <p className="text-xs text-gray-400 font-medium">
                                    انقر للدخول
                                </p>
                            </div>
                            <div className="text-gray-500 group-hover:text-[#009EF7] transition-colors">
                                ←
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Show message if no departments visible (e.g. new member with no dept) */}
            {
                user?.role !== 'ADMIN' && !user?.department && (
                    <div className="text-center p-12 bg-gray-50 rounded-xl border-2 border-dashed">
                        <p className="text-lg text-muted-foreground">
                            لم يتم تعيينك لأي قسم بعد. يرجى التواصل مع الإدارة.
                        </p>
                    </div>
                )
            }

            {/* قسم التعاون المشترك */}
            <div className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl">
                        🔗
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">مساحة التعاون المشتركة</h3>
                        <p className="text-sm text-muted-foreground">
                            للمهام التي تتطلب تعاون بين عدة أقسام
                        </p>
                    </div>
                </div>
                <a href="/collaboration" className="btn-primary inline-block">
                    عرض المهام المشتركة
                </a>
            </div>
        </div >
    )
}

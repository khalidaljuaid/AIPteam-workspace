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
            <div className="min-h-screen flex items-center justify-center" dir="rtl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">جاري التحميل...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900" dir="rtl">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                AIPioneers Workspace
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                مرحباً، {user?.name || user?.email}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {user?.role === 'ADMIN' && (
                                <a
                                    href="/dashboard/users"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                                >
                                    إدارة المستخدمين
                                </a>
                            )}
                            <div className="text-left">
                                <p className="text-sm font-medium">{user?.email}</p>
                                {user?.department && (
                                    <p className="text-xs text-muted-foreground">
                                        {user.department}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn-secondary text-sm"
                            >
                                تسجيل الخروج
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2">الأقسام</h2>
                    <p className="text-muted-foreground">
                        اختر القسم للوصول إلى البيانات والمهام
                    </p>
                </div>

                {/* الأقسام السبعة */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {departments.map((dept) => (
                        <a
                            key={dept.id}
                            href={dept.link}
                            className="dept-card group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                                    {dept.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold mb-1">{dept.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        انقر للدخول →
                                    </p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

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
            </div>
        </div>
    )
}

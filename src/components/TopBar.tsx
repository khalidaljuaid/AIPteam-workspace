'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function TopBar() {
    const pathname = usePathname()
    const [date, setDate] = useState('')

    useEffect(() => {
        const d = new Date()
        setDate(d.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    }, [])

    const getPageTitle = (path: string) => {
        if (path === '/dashboard') return 'لوحة التحكم'
        if (path.includes('/users')) return 'إدارة الأعضاء'
        if (path.includes('/departments')) return 'الأقسام'
        if (path.includes('/tasks')) return 'المهام'
        if (path.includes('/projects')) return 'المشاريع'
        return 'الرئيسية'
    }

    return (
        <header className="h-20 bg-white dark:bg-[#1E1E2D] border-b border-gray-200 dark:border-white/5 sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">

            {/* Breadcrumbs / Title */}
            <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <span>الرئيسية</span>
                    <span>/</span>
                    <span className="text-brand-primary font-medium">{getPageTitle(pathname)}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{getPageTitle(pathname)}</h2>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">

                {/* Date Widget */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm text-gray-600 dark:text-gray-300">
                    <span>📅</span>
                    <span>{date}</span>
                </div>

                {/* Search */}
                <div className="hidden lg:block relative">
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-white/10 rounded-full px-4 py-2 w-64 text-sm text-gray-800 dark:text-white focus:border-brand-primary focus:w-72 transition-all outline-none"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>

                {/* Notifications (Mock) */}
                <button className="relative p-2 text-gray-400 hover:text-brand-primary transition-colors">
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>

            </div>

        </header>
    )
}

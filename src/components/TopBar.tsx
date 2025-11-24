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
        <header className="h-20 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 px-8 flex items-center justify-between">

            {/* Breadcrumbs / Title */}
            <div>
                <div className="flex items-center gap-2 text-xs text-brand-text-muted mb-1">
                    <span>الرئيسية</span>
                    <span>/</span>
                    <span className="text-brand-primary">{getPageTitle(pathname)}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{getPageTitle(pathname)}</h2>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">

                {/* Date Widget */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-brand-text-secondary">
                    <span>📅</span>
                    <span>{date}</span>
                </div>

                {/* Search */}
                <div className="hidden lg:block relative">
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="bg-brand-card border border-white/10 rounded-full px-4 py-2 w-64 text-sm text-white focus:border-brand-primary focus:w-72 transition-all outline-none"
                    />
                    <span className="absolute left-3 top-2.5 text-brand-text-muted">🔍</span>
                </div>

            </div>

        </header>
    )
}

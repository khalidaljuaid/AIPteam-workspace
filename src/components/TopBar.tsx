'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function TopBar({ user }: { user: any }) {
    const pathname = usePathname()
    const [date, setDate] = useState<string>('')

    useEffect(() => {
        // Format date in Arabic
        const d = new Date()
        setDate(d.toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
    }, [])

    const getPageTitle = (path: string) => {
        if (path === '/dashboard') return 'الرئيسية'
        if (path.includes('/users')) return 'إدارة المستخدمين'
        if (path.includes('/departments')) return 'الأقسام'
        if (path.includes('/tasks')) return 'المهام'
        return 'لوحة التحكم'
    }

    return (
        <header className="sticky top-0 z-40 bg-[#151521]/80 backdrop-blur-xl border-b border-white/5 px-8 py-5 transition-all duration-300">
            <div className="flex items-center justify-between max-w-[1600px] mx-auto">

                {/* Left Side: Breadcrumbs & Title */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-brand-purple-100/60 mb-1 font-medium">
                        <span>لوحة التحكم</span>
                        <span>/</span>
                        <span className="text-brand-purple-100">{getPageTitle(pathname)}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">{getPageTitle(pathname)}</h2>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-6">

                    {/* Date Widget */}
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-white/80">
                        <span>📅</span>
                        <span>{date}</span>
                    </div>

                    {/* Search Bar (Minimalist) */}
                    <div className="hidden md:flex items-center relative group">
                        <input
                            type="text"
                            placeholder="بحث..."
                            className="bg-transparent border-b border-white/20 px-2 py-1 w-48 text-sm text-white focus:border-brand-primary focus:w-64 transition-all outline-none placeholder-white/30"
                        />
                        <span className="absolute left-0 text-white/40 group-focus-within:text-brand-primary transition-colors">🔍</span>
                    </div>

                    <div className="h-8 w-px bg-white/10 mx-2"></div>

                    {/* User Profile Pill */}
                    <div className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-white group-hover:text-brand-purple-100 transition-colors">{user?.name}</p>
                            <p className="text-[10px] text-white/50">{user?.role === 'ADMIN' ? 'مسؤول النظام' : 'عضو فريق'}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/10 group-hover:ring-brand-primary/50 transition-all">
                            {user?.name?.[0] || 'U'}
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

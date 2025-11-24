'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname()

    const links = [
        { href: '/dashboard', label: 'الرئيسية', icon: '🏠' },
        { href: '/dashboard/tasks', label: 'مهامي', icon: '✅' },
        { href: '/dashboard/projects', label: 'المشاريع', icon: '🚀' },
        { href: '/dashboard/departments', label: 'الأقسام', icon: '🏢' },
        { href: '/dashboard/users', label: 'الأعضاء', icon: '👥', adminOnly: true },
    ]

    return (
        <aside className="fixed right-0 top-0 h-screen w-72 bg-brand-card border-l border-white/5 flex flex-col z-50 shadow-2xl">

            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center border-b border-white/5">
                <div className="relative w-12 h-12">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="mr-3 font-bold text-lg text-white">AIP Team</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                {links.map((link) => {
                    if (link.adminOnly && user?.role !== 'ADMIN') return null

                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                    : 'text-brand-text-secondary hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile (Bottom) */}
            <div className="p-4 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/10">
                        {user?.firstName?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-brand-text-secondary truncate">
                            {user?.email}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('user')
                            window.location.href = '/'
                        }}
                        className="text-brand-text-muted hover:text-brand-danger transition-colors p-2"
                        title="تسجيل الخروج"
                    >
                        🚪
                    </button>
                </div>
            </div>

        </aside>
    )
}

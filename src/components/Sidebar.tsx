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
        <aside className="fixed right-0 top-0 h-screen w-72 bg-brand-secondary text-white flex flex-col z-50 shadow-2xl transition-all duration-300">

            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center border-b border-white/10 bg-black/10">
                <div className="relative w-10 h-10 ml-3">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="font-bold text-lg tracking-wide">AIP Workspace</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {links.map((link) => {
                    if (link.adminOnly && user?.role !== 'ADMIN') return null

                    const isActive = pathname === link.href

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-white/10 text-white shadow-lg border-r-4 border-brand-accent-cyan'
                                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className={`text-xl transition-transform group-hover:scale-110 ${isActive ? 'text-brand-accent-cyan' : ''}`}>{link.icon}</span>
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile (Bottom) */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-accent-cyan to-brand-accent-indigo flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/10">
                        {user?.firstName?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                            {user?.email}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('user')
                            window.location.href = '/'
                        }}
                        className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-white/5"
                        title="تسجيل الخروج"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    </button>
                </div>
            </div>

        </aside>
    )
}

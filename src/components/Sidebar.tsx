'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Sidebar({ user }: { user: any }) {
    const pathname = usePathname()

    const links = [
        { name: 'الرئيسية', href: '/dashboard', icon: '🏠' },
        { name: 'الأقسام', href: '/dashboard#departments', icon: '🏢' },
        { name: 'المهام', href: '/dashboard/tasks', icon: '✅' },
        { name: 'المشاريع', href: '/dashboard/projects', icon: '🚀' },
    ]

    if (user?.role === 'ADMIN') {
        links.push({ name: 'إدارة المستخدمين', href: '/dashboard/users', icon: '👥' })
        links.push({ name: 'الإدارة التنفيذية', href: '/departments/executive', icon: '👑' })
    }

    return (
        <aside className="fixed right-0 top-0 h-screen w-72 bg-[#1E1E2D] text-white z-50 transition-all duration-300 hidden lg:flex flex-col shadow-xl">
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center border-b border-white/10 mb-2">
                <div className="relative w-32 h-10">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain brightness-0 invert" // Make logo white for dark sidebar
                    />
                </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-4">القائمة الرئيسية</div>
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${isActive
                                    ? 'bg-[#351962] text-white' // Active: Brand Purple
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className="text-lg opacity-80">{link.icon}</span>
                            <span>{link.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile Mini (Metronic Footer Style) */}
            <div className="p-4 border-t border-white/10 bg-[#151521]">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#351962] flex items-center justify-center text-white font-bold text-lg">
                        {user?.firstName?.[0] || 'U'}
                    </div>
                    <div className="overflow-hidden">
                        <h4 className="font-bold text-sm text-white truncate">{user?.firstName} {user?.lastName}</h4>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

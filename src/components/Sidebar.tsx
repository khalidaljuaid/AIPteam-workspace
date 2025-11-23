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
        <aside className="fixed right-0 top-0 h-screen w-72 bg-white dark:bg-[#111c44] border-l border-gray-100 dark:border-gray-800 z-50 transition-all duration-300 hidden lg:block">
            {/* Logo Area */}
            <div className="h-24 flex items-center justify-center border-b border-gray-50 dark:border-gray-800 mb-6">
                <div className="relative w-40 h-12">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Nav Links */}
            <nav className="px-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive
                                    ? 'bg-[#351962] text-white shadow-lg shadow-purple-200'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                }`}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span>{link.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile Mini */}
            <div className="absolute bottom-8 right-0 left-0 px-4">
                <div className="bg-gradient-to-br from-[#80519F] to-[#351962] rounded-2xl p-4 text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center text-xl backdrop-blur-sm">
                            👤
                        </div>
                        <h4 className="font-bold text-sm truncate">{user?.firstName} {user?.lastName}</h4>
                        <p className="text-xs text-purple-200 mt-1">{user?.role}</p>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                </div>
            </div>
        </aside>
    )
}

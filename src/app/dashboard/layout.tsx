'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import TopBar from '@/components/TopBar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

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
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        router.push('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin text-6xl mb-4">⏳</div>
                    <p className="text-white/70">جاري التحميل...</p>
                </div>
            </div>
        )
    }

    const navLinks = [
        { name: 'الرئيسية', href: '/dashboard', icon: '🏠' },
        { name: 'الأقسام', href: '/dashboard/departments', icon: '🏢' },
        ...(user?.role === 'ADMIN' ? [
            { name: 'إدارة المستخدمين', href: '/dashboard/users', icon: '👥' },
            { name: 'الإدارة التنفيذية', href: '/departments/executive', icon: '👑' },
        ] : []),
    ]

    return (
        <div className="min-h-screen bg-brand-dark flex">
            {/* Modern Sidebar */}
            <aside
                className={`fixed right-0 top-0 h-screen bg-gradient-to-b from-brand-secondary to-brand-purple-600 text-white z-50 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'
                    } shadow-2xl`}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-center border-b border-white/10 px-4">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                            <div>
                                <h3 className="font-bold text-sm">رواد الذكاء</h3>
                                <p className="text-xs text-white/70">الاصطناعي</p>
                            </div>
                        </div>
                    ) : (
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-white/20 text-white shadow-lg'
                                    : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <span className="text-2xl">{link.icon}</span>
                                {sidebarOpen && <span className="font-medium">{link.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-white/10">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm text-white truncate">{user?.name}</h4>
                                <p className="text-xs text-white/70 truncate">{user?.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg shadow-lg mx-auto mb-4">
                            {user?.name?.[0] || 'U'}
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg transition-all text-sm font-medium"
                    >
                        {sidebarOpen ? 'تسجيل الخروج 🚪' : '🚪'}
                    </button>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="absolute -left-4 top-24 bg-brand-primary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                >
                    {sidebarOpen ? '◀' : '▶'}
                </button>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'mr-72' : 'mr-20'}`}>
                {/* New Professional Top Bar */}
                <TopBar user={user} />

                {/* Page Content with improved spacing */}
                <div className="p-8 lg:p-10 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}

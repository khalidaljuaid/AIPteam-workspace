'use client'

import { useRouter } from 'next/navigation'

export default function Navbar({ user, title }: { user: any, title: string }) {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('user')
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        router.push('/')
    }

    return (
        <header className="sticky top-0 z-40 bg-white/50 dark:bg-[#0b1437]/50 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground mb-1">الصفحات / {title}</p>
                <h2 className="text-2xl font-bold text-[#351962] dark:text-white">{title}</h2>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-[#111c44] p-2 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
                {/* Search */}
                <div className="hidden md:flex items-center bg-gray-50 dark:bg-[#0b1437] rounded-full px-4 py-2 border border-gray-100 dark:border-gray-800">
                    <span className="text-gray-400 ml-2">🔍</span>
                    <input
                        type="text"
                        placeholder="بحث..."
                        className="bg-transparent border-none outline-none text-sm w-40"
                    />
                </div>

                {/* Actions */}
                <button className="w-10 h-10 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-center text-gray-500 transition-colors">
                    🔔
                </button>

                <button
                    onClick={handleLogout}
                    className="w-10 h-10 rounded-full hover:bg-red-50 text-red-500 flex items-center justify-center transition-colors"
                    title="تسجيل الخروج"
                >
                    🚪
                </button>

                {/* Mobile Menu Trigger (Visible only on small screens) */}
                <button className="lg:hidden w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-500">
                    ☰
                </button>
            </div>
        </header>
    )
}

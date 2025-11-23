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
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <span>الرئيسية</span>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-800 font-medium">{title}</span>
                </div>
                <h2 className="text-xl font-bold text-[#1E1E2D]">{title}</h2>
            </div>

            <div className="flex items-center gap-3">
                {/* Search - Metronic Style */}
                <div className="hidden md:flex items-center bg-[#F5F8FA] rounded-lg px-3 py-2.5 w-64 focus-within:bg-gray-100 transition-colors">
                    <span className="text-gray-400 ml-2">🔍</span>
                    <input
                        type="text"
                        placeholder="بحث سريع..."
                        className="bg-transparent border-none outline-none text-sm w-full text-gray-600 placeholder:text-gray-400"
                    />
                </div>

                <div className="h-8 w-px bg-gray-200 mx-2"></div>

                {/* Actions */}
                <button className="w-10 h-10 rounded-lg hover:bg-[#F5F8FA] flex items-center justify-center text-gray-500 transition-colors relative">
                    🔔
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <button
                    onClick={handleLogout}
                    className="h-10 px-4 rounded-lg bg-[#F5F8FA] hover:bg-red-50 text-gray-600 hover:text-red-600 flex items-center gap-2 transition-colors text-sm font-medium"
                    title="تسجيل الخروج"
                >
                    <span>خروج</span>
                    <span>🚪</span>
                </button>
            </div>
        </header>
    )
}

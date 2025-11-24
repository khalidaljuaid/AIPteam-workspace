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
        <header className="sticky top-0 z-40 bg-[#151521]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
            <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                    <span>الرئيسية</span>
                    <span className="text-gray-600">/</span>
                    <span className="text-white font-medium">{title}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>

            <div className="flex items-center gap-3">
                {/* Search - Dark Metronic Style */}
                <div className="hidden md:flex items-center bg-[#1E1E2D] rounded-lg px-3 py-2.5 w-64 focus-within:bg-[#2B2B40] transition-colors border border-white/5">
                    <span className="text-gray-500 ml-2">🔍</span>
                    <input
                        type="text"
                        placeholder="بحث سريع..."
                        className="bg-transparent border-none outline-none text-sm w-full text-gray-300 placeholder:text-gray-600"
                    />
                </div>

                <div className="h-8 w-px bg-white/10 mx-2"></div>

                {/* Actions */}
                <button className="w-10 h-10 rounded-lg hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
                    🔔
                    <span className="absolute top-2 right-2 w-2 h-2 bg-[#009EF7] rounded-full border-2 border-[#151521]"></span>
                </button>

                <button
                    onClick={handleLogout}
                    className="h-10 px-4 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-300 hover:text-red-500 flex items-center gap-2 transition-colors text-sm font-medium border border-white/5"
                    title="تسجيل الخروج"
                >
                    <span>خروج</span>
                    <span>🚪</span>
                </button>
            </div>
        </header>
    )
}

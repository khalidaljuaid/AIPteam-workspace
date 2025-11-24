'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (!userData) {
            router.push('/login')
        } else {
            setUser(JSON.parse(userData))
        }
        setLoading(false)
    }, [router])

    if (loading) return null

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#151521] flex">

            {/* Sidebar (Fixed Right) */}
            <Sidebar user={user} />

            {/* Main Content Area */}
            <main className="flex-1 mr-72 min-h-screen flex flex-col transition-all duration-300">

                {/* Top Bar (Sticky) */}
                <TopBar />

                {/* Page Content */}
                <div className="p-8 lg:p-10 max-w-[1600px] mx-auto w-full animate-fade-in">
                    {children}
                </div>

            </main>

        </div>
    )
}

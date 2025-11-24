'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (!userData) {
            router.push('/')
            return
        }
        setUser(JSON.parse(userData))
        setLoading(false)
    }, [router])

    if (loading) return null

    return (
        <div className="min-h-screen flex" dir="rtl">
            {/* Sidebar */}
            <Sidebar user={user} />

            {/* Main Content */}
            <main className="flex-1 lg:mr-72 transition-all duration-300">
                <Navbar user={user} title="لوحة التحكم" />
                <div className="p-6 mx-auto max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    )
}

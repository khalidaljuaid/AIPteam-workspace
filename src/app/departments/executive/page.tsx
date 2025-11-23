'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Stats {
    contentPosts: number
    deptTasks: number
    eventTracking: number
    disciplineRecords: number
    creativeTasks: number
    educationalContent: number
    activities: number
    projects: number
    totalTasks: number
}

interface Deadline {
    id: string
    task?: string
    projectName?: string
    deadline?: string
    deliveryDate?: string
    expectedEnd?: string
    responsibleDept?: string
    memberName?: string
    status?: string
}

interface ExecutiveData {
    stats: Stats
    deadlines: {
        tasks: Deadline[]
        creative: Deadline[]
        projects: Deadline[]
    }
}

export default function ExecutiveDashboard() {
    const [data, setData] = useState<ExecutiveData | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = () => {
            const userData = localStorage.getItem('user')
            if (!userData) {
                router.push('/')
                return
            }
            const user = JSON.parse(userData)
            if (user.role !== 'ADMIN') {
                router.push('/dashboard')
                return
            }
            fetchStats()
        }
        checkAuth()
    }, [router])

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/executive/stats')
            if (!res.ok) throw new Error('Failed to fetch stats')
            const jsonData = await res.json()
            setData(jsonData)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="p-8 text-center">جاري التحميل...</div>
    if (!data) return <div className="p-8 text-center text-red-500">فشل تحميل البيانات</div>

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6" dir="rtl">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gold-500 to-yellow-600 bg-clip-text text-transparent text-yellow-600">
                            الإدارة التنفيذية 👑
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            نظرة شاملة على أداء جميع الأقسام
                        </p>
                    </div>
                    <button onClick={() => router.push('/dashboard')} className="btn-secondary">
                        عودة للرئيسية
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="إجمالي المهام" value={data.stats.totalTasks} icon="📊" color="bg-blue-500" />
                    <StatCard title="المشاريع القائمة" value={data.stats.projects} icon="🚀" color="bg-purple-500" />
                    <StatCard title="المنشورات" value={data.stats.contentPosts} icon="📝" color="bg-pink-500" />
                    <StatCard title="الفعاليات" value={data.stats.activities} icon="🎉" color="bg-orange-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Detailed Breakdown */}
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-4">توزيع المهام حسب القسم</h3>
                        <div className="space-y-4">
                            <StatRow label="إدارة المحتوى والنشر" value={data.stats.contentPosts} total={data.stats.totalTasks} />
                            <StatRow label="إدارة المتابعة والتطوير" value={data.stats.deptTasks} total={data.stats.totalTasks} />
                            <StatRow label="إدارة الإبداع" value={data.stats.creativeTasks} total={data.stats.totalTasks} />
                            <StatRow label="إدارة المحتوى التعليمي" value={data.stats.educationalContent} total={data.stats.totalTasks} />
                            <StatRow label="إدارة العلاقات العامة (رعايات)" value={0} total={data.stats.totalTasks} /> {/* Placeholder if no count yet */}
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="card p-6">
                        <h3 className="text-xl font-bold mb-4 text-red-600">⚠️ استحقاقات قريبة (7 أيام)</h3>
                        <div className="space-y-4">
                            {data.deadlines.projects.map(p => (
                                <DeadlineItem key={p.id} title={`مشروع: ${p.projectName}`} date={p.expectedEnd} type="project" />
                            ))}
                            {data.deadlines.tasks.map(t => (
                                <DeadlineItem key={t.id} title={`متابعة: ${t.task}`} date={t.deadline} type="task" />
                            ))}
                            {data.deadlines.creative.map(c => (
                                <DeadlineItem key={c.id} title={`تصميم: ${c.task}`} date={c.deliveryDate} type="creative" />
                            ))}

                            {data.deadlines.projects.length === 0 &&
                                data.deadlines.tasks.length === 0 &&
                                data.deadlines.creative.length === 0 && (
                                    <p className="text-center text-muted-foreground py-4">لا توجد استحقاقات قريبة</p>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: string, color: string }) {
    return (
        <div className="card p-6 flex items-center gap-4 hover:scale-105 transition-transform">
            <div className={`h-12 w-12 rounded-full ${color} text-white flex items-center justify-center text-2xl shadow-lg`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
        </div>
    )
}

function StatRow({ label, value, total }: { label: string, value: number, total: number }) {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span className="font-bold">{value}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

function DeadlineItem({ title, date, type }: { title: string, date?: string, type: string }) {
    if (!date) return null
    const d = new Date(date)
    const isUrgent = (d.getTime() - new Date().getTime()) < (3 * 24 * 60 * 60 * 1000) // Less than 3 days

    return (
        <div className={`flex items-center justify-between p-3 rounded-lg border ${isUrgent ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
            <div className="flex items-center gap-3">
                <span className="text-lg">{type === 'project' ? '🚀' : type === 'creative' ? '🎨' : '📋'}</span>
                <span className="font-medium text-sm">{title}</span>
            </div>
            <span className={`text-xs font-mono ${isUrgent ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                {d.toLocaleDateString('ar-SA')}
            </span>
        </div>
    )
}

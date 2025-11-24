'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    department: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const router = useRouter()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users')
                if (!res.ok) throw new Error('فشل في جلب البيانات')
                const data = await res.json()
                setUsers(data)
            } catch (err) {
                setError('حدث خطأ أثناء تحميل المستخدمين')
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const filteredUsers = users.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'ADMIN': return 'bg-red-500/20 text-red-200 border-red-500/30'
            case 'LEADER': return 'bg-purple-500/20 text-purple-200 border-purple-500/30'
            default: return 'bg-blue-500/20 text-blue-200 border-blue-500/30'
        }
    }

    const getDepartmentName = (deptId: string) => {
        const depts: { [key: string]: string } = {
            'content': 'المحتوى والإبداع',
            'technical': 'التقنية والبرمجة',
            'media': 'الإعلام والتواصل',
            'design': 'التصميم والجرافيك',
            'executive': 'الإدارة التنفيذية'
        }
        return depts[deptId] || deptId
    }

    if (loading) return <div className="text-center text-white py-10">جاري التحميل...</div>

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">إدارة المستخدمين</h1>
                    <p className="text-white/60">إدارة صلاحيات وأعضاء الفريق</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="بحث عن عضو..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white focus:border-brand-primary w-64"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">🔍</span>
                    </div>
                    <button className="gradient-purple text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                        + إضافة عضو
                    </button>
                </div>
            </div>

            {/* Users Table Card */}
            <div className="glass rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10">
                                <th className="text-right py-4 px-6 text-white/60 font-medium">العضو</th>
                                <th className="text-right py-4 px-6 text-white/60 font-medium">البريد الإلكتروني</th>
                                <th className="text-right py-4 px-6 text-white/60 font-medium">القسم</th>
                                <th className="text-right py-4 px-6 text-white/60 font-medium">الدور</th>
                                <th className="text-right py-4 px-6 text-white/60 font-medium">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-purple-200 font-bold border border-brand-primary/30">
                                                {user.firstName[0]}
                                            </div>
                                            <span className="text-white font-medium">{user.firstName} {user.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-white/80">{user.email}</td>
                                    <td className="py-4 px-6">
                                        <span className="bg-white/5 px-3 py-1 rounded-full text-sm text-white/80 border border-white/10">
                                            {getDepartmentName(user.department)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRoleBadgeColor(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400 transition-colors" title="تعديل">
                                                ✏️
                                            </button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-red-400 transition-colors" title="حذف">
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-white/40">
                        لا يوجد مستخدمين مطابقين للبحث
                    </div>
                )}
            </div>
        </div>
    )
}

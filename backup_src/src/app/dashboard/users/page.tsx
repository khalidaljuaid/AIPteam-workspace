'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: string
    name: string | null
    firstName: string | null
    lastName: string | null
    email: string
    role: string
    department: string | null
    createdAt: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users')
            if (!res.ok) throw new Error('Failed to fetch users')
            const data = await res.json()
            setUsers(data)
        } catch (err) {
            setError('فشل تحميل المستخدمين')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole }),
            })

            if (!res.ok) throw new Error('Failed to update role')

            // Update local state
            setUsers(users.map(user =>
                user.id === userId ? { ...user, role: newRole } : user
            ))
        } catch (err) {
            alert('فشل تحديث الدور')
            console.error(err)
        }
    }

    const handleDepartmentChange = async (userId: string, newDept: string) => {
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ department: newDept }),
            })

            if (!res.ok) throw new Error('Failed to update department')

            // Update local state
            setUsers(users.map(user =>
                user.id === userId ? { ...user, department: newDept } : user
            ))
        } catch (err) {
            alert('فشل تحديث القسم')
            console.error(err)
        }
    }

    const handleDelete = async (userId: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return

        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Failed to delete user')

            // Update local state
            setUsers(users.filter(user => user.id !== userId))
        } catch (err) {
            alert('فشل حذف المستخدم')
            console.error(err)
        }
    }

    if (loading) return <div className="p-8 text-center">جاري التحميل...</div>

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
                <div className="text-sm text-muted-foreground">
                    عدد المستخدمين: {users.length}
                </div>
            </div>

            {error && (
                <div className="bg-destructive/10 text-destructive p-4 rounded-md">
                    {error}
                </div>
            )}

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-4 font-medium">الاسم</th>
                                <th className="p-4 font-medium">البريد الإلكتروني</th>
                                <th className="p-4 font-medium">الدور</th>
                                <th className="p-4 font-medium">القسم</th>
                                <th className="p-4 font-medium">تاريخ التسجيل</th>
                                <th className="p-4 font-medium">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium">
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono text-sm">{user.email}</td>
                                    <td className="p-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            className="bg-background border border-input rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="MEMBER">عضو (Member)</option>
                                            <option value="LEADER">قائد (Leader)</option>
                                            <option value="ADMIN">مدير (Admin)</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <select
                                            value={user.department || ''}
                                            onChange={(e) => handleDepartmentChange(user.id, e.target.value)}
                                            className="bg-background border border-input rounded px-2 py-1 text-sm focus:ring-2 focus:ring-primary w-40"
                                        >
                                            <option value="">غير محدد</option>
                                            <option value="CREATIVITY">إدارة الابداع</option>
                                            <option value="CONTENT_PUBLISHING">إدارة المحتوى والنشر</option>
                                            <option value="ACTIVITIES">إدارة الأنشطة والفعاليات</option>
                                            <option value="PUBLIC_RELATIONS">إدارة العلاقات العامة</option>
                                            <option value="EDUCATIONAL_CONTENT">إدارة المحتوى التعليمي</option>
                                            <option value="PROJECTS">إدارة المشاريع</option>
                                            <option value="FOLLOW_UP">إدارة المتابعة والتطوير</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground">
                                        {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-destructive hover:text-destructive/80 text-sm font-medium"
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

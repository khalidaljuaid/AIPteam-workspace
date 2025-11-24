'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        departmentId: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const departments = [
        { id: 'content_posts', name: 'إدارة المحتوى والمنشورات' },
        { id: 'creativity', name: 'إدارة الإبداع' },
        { id: 'pr', name: 'إدارة العلاقات العامة' },
        { id: 'events', name: 'إدارة الأنشطة والفعاليات' },
        { id: 'projects', name: 'إدارة المشاريع' },
        { id: 'development', name: 'إدارة المتابعة والتطوير' },
        { id: 'executive', name: 'الإدارة التنفيذية' },
        { id: 'education', name: 'إدارة المحتوى التعليمي' },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (res.ok) {
                router.push('/login')
            } else {
                setError(data.error || 'فشل إنشاء الحساب')
            }
        } catch (err) {
            setError('حدث خطأ في الاتصال')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-brand-light dark:bg-brand-dark py-12 px-4 transition-colors duration-300">
            <div className="w-full max-w-lg bg-white dark:bg-[#1E1E2D] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/5">

                <div className="p-8 text-center bg-brand-primary/5 dark:bg-white/5">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <Image
                            src="/logo.png"
                            alt="AIP Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-brand-secondary dark:text-white mb-2">إنشاء حساب جديد</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">انضم لفريق العمل وابدأ رحلتك</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleRegister} className="space-y-5">

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-4 rounded-xl text-center border border-red-100 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">الاسم الأول</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم العائلة</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">القسم</label>
                            <select
                                name="departmentId"
                                value={formData.departmentId}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all appearance-none"
                                required
                            >
                                <option value="" disabled>اختر القسم...</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id} className="text-black">
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-brand-primary text-white font-bold shadow-lg hover:bg-brand-secondary hover:shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'جاري الإنشاء...' : 'إنشاء حساب جديد'}
                        </button>

                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            لديك حساب بالفعل؟{' '}
                            <Link href="/login" className="text-brand-primary font-bold hover:underline">
                                تسجيل الدخول
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

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

    // EXACT 8 DEPARTMENTS AS REQUESTED
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
                router.push('/')
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark">
            <div className="w-full max-w-lg">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/logo.png"
                            alt="AIP Logo"
                            width={120}
                            height={120}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">انضم للفريق 🚀</h1>
                    <p className="text-brand-text-secondary">أنشئ حسابك الجديد وابدأ رحلتك معنا</p>
                </div>

                {/* Card */}
                <div className="bg-brand-card border border-white/5 rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleRegister} className="space-y-6">

                        {error && (
                            <div className="bg-brand-danger/10 text-brand-danger text-sm p-3 rounded-lg text-center border border-brand-danger/20">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-brand-text-secondary mb-2">الاسم الأول</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-[#151521] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder-gray-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brand-text-secondary mb-2">اسم العائلة</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-[#151521] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-2">البريد الإلكتروني</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#151521] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder-gray-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-2">القسم</label>
                            <select
                                name="departmentId"
                                value={formData.departmentId}
                                onChange={handleChange}
                                className="w-full bg-[#151521] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder-gray-500 appearance-none"
                                required
                            >
                                <option value="" disabled>اختر القسم...</option>
                                {departments.map((dept) => (
                                    <option key={dept.id} value={dept.id} className="bg-brand-dark text-white">
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-2">كلمة المرور</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-[#151521] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder-gray-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-brand-primary text-white hover:bg-brand-secondary shadow-lg hover:shadow-brand-primary/20 bg-gradient-to-br from-[#80519F] to-[#351962]"
                        >
                            {loading ? 'جاري الإنشاء...' : 'إنشاء حساب جديد'}
                        </button>

                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-brand-text-secondary">
                        لديك حساب بالفعل؟{' '}
                        <Link href="/" className="text-brand-primary hover:text-brand-secondary font-semibold transition-colors">
                            تسجيل الدخول
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

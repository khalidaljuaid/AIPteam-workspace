'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        department: '',
        role: 'MEMBER' // Default role
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

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
        <div className="min-h-screen relative overflow-hidden bg-[#151521]">
            {/* Clean Background - No Blobs */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#151521] to-[#1E1E2D]"></div>

            {/* Glass Card Container */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-lg">
                    {/* Logo & Title */}
                    <div className="text-center mb-10 animate-fade-in">
                        <div className="flex justify-center mb-8">
                            <div className="relative w-32 h-32">
                                <Image
                                    src="/logo.png"
                                    alt="شعار رواد الذكاء الاصطناعي"
                                    width={128}
                                    height={128}
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                            انضم إلى الفريق 🚀
                        </h1>
                        <p className="text-white/60 text-lg">
                            أنشئ حسابك الجديد وابدأ رحلتك معنا
                        </p>
                    </div>

                    {/* Register Card - Clean & Solid */}
                    <div className="bg-[#1E1E2D] rounded-3xl p-10 shadow-2xl border border-white/5 animate-scale-in">
                        <form onSubmit={handleRegister} className="space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        الاسم الأول
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/15 focus:border-brand-primary transition-all"
                                        placeholder="محمد"
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        الاسم الأخير
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/15 focus:border-brand-primary transition-all"
                                        placeholder="أحمد"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    البريد الإلكتروني
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/15 focus:border-brand-primary transition-all"
                                        placeholder="example@aipioneers.sa"
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                                        ✉️
                                    </span>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    كلمة المرور
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/15 focus:border-brand-primary transition-all"
                                        placeholder="••••••••"
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                                        🔒
                                    </span>
                                </div>
                            </div>

                            {/* Department */}
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    القسم
                                </label>
                                <div className="relative">
                                    <select
                                        name="department"
                                        required
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:bg-brand-secondary focus:border-brand-primary transition-all appearance-none"
                                    >
                                        <option value="" className="bg-brand-dark text-gray-400">اختر القسم...</option>
                                        {departments.map(dept => (
                                            <option key={dept.id} value={dept.id} className="bg-brand-dark text-white">
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                                        ▼
                                    </span>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-slide-down">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full gradient-purple text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-spin">⏳</span>
                                        جاري إنشاء الحساب...
                                    </span>
                                ) : (
                                    'إنشاء حساب جديد'
                                )}
                            </button>

                            {/* Login Link */}
                            <div className="text-center mt-6">
                                <p className="text-white/70 text-sm">
                                    لديك حساب بالفعل؟{' '}
                                    <Link
                                        href="/"
                                        className="text-brand-purple-100 hover:text-brand-primary font-semibold transition-colors"
                                    >
                                        تسجيل الدخول
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

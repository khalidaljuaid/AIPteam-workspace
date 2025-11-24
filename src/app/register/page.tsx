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
        { id: 'content', name: 'المحتوى والإبداع' },
        { id: 'technical', name: 'التقنية والبرمجة' },
        { id: 'media', name: 'الإعلام والتواصل' },
        { id: 'design', name: 'التصميم والجرافيك' },
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
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-purple-600">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-primary opacity-30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-purple-200 opacity-30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-purple-400 opacity-30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

            {/* Glass Card Container */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-lg">
                    {/* Logo & Title */}
                    <div className="text-center mb-8 animate-fade-in">
                        <div className="flex justify-center mb-6">
                            <div className="relative w-24 h-24">
                                <Image
                                    src="/logo.png"
                                    alt="شعار رواد الذكاء الاصطناعي"
                                    width={96}
                                    height={96}
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            انضم إلى الفريق 🚀
                        </h1>
                        <p className="text-brand-light/80">
                            أنشئ حسابك الجديد وابدأ رحلتك معنا
                        </p>
                    </div>

                    {/* Register Card */}
                    <div className="glass rounded-2xl p-8 shadow-2xl animate-scale-in">
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

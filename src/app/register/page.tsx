'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
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
                // Auto login or redirect to login
                router.push('/')
            } else {
                // Show detailed error if available
                const errorMsg = data.details || data.error || 'فشل إنشاء الحساب';
                const debugInfo = data.debug ? ` (${data.debug})` : '';
                setError(errorMsg + debugInfo);
            }
        } catch (err: any) {
            setError(err.message || 'حدث خطأ. الرجاء المحاولة مرة أخرى.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex w-full" dir="rtl">
            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#151521] relative overflow-hidden border-l border-white/5">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-900/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="w-full max-w-md space-y-6 relative z-10">
                    <div className="text-center space-y-2">
                        <div className="flex justify-center mb-4">
                            <div className="relative w-20 h-20">
                                <Image
                                    src="/logo.png"
                                    alt="AIPioneers Logo"
                                    fill
                                    className="object-contain drop-shadow-xl brightness-0 invert" // White logo
                                />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white">
                            انضم إلى فريق المبدعين 🚀
                        </h1>
                        <p className="text-gray-400 text-sm">
                            أنشئ حسابك الجديد في AIPioneers Workspace
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 text-red-400 px-4 py-3 rounded-xl text-sm border border-red-500/20 flex items-center gap-2">
                                ⚠️ {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-300">الاسم الأول</label>
                                <input
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-[#1E1E2D] border border-white/10 focus:border-[#009EF7] focus:ring-1 focus:ring-[#009EF7] text-white placeholder:text-gray-600 outline-none transition-all"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-300">اسم العائلة</label>
                                <input
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-[#1E1E2D] border border-white/10 focus:border-[#009EF7] focus:ring-1 focus:ring-[#009EF7] text-white placeholder:text-gray-600 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300">اسم المستخدم (للعرض)</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[#1E1E2D] border border-white/10 focus:border-[#009EF7] focus:ring-1 focus:ring-[#009EF7] text-white placeholder:text-gray-600 outline-none transition-all"
                                placeholder="مثال: أحمد محمد"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300">البريد الإلكتروني</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[#1E1E2D] border border-white/10 focus:border-[#009EF7] focus:ring-1 focus:ring-[#009EF7] text-white placeholder:text-gray-600 outline-none transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300">كلمة المرور</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-[#1E1E2D] border border-white/10 focus:border-[#009EF7] focus:ring-1 focus:ring-[#009EF7] text-white placeholder:text-gray-600 outline-none transition-all"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#009EF7] hover:bg-[#0095E8] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-1 mt-4"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    جاري الإنشاء...
                                </span>
                            ) : 'إنشاء الحساب'}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-500 pt-2">
                        <p>
                            لديك حساب بالفعل؟{' '}
                            <a href="/" className="text-[#009EF7] font-bold hover:underline">
                                تسجيل الدخول
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-[#351962] relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3D388C] via-[#351962] to-[#25336E] opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

                {/* Abstract Shapes */}
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#80519F] rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#72CBD7] rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>

                <div className="relative z-10 text-white text-center p-12 max-w-xl">
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        ابدأ رحلتك معنا
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCADD9] to-[#72CBD7]">
                            في عالم الإبداع
                        </span>
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                        انضم إلى نخبة من المبدعين والمنظمين. منصة AIPioneers توفر لك الأدوات اللازمة للتميز والنجاح في مهامك.
                    </p>

                    <div className="grid grid-cols-2 gap-4 text-left">
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                            <span className="text-xl">✨</span>
                            <span className="text-sm text-gray-200">بيئة عمل محفزة</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                            <span className="text-xl">📊</span>
                            <span className="text-sm text-gray-200">تنظيم متقن</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                            <span className="text-xl">🤝</span>
                            <span className="text-sm text-gray-200">تعاون فعال</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                            <span className="text-xl">📈</span>
                            <span className="text-sm text-gray-200">تطور مستمر</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (res.ok) {
                localStorage.setItem('user', JSON.stringify(data.user))
                router.push('/dashboard')
            } else {
                setError(data.error || 'فشل تسجيل الدخول')
            }
        } catch (err) {
            setError('حدث خطأ في الاتصال')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-brand-dark">
            <div className="w-full max-w-md">

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
                    <h1 className="text-3xl font-bold text-white mb-2">مرحباً بعودتك 👋</h1>
                    <p className="text-brand-text-secondary">سجل دخولك لمتابعة أعمالك</p>
                </div>

                {/* Card */}
                <div className="bg-brand-card border border-white/5 rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {error && (
                            <div className="bg-brand-danger/10 text-brand-danger text-sm p-3 rounded-lg text-center border border-brand-danger/20">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-2">البريد الإلكتروني</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#151521] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder-gray-500"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-brand-text-secondary mb-2">كلمة المرور</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#151521] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all placeholder-gray-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-brand-primary text-white hover:bg-brand-secondary shadow-lg hover:shadow-brand-primary/20 bg-gradient-to-br from-[#80519F] to-[#351962]"
                        >
                            {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                        </button>

                    </form>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-brand-text-secondary">
                        ليس لديك حساب؟{' '}
                        <Link href="/register" className="text-brand-primary hover:text-brand-secondary font-semibold transition-colors">
                            انضم للفريق
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

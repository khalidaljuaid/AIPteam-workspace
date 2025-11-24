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
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-brand-light dark:bg-brand-dark py-12 px-4 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-[#1E1E2D] rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-white/5">

                <div className="p-8 text-center bg-brand-primary/5 dark:bg-white/5">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <Image
                            src="/logo.png"
                            alt="AIP Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-brand-secondary dark:text-white mb-2">تسجيل الدخول</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">مرحباً بعودتك إلى مساحة العمل</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-6">

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-4 rounded-xl text-center border border-red-100 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">كلمة المرور</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-[#151521] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-brand-primary text-white font-bold shadow-lg hover:bg-brand-secondary hover:shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
                        </button>

                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            ليس لديك حساب؟{' '}
                            <Link href="/register" className="text-brand-primary font-bold hover:underline">
                                انضم للفريق
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

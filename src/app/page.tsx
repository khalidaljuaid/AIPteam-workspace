'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-secondary to-brand-purple-600">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-primary opacity-30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-brand-purple-200 opacity-30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-brand-purple-400 opacity-30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

      {/* Glass Card Container */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
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
              مرحباً بعودتك 👋
            </h1>
            <p className="text-brand-light/80">
              قم بتسجيل الدخول لمتابعة أعمالك
            </p>
          </div>

          {/* Login Card */}
          <div className="glass rounded-2xl p-8 shadow-2xl animate-scale-in">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/15 focus:border-brand-primary transition-all"
                    placeholder="example@aipioneers.sa"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    ✉️
                  </span>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:bg-white/15 focus:border-brand-primary transition-all"
                    placeholder="••••••••"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                    🔒
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm animate-slide-down">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-purple text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  'تسجيل الدخول'
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/50">أو</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-white/70 text-sm">
                  ليس لديك حساب؟{' '}
                  <Link
                    href="/register"
                    className="text-brand-purple-100 hover:text-brand-primary font-semibold transition-colors"
                  >
                    إنشاء حساب جديد
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-white/50 text-sm">
            <p>© 2024 رواد الذكاء الاصطناعي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

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
      setError('حدث خطأ. الرجاء المحاولة مرة أخرى.')
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

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <Image
                  src="/logo.png"
                  alt="شعار النظام"
                  width={128}
                  height={128}
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">
              مرحباً بعودتك 👋
            </h1>
            <p className="text-gray-400">
              قم بتسجيل الدخول لمتابعة أعمالك في AIPioneers
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 text-red-400 px-4 py-3 rounded-xl text-sm border border-red-500/20 flex items-center gap-2">
                ⚠️ {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-300">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1E1E2D] border border-white/10 focus:border-[#009EF7] focus:ring-1 focus:ring-[#009EF7] text-white placeholder:text-gray-600 outline-none transition-all"
                placeholder="name@aipioneers.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-semibold text-gray-300">
                  كلمة المرور
                </label>
                <a href="#" className="text-xs text-[#009EF7] hover:text-[#009EF7]/80 hover:underline">نسيت كلمة المرور؟</a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#1E1E2D] border border-white/10 focus:border-[#009EF7] focus:ring-1 focus:ring-[#009EF7] text-white placeholder:text-gray-600 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#009EF7] hover:bg-[#0095E8] text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  جاري الدخول...
                </span>
              ) : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 pt-4">
            <p>
              ليس لديك حساب؟{' '}
              <a href="/register" className="text-[#009EF7] font-bold hover:underline">
                انضم للفريق
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#80519F] rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#72CBD7] rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>

        <div className="relative z-10 text-white text-center p-12 max-w-xl">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
              <span className="text-4xl">🚀</span>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            نظام إدارة الفريق العربي
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCADD9] to-[#72CBD7]">
              AIPioneers Workspace
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            منصة متكاملة لإدارة المهام، المشاريع، والمحتوى الإبداعي.
            نجمع بين الإبداع والتنظيم لتحقيق أهدافنا المشتركة.
          </p>

          {/* Stats/badges */}
          <div className="mt-12 flex justify-center gap-6">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-[#72CBD7]">+7</div>
              <div className="text-xs text-gray-300">أقسام إدارية</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10">
              <div className="text-2xl font-bold text-[#CCADD9]">+70</div>
              <div className="text-xs text-gray-300">عضو مبدع</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

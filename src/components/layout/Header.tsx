'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const navLinks = [
        { name: 'الرئيسية', href: '/' },
        { name: 'الأقسام', href: '/departments' },
        { name: 'عن الفريق', href: '/about' },
        { name: 'تواصل معنا', href: '/contact' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full bg-brand-dark/90 backdrop-blur-md border-b border-white/10 shadow-lg">
            <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="AIP Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">AIP Team</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-colors hover:text-brand-primary ${pathname === link.href ? 'text-brand-primary' : 'text-gray-300'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold shadow-lg hover:shadow-brand-primary/30 transition-all transform hover:-translate-y-0.5"
                    >
                        تسجيل الدخول
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-brand-dark border-t border-white/10">
                    <div className="px-4 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block text-gray-300 hover:text-brand-primary py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="block w-full text-center px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold mt-4"
                            onClick={() => setIsOpen(false)}
                        >
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

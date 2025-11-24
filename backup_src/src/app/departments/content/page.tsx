'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ContentPost {
    id: string
    publishDate: string
    contentType: string
    writer: string
    captionLinkedIn: string
    captionX: string
    captionInstagram: string
    designLink: string
    contentAfterReview: string
    reviewer: string
    status: string
    publishedLinkedIn: boolean
    publishedX: boolean
    publishedInstagram: boolean
    publishedTikTok: boolean
}

export default function ContentManagementPage() {
    const [posts, setPosts] = useState<ContentPost[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const userData = localStorage.getItem('user')
        if (!userData) {
            router.push('/')
            return
        }

        fetchPosts()
    }, [router])

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/departments/content')
            if (res.ok) {
                const data = await res.json()
                setPosts(data.posts || [])
            }
        } catch (error) {
            console.error('Error fetching posts:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status: string) => {
        const colors = {
            'PUBLISHED': 'bg-green-100 text-green-700',
            'UNDER_REVIEW': 'bg-yellow-100 text-yellow-700',
            'NOT_USEFUL': 'bg-red-100 text-red-700'
        }
        const labels = {
            'PUBLISHED': 'تم النشر',
            'UNDER_REVIEW': 'تحت المراجعة',
            'NOT_USEFUL': 'غير مجدي'
        }
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status as keyof typeof colors]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        )
    }

    const getContentTypeLabel = (type: string) => {
        const labels = {
            'SCIENTIFIC_SOURCES': 'مصادر علمية',
            'ABOUT_TEAM': 'عن الفريق',
            'ACTIVITIES': 'أنشطة وفعاليات',
            'EDUCATIONAL': 'تعليمي',
            'OCCASIONS': 'مناسبات'
        }
        return labels[type as keyof typeof labels] || type
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900" dir="rtl">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <a href="/dashboard" className="text-primary hover:underline">
                                ← العودة للوحة التحكم
                            </a>
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                                📝
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">إدارة المحتوى والمنشورات</h1>
                                <p className="text-sm text-muted-foreground">
                                    إدارة جميع المنشورات على وسائل التواصل الاجتماعي
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="btn-primary"
                        >
                            + إضافة منشور جديد
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-muted-foreground">جاري التحميل...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="card p-12 text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-bold mb-2">لا توجد منشورات بعد</h3>
                        <p className="text-muted-foreground mb-4">
                            ابدأ بإضافة أول منشور لك
                        </p>
                        <button onClick={() => setShowForm(true)} className="btn-primary">
                            إضافة منشور
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div key={post.id} className="card p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-sm text-muted-foreground">
                                                {new Date(post.publishDate).toLocaleDateString('ar-SA')}
                                            </span>
                                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                                {getContentTypeLabel(post.contentType)}
                                            </span>
                                            {getStatusBadge(post.status)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            الكاتب: {post.writer}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Caption LinkedIn:
                                        </p>
                                        <p className="text-sm">{post.captionLinkedIn}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground mb-1">
                                            Caption X:
                                        </p>
                                        <p className="text-sm">{post.captionX}</p>
                                    </div>
                                </div>

                                {/* تشيك ليست */}
                                <div className="flex gap-4 pt-4 border-t">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={post.publishedLinkedIn}
                                            readOnly
                                            className="h-4 w-4"
                                        />
                                        <span className="text-sm">LinkedIn</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={post.publishedX}
                                            readOnly
                                            className="h-4 w-4"
                                        />
                                        <span className="text-sm">X</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={post.publishedInstagram}
                                            readOnly
                                            className="h-4 w-4"
                                        />
                                        <span className="text-sm">Instagram</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={post.publishedTikTok}
                                            readOnly
                                            className="h-4 w-4"
                                        />
                                        <span className="text-sm">TikTok</span>
                                    </div>
                                </div>

                                {post.designLink && (
                                    <div className="mt-4">
                                        <a
                                            href={post.designLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline text-sm"
                                        >
                                            🔗 رابط التصميم
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* نموذج إضافة منشور */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="card p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">إضافة منشور جديد</h2>
                        <p className="text-muted-foreground mb-4">
                            هذه النماذج قيد التطوير - سيتم إضافتها قريباً
                        </p>
                        <button onClick={() => setShowForm(false)} className="btn-secondary">
                            إغلاق
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

'use client'

import { useParams } from 'next/navigation'

export default function DepartmentDashboard() {
    const params = useParams()
    const id = params.id as string

    const departments: { [key: string]: any } = {
        'content_posts': { name: 'إدارة المحتوى والمنشورات', icon: '✍️', desc: 'إدارة المحتوى الرقمي والنشر' },
        'creativity': { name: 'إدارة الإبداع', icon: '🎨', desc: 'تطوير الأفكار والحلول الإبداعية' },
        'pr': { name: 'إدارة العلاقات العامة', icon: '🤝', desc: 'التواصل والشراكات الخارجية' },
        'events': { name: 'إدارة الأنشطة والفعاليات', icon: '🎉', desc: 'تخطيط وتنفيذ الفعاليات' },
        'projects': { name: 'إدارة المشاريع', icon: '🚀', desc: 'إدارة ومتابعة المشاريع التقنية' },
        'development': { name: 'إدارة المتابعة والتطوير', icon: '📈', desc: 'متابعة الأداء وتطوير الجودة' },
        'executive': { name: 'الإدارة التنفيذية', icon: '👑', desc: 'القرارات الاستراتيجية والإدارية' },
        'education': { name: 'إدارة المحتوى التعليمي', icon: '📚', desc: 'تطوير المناهج والمحتوى التعليمي' },
    }

    const dept = departments[id] || { name: 'القسم غير موجود', icon: '❓', desc: '' }

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="bg-white dark:bg-[#1E1E2D] border border-gray-100 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-5xl">
                    {dept.icon}
                </div>
                <div className="text-center md:text-right flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">{dept.name}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">{dept.desc}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 py-3 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-secondary transition-colors shadow-lg">
                        إضافة مهمة
                    </button>
                    <button className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                        الإعدادات
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Stats Column */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#1E1E2D] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-4">إحصائيات سريعة</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                                <span className="text-gray-500 dark:text-gray-400">الأعضاء</span>
                                <span className="font-bold text-xl text-brand-primary">12</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                                <span className="text-gray-500 dark:text-gray-400">المهام المنجزة</span>
                                <span className="font-bold text-xl text-green-500">85%</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                                <span className="text-gray-500 dark:text-gray-400">المشاريع</span>
                                <span className="font-bold text-xl text-blue-500">4</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#1E1E2D] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm min-h-[400px] flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <span className="text-4xl mb-4 block">📋</span>
                            <p>لا توجد مهام نشطة حالياً</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

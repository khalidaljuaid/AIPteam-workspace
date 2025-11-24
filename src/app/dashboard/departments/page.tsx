'use client'

import Link from 'next/link'

export default function DepartmentsPage() {
    const departments = [
        { id: 'content_posts', name: 'إدارة المحتوى والمنشورات', icon: '✍️', desc: 'إدارة المحتوى الرقمي والنشر', color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { id: 'creativity', name: 'إدارة الإبداع', icon: '🎨', desc: 'تطوير الأفكار والحلول الإبداعية', color: 'text-pink-500', bg: 'bg-pink-500/10' },
        { id: 'pr', name: 'إدارة العلاقات العامة', icon: '🤝', desc: 'التواصل والشراكات الخارجية', color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { id: 'events', name: 'إدارة الأنشطة والفعاليات', icon: '🎉', desc: 'تخطيط وتنفيذ الفعاليات', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
        { id: 'projects', name: 'إدارة المشاريع', icon: '🚀', desc: 'إدارة ومتابعة المشاريع التقنية', color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 'development', name: 'إدارة المتابعة والتطوير', icon: '📈', desc: 'متابعة الأداء وتطوير الجودة', color: 'text-green-500', bg: 'bg-green-500/10' },
        { id: 'executive', name: 'الإدارة التنفيذية', icon: '👑', desc: 'القرارات الاستراتيجية والإدارية', color: 'text-slate-500', bg: 'bg-slate-500/10' },
        { id: 'education', name: 'إدارة المحتوى التعليمي', icon: '📚', desc: 'تطوير المناهج والمحتوى التعليمي', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    ]

    return (
        <div className="space-y-8">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">الأقسام</h1>
                    <p className="text-gray-500 dark:text-gray-400">نظرة عامة على جميع أقسام الفريق</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept) => (
                    <Link
                        key={dept.id}
                        href={`/dashboard/departments/${dept.id}`}
                        className="group bg-white dark:bg-[#1E1E2D] border border-gray-100 dark:border-white/5 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className={`w-14 h-14 rounded-2xl ${dept.bg} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                                {dept.icon}
                            </div>
                            <span className="bg-gray-50 dark:bg-white/5 text-gray-400 text-xs px-3 py-1 rounded-full">
                                نشط
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-brand-primary transition-colors">
                            {dept.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                            {dept.desc}
                        </p>

                        <div className="flex items-center text-brand-primary text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <span>عرض التفاصيل</span>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

'use client'

import Link from 'next/link'

export default function HomePage() {
    const departments = [
        { id: 'content_posts', name: 'إدارة المحتوى والمنشورات', icon: '✍️', desc: 'إدارة المحتوى الرقمي والنشر' },
        { id: 'creativity', name: 'إدارة الإبداع', icon: '🎨', desc: 'تطوير الأفكار والحلول الإبداعية' },
        { id: 'pr', name: 'إدارة العلاقات العامة', icon: '🤝', desc: 'التواصل والشراكات الخارجية' },
        { id: 'events', name: 'إدارة الأنشطة والفعاليات', icon: '🎉', desc: 'تخطيط وتنفيذ الفعاليات' },
        { id: 'projects', name: 'إدارة المشاريع', icon: '🚀', desc: 'إدارة ومتابعة المشاريع التقنية' },
        { id: 'development', name: 'إدارة المتابعة والتطوير', icon: '📈', desc: 'متابعة الأداء وتطوير الجودة' },
        { id: 'executive', name: 'الإدارة التنفيذية', icon: '👑', desc: 'القرارات الاستراتيجية والإدارية' },
        { id: 'education', name: 'إدارة المحتوى التعليمي', icon: '📚', desc: 'تطوير المناهج والمحتوى التعليمي' },
    ]

    return (
        <div className="bg-brand-light dark:bg-brand-dark transition-colors duration-300">

            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-secondary to-brand-dark opacity-90 z-0"></div>
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 z-0"></div>

                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
                        نبتكر الحلول <br /> <span className="text-brand-accent-cyan">للمستقبل الرقمي</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
                        فريق AIP يجمع بين الإبداع والتقنية لتقديم أفضل الحلول الرقمية وإدارة المشاريع بامتياز.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link
                            href="/login"
                            className="px-8 py-4 rounded-full bg-white text-brand-primary font-bold text-lg shadow-xl hover:bg-gray-100 transform hover:-translate-y-1 transition-all"
                        >
                            ابدأ الآن
                        </Link>
                        <Link
                            href="/departments"
                            className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transform hover:-translate-y-1 transition-all"
                        >
                            استكشف الأقسام
                        </Link>
                    </div>
                </div>
            </section>

            {/* Departments Preview */}
            <section className="py-20 container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary dark:text-white mb-4">أقسام الفريق</h2>
                    <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">هيكل تنظيمي متكامل لضمان سير العمل بكفاءة</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {departments.map((dept) => (
                        <div
                            key={dept.id}
                            className="group bg-white dark:bg-[#1E1E2D] p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-white/5 hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-brand-light dark:bg-white/5 flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 text-brand-primary">
                                {dept.icon}
                            </div>
                            <h3 className="text-xl font-bold text-brand-secondary dark:text-white mb-3 group-hover:text-brand-primary transition-colors">
                                {dept.name}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                {dept.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-secondary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent-cyan rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-8">جاهز للانضمام إلينا؟</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        كن جزءاً من فريقنا المتميز وساهم في بناء المستقبل.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-brand-accent-cyan to-brand-accent-indigo text-white font-bold text-lg shadow-lg hover:shadow-brand-accent-cyan/50 transform hover:scale-105 transition-all"
                    >
                        انضم للفريق
                    </Link>
                </div>
            </section>

        </div>
    )
}

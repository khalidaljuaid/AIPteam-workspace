'use client'

export default function ExecutiveDeptPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="gradient-purple rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">👑</span>
                        <h1 className="text-3xl font-bold text-white">الإدارة التنفيذية</h1>
                    </div>
                    <p className="text-white/80 max-w-2xl">
                        إدارة الاستراتيجيات والقرارات العليا ومتابعة سير العمل في جميع الأقسام
                    </p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-xl border-t-4 border-brand-primary">
                    <h3 className="text-white/60 mb-2">إجمالي المشاريع</h3>
                    <p className="text-3xl font-bold text-white">12</p>
                </div>
                <div className="glass p-6 rounded-xl border-t-4 border-cyan-500">
                    <h3 className="text-white/60 mb-2">نسبة الإنجاز</h3>
                    <p className="text-3xl font-bold text-white">85%</p>
                </div>
                <div className="glass p-6 rounded-xl border-t-4 border-green-500">
                    <h3 className="text-white/60 mb-2">القرارات النشطة</h3>
                    <p className="text-3xl font-bold text-white">5</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Decisions */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>📢</span> القرارات الأخيرة
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-brand-primary/50 transition-colors cursor-pointer">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-white">قرار إداري رقم #{100 + i}</h3>
                                    <span className="text-xs text-white/40">24 نوفمبر 2025</span>
                                </div>
                                <p className="text-white/70 text-sm">اعتماد خطة العمل الجديدة للربع القادم وتوزيع المهام...</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Department Performance */}
                <div className="glass rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>📊</span> أداء الأقسام
                    </h2>
                    <div className="space-y-6">
                        {[
                            { name: 'التقنية', val: 90, color: 'bg-blue-500' },
                            { name: 'المحتوى', val: 75, color: 'bg-purple-500' },
                            { name: 'التصميم', val: 85, color: 'bg-pink-500' },
                            { name: 'الإعلام', val: 60, color: 'bg-green-500' },
                        ].map((dept) => (
                            <div key={dept.name}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white">{dept.name}</span>
                                    <span className="text-white/60">{dept.val}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${dept.color} transition-all duration-1000`}
                                        style={{ width: `${dept.val}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

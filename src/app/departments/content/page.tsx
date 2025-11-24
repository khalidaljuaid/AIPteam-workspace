'use client'

export default function ContentDeptPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-4xl">✍️</span>
                        <h1 className="text-3xl font-bold text-white">قسم المحتوى والإبداع</h1>
                    </div>
                    <p className="text-white/90 max-w-2xl">
                        صناعة المحتوى الإبداعي وإدارة النشر عبر منصات التواصل الاجتماعي
                    </p>
                </div>
            </div>

            {/* Kanban Board Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* To Do */}
                <div className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">قيد الانتظار</h3>
                        <span className="bg-white/10 px-2 py-1 rounded text-xs text-white">3</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                            <span className="text-xs text-pink-400 mb-1 block">Instagram</span>
                            <p className="text-white text-sm">بوست اليوم الوطني</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-colors">
                            <span className="text-xs text-blue-400 mb-1 block">Twitter</span>
                            <p className="text-white text-sm">سلسلة تغريدات عن الذكاء الاصطناعي</p>
                        </div>
                    </div>
                </div>

                {/* In Progress */}
                <div className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">جاري العمل</h3>
                        <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-xs">2</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white/5 p-3 rounded-lg border-l-4 border-blue-500">
                            <span className="text-xs text-red-400 mb-1 block">YouTube</span>
                            <p className="text-white text-sm">مونتاج فيديو الفعالية</p>
                            <div className="mt-2 flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-purple-500 border border-black"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Done */}
                <div className="glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">مكتمل</h3>
                        <span className="bg-green-500/20 text-green-200 px-2 py-1 rounded text-xs">5</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white/5 p-3 rounded-lg opacity-60">
                            <p className="text-white text-sm line-through">مراجعة المقال الأسبوعي</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

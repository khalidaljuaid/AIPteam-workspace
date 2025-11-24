export default function Footer() {
    return (
        <footer className="bg-brand-secondary text-white py-12 border-t border-white/5">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">AIP Team</h3>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            نحن فريق متخصص في تقديم الحلول الرقمية المبتكرة. نسعى دائماً للتميز والإبداع في كل ما نقدمه.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold mb-4 text-brand-accent-cyan">روابط سريعة</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors">الرئيسية</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">عن الفريق</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">خدماتنا</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">تواصل معنا</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold mb-4 text-brand-accent-cyan">تواصل معنا</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>info@aip.sa</li>
                            <li>Riyadh, Saudi Arabia</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} AIP Team. جميع الحقوق محفوظة.
                </div>
            </div>
        </footer>
    )
}

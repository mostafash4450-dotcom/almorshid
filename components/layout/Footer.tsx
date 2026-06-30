import Link from 'next/link';
import Image from 'next/image';
import { Mail, AlertTriangle, Scale, Shield, TrendingUp, BarChart2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-gray-300">
      {/* CTA Banner */}
      <div className="bg-gold-500 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary-900 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
            هل تعرضت للاحتيال من شركة فوركس؟
          </h2>
          <p className="text-primary-800 mb-5 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            تواصل معنا الآن للحصول على استشارة قانونية مجانية ومعرفة فرص استرداد أموالك
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/contact" className="bg-primary-900 text-white px-6 py-2.5 rounded font-bold hover:bg-primary-800 transition-colors text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
              تواصل معنا الآن
            </Link>
            <Link href="/category/fund-recovery" className="border-2 border-primary-900 text-primary-900 px-6 py-2.5 rounded font-bold hover:bg-primary-900 hover:text-white transition-colors text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>
              اقرأ دليل الاسترداد
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <Image
                  src="/image-removebg-preview.png"
                  alt="المرشد المالي"
                  width={44}
                  height={44}
                  className="object-contain"
                />
                <div>
                  <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    المرشد المالي
                  </div>
                  <div className="text-gold-400 text-xs tracking-widest" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    THE FINANCIAL GUIDE
                  </div>
                </div>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                المرجع العربي الموثوق في تقييم شركات التداول، التحذير من شركات الفوركس النصابة، ومراجعة مكاتب المحاماة المتخصصة في استرداد الأموال.
              </p>
              <div className="space-y-2.5">
                <a href="mailto:info@almorshid-almali.com" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gold-300 transition-colors">
                  <Mail size={14} className="text-gold-500 flex-shrink-0" />
                  <span>info@almorshid-almali.com</span>
                </a>
              </div>
            </div>

            {/* Sections */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm border-b border-primary-700 pb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
                الأقسام الرئيسية
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'تحذيرات الفوركس', href: '/category/forex-warnings', icon: AlertTriangle },
                  { label: 'كيفية التداول', href: '/category/trading-guide', icon: TrendingUp },
                  { label: 'مكاتب المحاماة', href: '/law-offices', icon: Scale },
                  { label: 'استرداد الأموال', href: '/category/fund-recovery', icon: Shield },
                  { label: 'المؤشرات المالية', href: '/category/indicators', icon: BarChart2 },
                  { label: 'الشركات المشبوهة', href: '/companies', icon: AlertTriangle },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gold-300 transition-colors">
                      <item.icon size={13} className="text-gold-500 flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Law offices */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm border-b border-primary-700 pb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
                مكاتب المحاماة الموصى بها
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Trust Law', href: '/law-offices/trust-law', desc: 'متخصص في استرداد أموال الفوركس' },
                  { label: 'D D LAW', href: '/law-offices/dd-law', desc: 'قضايا التداول الإلكتروني' },
                ].map((office) => (
                  <li key={office.label}>
                    <Link href={office.href} className="group">
                      <div className="text-sm font-semibold text-gray-200 group-hover:text-gold-300 transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
                        {office.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{office.desc}</div>
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/law-offices" className="text-sm text-gold-400 hover:text-gold-300 transition-colors font-medium">
                    عرض جميع المكاتب ←
                  </Link>
                </li>
              </ul>

              <h3 className="text-white font-bold mt-7 mb-4 text-sm border-b border-primary-700 pb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
                روابط سريعة
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'من نحن', href: '/about' },
                  { label: 'اتصل بنا', href: '/contact' },
                  { label: 'الأسئلة الشائعة', href: '/faq' },
                  { label: 'خريطة الموقع', href: '/sitemap' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-gray-400 hover:text-gold-300 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div>
              <h3 className="text-white font-bold mb-4 text-sm border-b border-primary-700 pb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
                إخلاء المسؤولية
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                المعلومات المقدمة في هذا الموقع هي لأغراض تعليمية وإعلامية فقط. لا تُعدّ مشورة استثمارية أو قانونية. يتحمل المستخدم مسؤولية قراراته الاستثمارية.
              </p>
              <p className="text-gray-500 text-xs leading-relaxed mb-5" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                التداول في الفوركس ينطوي على مخاطر عالية. لا تستثمر أكثر مما تستطيع تحمل خسارته.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-primary-800/50 rounded px-3 py-2">
                <AlertTriangle size={14} className="text-gold-500 flex-shrink-0" />
                <span style={{ fontFamily: 'Tajawal, sans-serif' }}>تداول الفوركس محفوف بالمخاطر</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            © {currentYear} المرشد المالي. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: 'الشروط والأحكام', href: '/terms' },
              { label: 'سياسة الخصوصية', href: '/privacy' },
              { label: 'سياسة الإفصاح', href: '/disclosure' },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-xs text-gray-500 hover:text-gold-400 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

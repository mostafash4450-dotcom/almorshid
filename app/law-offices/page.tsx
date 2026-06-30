import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { LawOffice } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'دليل مكاتب المحاماة الموثوقة لاسترداد الأموال',
  description: 'دليل شامل لأفضل مكاتب المحاماة المتخصصة في استرداد الأموال من شركات الفوركس المحتالة مع تقييمات وآراء حقيقية.',
};

export default async function LawOfficesPage() {
  const { data } = await supabase
    .from('law_offices')
    .select('*')
    .order('rating', { ascending: false });

  const offices = (data || []) as LawOffice[];

  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <a href="/" className="hover:text-white transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-white">مكاتب المحاماة</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
            دليل مكاتب المحاماة الموثوقة
          </h1>
          <p className="text-gray-300 max-w-2xl" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            قائمة مختارة من أفضل المكاتب القانونية المتخصصة في قضايا الفوركس واسترداد الأموال من شركات التداول المحتالة.
          </p>
        </div>
      </div>

      {/* How we choose */}
      <div className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 flex-wrap">
          <span className="text-xs font-bold text-gray-500 uppercase" style={{ fontFamily: 'Cairo, sans-serif' }}>معايير الاختيار:</span>
          {['الترخيص والشرعية', 'سجل النجاحات', 'الشفافية في الرسوم', 'دعم اللغة العربية', 'التخصص في الفوركس'].map((c) => (
            <div key={c} className="flex items-center gap-1.5 text-xs text-gray-600">
              <CheckCircle size={13} className="text-green-500" />
              <span style={{ fontFamily: 'Tajawal, sans-serif' }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="space-y-8">
          {offices.map((office, index) => (
            <div key={office.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div className="grid md:grid-cols-3">
                {/* Office info */}
                <div className="p-6 md:border-l border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                      #{index + 1}
                    </div>
                    {office.badge && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#C9A55A', color: '#0F1E36' }}>
                        {office.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>{office.name}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={16} className="fill-current" style={{ color: s <= Math.floor(office.rating) ? '#C9A55A' : '#d1d5db' }} />
                      ))}
                    </div>
                    <span className="font-bold text-lg" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>{office.rating}</span>
                    <span className="text-sm text-gray-400">({office.reviews_count} تقييم)</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    {office.description}
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link href={`/law-offices/${office.slug}`} className="text-center py-2.5 rounded font-bold text-sm text-white hover:opacity-90 transition-opacity" style={{ background: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                      عرض المراجعة الكاملة
                    </Link>
                    {office.website && (
                      <a href={office.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded py-2 transition-colors">
                        <ExternalLink size={14} />
                        زيارة الموقع الرسمي
                      </a>
                    )}
                  </div>
                </div>

                {/* Services & advantages */}
                <div className="p-6 bg-gray-50 md:border-l border-gray-100">
                  {office.services && office.services.length > 0 && (
                    <div className="mb-5">
                      <h3 className="font-bold text-sm text-gray-700 mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>الخدمات المقدمة</h3>
                      <div className="space-y-1.5">
                        {office.services.map((s) => (
                          <div key={s} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C9A55A' }} />
                            <span style={{ fontFamily: 'Tajawal, sans-serif' }}>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Advantages */}
                <div className="p-6">
                  {office.advantages && office.advantages.length > 0 && (
                    <div>
                      <h3 className="font-bold text-sm text-gray-700 mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>مزايا المكتب</h3>
                      <div className="space-y-2">
                        {office.advantages.map((a) => (
                          <div key={a} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span style={{ fontFamily: 'Tajawal, sans-serif' }}>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-5 bg-yellow-50 border border-yellow-100 rounded-lg">
          <h3 className="font-bold text-yellow-800 mb-2 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>تنبيه هام</h3>
          <p className="text-yellow-700 text-xs leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            المرشد المالي يقدم معلومات إرشادية لمساعدتك في اختيار مكتب المحاماة المناسب. لا نضمن نتائج أي قضية. يُنصح بإجراء مراجعة مستقلة قبل توقيع أي عقد مع أي مكتب. اقرأ جميع الشروط والأحكام بعناية.
          </p>
        </div>
      </div>
    </>
  );
}

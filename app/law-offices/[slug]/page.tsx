import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, CheckCircle, ExternalLink, ChevronDown, ArrowLeft, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { LawOffice } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = await supabase.from('law_offices').select('*').eq('slug', params.slug).single();
  if (!data) return {};
  const office = data as LawOffice;
  return {
    title: office.meta_title || `${office.name} - مراجعة شاملة | المرشد المالي`,
    description: office.meta_description || office.description || '',
  };
}

export default async function LawOfficePage({ params }: { params: { slug: string } }) {
  const { data } = await supabase.from('law_offices').select('*').eq('slug', params.slug).single();
  if (!data) notFound();
  const office = data as LawOffice;
  const faqs = Array.isArray(office.faq_items) ? office.faq_items : [];

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: office.name,
    description: office.description,
    url: office.website,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: office.rating,
      reviewCount: office.reviews_count,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      {/* Header */}
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <a href="/" className="hover:text-white transition-colors">الرئيسية</a>
            <span>/</span>
            <a href="/law-offices" className="hover:text-white transition-colors">مكاتب المحاماة</a>
            <span>/</span>
            <span className="text-white">{office.name}</span>
          </div>
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>{office.name}</h1>
                {office.badge && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded" style={{ background: '#C9A55A', color: '#0F1E36' }}>
                    {office.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-300 max-w-2xl" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                {office.description}
              </p>
            </div>
            <div className="flex-shrink-0 text-center bg-primary-700/30 border border-primary-600/40 rounded-xl p-5">
              <div className="text-4xl font-bold mb-1" style={{ color: '#C9A55A', fontFamily: 'Cairo, sans-serif' }}>{office.rating}</div>
              <div className="flex gap-1 justify-center mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-current" style={{ color: s <= Math.floor(office.rating) ? '#C9A55A' : '#6b7280' }} />
                ))}
              </div>
              <div className="text-xs text-gray-400">بناءً على {office.reviews_count} تقييم</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            {office.website && (
              <a href={office.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm text-primary-900 hover:opacity-90 transition-opacity" style={{ background: '#C9A55A', fontFamily: 'Cairo, sans-serif' }}>
                <ExternalLink size={15} />
                زيارة الموقع الرسمي
              </a>
            )}
            <Link href="/contact" className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm border-2 border-white text-white hover:bg-white hover:text-primary-900 transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            {office.long_description && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>نبذة عن المكتب</h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>{office.long_description}</p>
              </div>
            )}

            {/* Services */}
            {office.services && office.services.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>الخدمات المقدمة</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {office.services.map((service) => (
                    <div key={service} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#C9A55A' }} />
                      <span className="text-sm text-gray-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Advantages */}
            {office.advantages && office.advantages.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 className="text-xl font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>مزايا المكتب</h2>
                <div className="space-y-3">
                  {office.advantages.map((adv) => (
                    <div key={adv} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rating breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>تقييم المرشد المالي</h2>
              <div className="flex items-center gap-6 mb-5">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-1" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>{office.rating}</div>
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={20} className="fill-current" style={{ color: s <= Math.floor(office.rating) ? '#C9A55A' : '#d1d5db' }} />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{office.reviews_count} تقييم</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[
                    { label: 'التخصص والخبرة', val: 95 },
                    { label: 'نسبة النجاح', val: 87 },
                    { label: 'الشفافية', val: 90 },
                    { label: 'التواصل والدعم', val: 92 },
                    { label: 'قيمة مقابل السعر', val: 85 },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-32 flex-shrink-0" style={{ fontFamily: 'Tajawal, sans-serif' }}>{r.label}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ background: '#C9A55A', width: `${r.val}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-700 w-8" style={{ fontFamily: 'Cairo, sans-serif' }}>{r.val}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            {faqs.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <h2 className="text-xl font-bold mb-5" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>الأسئلة الشائعة</h2>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <details key={i} className="border border-gray-100 rounded-lg group">
                      <summary className="flex items-center justify-between px-4 py-3.5 cursor-pointer list-none">
                        <h3 className="font-semibold text-sm text-gray-800 pr-3" style={{ fontFamily: 'Cairo, sans-serif' }}>{faq.question}</h3>
                        <ChevronDown size={15} className="flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Quick info */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-5" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 className="font-bold text-sm mb-4 pb-2 border-b border-gray-100" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>معلومات التواصل</h3>
              <div className="space-y-3">
                {office.website && (
                  <a href={office.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-800 transition-colors">
                    <ExternalLink size={15} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate" style={{ fontFamily: 'Tajawal, sans-serif' }}>{office.website.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
              </div>
              {office.website && (
                <a href={office.website} target="_blank" rel="noopener noreferrer" className="mt-4 w-full block text-center py-2.5 rounded font-bold text-sm text-white hover:opacity-90 transition-opacity" style={{ background: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                  زيارة الموقع الرسمي
                </a>
              )}
            </div>

            {/* Our assessment */}
            <div className="rounded-xl p-5 mb-5" style={{ background: '#1B2A4A' }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield size={18} style={{ color: '#C9A55A' }} />
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>تقييمنا</h3>
              </div>
              <div className="text-3xl font-bold mb-2" style={{ color: '#C9A55A', fontFamily: 'Cairo, sans-serif' }}>{office.rating} / 5</div>
              {office.is_recommended && (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle size={15} />
                  <span style={{ fontFamily: 'Cairo, sans-serif' }}>موصى به من المرشد المالي</span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-sm text-gray-800 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>تعرضت للاحتيال؟</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                تواصل معنا للحصول على استشارة مجانية وتوجيهك للمكتب المناسب لقضيتك.
              </p>
              <Link href="/contact" className="w-full block text-center py-2.5 rounded font-bold text-sm text-white hover:opacity-90 transition-opacity" style={{ background: '#C9A55A', color: '#0F1E36', fontFamily: 'Cairo, sans-serif' }}>
                استشارة مجانية
              </Link>
            </div>

            <div className="mt-5">
              <Link href="/law-offices" className="flex items-center gap-1 text-sm font-medium" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                <ArrowLeft size={14} />
                عودة لدليل مكاتب المحاماة
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

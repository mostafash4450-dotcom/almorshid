import Link from 'next/link';
import Image from 'next/image';
import {
  AlertTriangle,
  Shield,
  Scale,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  Star,
  ExternalLink,
  ChevronDown,
  BarChart2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ArticleCard from '@/components/articles/ArticleCard';
import type { Article, WarnedCompany, LawOffice } from '@/lib/supabase';

async function getData() {
  const [articlesRes, warnedRes, officesRes] = await Promise.all([
    supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(9),
    supabase
      .from('warned_companies')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('law_offices')
      .select('*')
      .eq('is_recommended', true)
      .order('rating', { ascending: false })
      .limit(2),
  ]);

  return {
    articles: (articlesRes.data || []) as (Article & { categories: { name: string; slug: string } | null })[],
    warnedCompanies: (warnedRes.data || []) as WarnedCompany[],
    lawOffices: (officesRes.data || []) as LawOffice[],
  };
}

const faqItems = [
  {
    q: 'هل يمكن استرداد الأموال من شركة فوركس محتالة؟',
    a: 'نعم، في كثير من الحالات يمكن استرداد الأموال، خاصة إذا تم الدفع عبر بطاقة ائتمانية أو تحويل بنكي. الخطوات الأساسية تشمل: الإبلاغ لبنكك، والإبلاغ للجهات التنظيمية، والتواصل مع محامٍ متخصص.',
  },
  {
    q: 'كيف أعرف أن شركة الفوركس موثوقة؟',
    a: 'تحقق من وجود ترخيص صادر عن هيئة تنظيمية معترف بها (FCA، ASIC، CySEC)، وراجع تقييمات المستخدمين على مواقع مستقلة، وتأكد من وجود عنوان مادي وأرقام تواصل حقيقية.',
  },
  {
    q: 'ما هي أبرز علامات شركات الفوركس الاحتيالية؟',
    a: 'أبرز العلامات: وعود بأرباح مضمونة، ضغط للإيداع السريع، صعوبة في سحب الأموال، غياب الترخيص الواضح، عدم وضوح الرسوم والعمولات.',
  },
  {
    q: 'ما الفرق بين الفوركس المشروع وغير المشروع؟',
    a: 'الفوركس المشروع يتم عبر وسطاء مرخصين ومنظمين من جهات رقابية مستقلة، ويتيح سحب الأموال بسهولة، ويوفر شفافية كاملة في الأسعار والرسوم. أما غير المشروع فيفتقر للترخيص ويضع عقبات أمام سحب الأموال.',
  },
  {
    q: 'هل مكاتب استرداد الأموال جميعها موثوقة؟',
    a: 'لا، للأسف بعض مكاتب الاسترداد نفسها احتيالية. على موقع المرشد المالي نراجع فقط المكاتب القانونية الموثوقة كـ Trust Law و D D LAW ونقدم تقييمات موضوعية لمساعدتك على الاختيار الصحيح.',
  },
];

const warningLevelConfig = {
  critical: { label: 'خطر شديد', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  high: { label: 'تحذير عالي', bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  medium: { label: 'تحذير متوسط', bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  low: { label: 'تحذير منخفض', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
};

export default async function HomePage() {
  const { articles, warnedCompanies, lawOffices } = await getData();
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1, 7);
  const sidebarArticles = articles.slice(7, 10);

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0F1E36 0%, #1B2A4A 60%, #263c74 100%)' }} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)'
        }} />
        <div className="max-w-7xl mx-auto px-4 py-14 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border" style={{ background: 'rgba(201,165,90,0.15)', color: '#e4c46e', borderColor: 'rgba(201,165,90,0.3)', fontFamily: 'Cairo, sans-serif' }}>
                <Shield size={13} />
                المرجع العربي الموثوق في عالم المال والتداول
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                احمِ أموالك من{' '}
                <span style={{ color: '#C9A55A' }}>شركات الفوركس</span>{' '}
                النصابة
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-8" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                موقع المرشد المالي يوفر لك تحذيرات شاملة من شركات التداول المحتالة، ومراجعات مكاتب المحاماة الموثوقة، ودليل استرداد أموالك بالطرق القانونية.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <Link href="/companies" style={{ background: '#C9A55A', color: '#0F1E36', fontFamily: 'Cairo, sans-serif' }} className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm hover:opacity-90 transition-opacity">
                  <AlertTriangle size={15} />
                  الشركات المحذر منها
                </Link>
                <Link href="/contact" className="flex items-center gap-2 px-5 py-2.5 rounded font-bold text-sm border-2 border-white text-white hover:bg-white transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  استشارة مجانية
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-10">
                {[
                  { value: '+200', label: 'شركة محذر منها' },
                  { value: '+85%', label: 'نسبة نجاح الاسترداد' },
                  { value: '24/7', label: 'دعم متواصل' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold" style={{ color: '#C9A55A', fontFamily: 'Cairo, sans-serif' }}>{stat.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Tajawal, sans-serif' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 rounded-full flex items-center justify-center border" style={{ background: 'rgba(27,42,74,0.5)', borderColor: 'rgba(201,165,90,0.3)' }}>
                  <Image
                    src="/image-removebg-preview.png"
                    alt="المرشد المالي"
                    width={220}
                    height={220}
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute -top-4 -left-8 bg-white rounded-lg p-3 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-500" />
                    <span className="text-xs font-bold text-gray-700" style={{ fontFamily: 'Cairo, sans-serif' }}>تحذير جديد</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>شركة FX Masters Pro</p>
                </div>
                <div className="absolute -bottom-4 -right-8 bg-white rounded-lg p-3 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-xs font-bold text-gray-700" style={{ fontFamily: 'Cairo, sans-serif' }}>تم الاسترداد</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>50,000$ استُرد بنجاح</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alert ticker */}
      <div className="bg-red-600 text-white py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="flex-shrink-0 flex items-center gap-2 px-3 py-1 rounded text-xs font-bold whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.2)', fontFamily: 'Cairo, sans-serif' }}>
            <AlertTriangle size={12} />
            تحذير عاجل
          </div>
          <div className="text-sm overflow-hidden whitespace-nowrap" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            ⚠️ شركات تداول محذر منها: XTrade Global | FX Masters Pro | CryptoForex Ltd | BinaryWin Markets — تجنب التعامل معها وأبلغ عن أي تجربة سلبية
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Main content */}
          <div className="lg:col-span-2">
            {/* Featured article */}
            {featuredArticle && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-xl font-bold text-primary-800 whitespace-nowrap" style={{ fontFamily: 'Cairo, sans-serif' }}>أبرز المقالات</h2>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <ArticleCard article={featuredArticle} variant="featured" />
              </div>
            )}

            {/* Latest articles grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3 flex-1">
                  <h2 className="text-xl font-bold text-primary-800 whitespace-nowrap" style={{ fontFamily: 'Cairo, sans-serif' }}>أحدث المقالات</h2>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <Link href="/blog" className="text-sm font-medium flex items-center gap-1 mr-4 hover:opacity-80 transition-opacity" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                  عرض الكل
                  <ArrowLeft size={14} />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            {/* Warned companies */}
            <div className="sidebar-widget">
              <h3 className="sidebar-widget-title flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-500" />
                أحدث التحذيرات
              </h3>
              <div className="space-y-3">
                {warnedCompanies.slice(0, 4).map((company) => {
                  const config = warningLevelConfig[company.warning_level];
                  return (
                    <div key={company.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${config.dot}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-gray-800" style={{ fontFamily: 'Cairo, sans-serif' }}>{company.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${config.bg} ${config.text}`}>
                            {config.label}
                          </span>
                          {company.country && (
                            <span className="text-xs text-gray-400">{company.country}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/companies" className="mt-4 block text-center text-sm font-medium border border-gray-200 rounded py-2 hover:bg-gray-50 transition-colors" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                عرض جميع الشركات المحذر منها
              </Link>
            </div>

            {/* Law offices */}
            <div className="sidebar-widget">
              <h3 className="sidebar-widget-title flex items-center gap-2">
                <Scale size={16} className="text-primary-700" />
                مكاتب المحاماة الموصى بها
              </h3>
              <div className="space-y-4">
                {lawOffices.map((office) => (
                  <div key={office.id} className="border border-gray-100 rounded-lg p-3 hover:border-primary-200 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="font-bold text-sm text-primary-900" style={{ fontFamily: 'Cairo, sans-serif' }}>{office.name}</div>
                        {office.badge && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded mt-1 inline-block" style={{ background: '#fef3c7', color: '#92400e' }}>
                            {office.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Star size={13} className="fill-current" style={{ color: '#C9A55A' }} />
                        <span className="text-sm font-bold text-gray-700">{office.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      {office.description}
                    </p>
                    <Link href={`/law-offices/${office.slug}`} className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                      عرض المراجعة الكاملة
                      <ArrowLeft size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="rounded-lg p-5 text-white" style={{ background: '#1B2A4A' }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield size={18} style={{ color: '#C9A55A' }} />
                <h3 className="font-bold text-base" style={{ fontFamily: 'Cairo, sans-serif' }}>هل تعرضت للنصب؟</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                احصل على استشارة قانونية مجانية لتقييم قضيتك وفرص استرداد أموالك.
              </p>
              <Link href="/contact" className="w-full text-sm block text-center py-2.5 rounded font-bold hover:opacity-90 transition-opacity" style={{ background: '#C9A55A', color: '#0F1E36', fontFamily: 'Cairo, sans-serif' }}>
                استشارة مجانية الآن
              </Link>
            </div>

            {sidebarArticles.length > 0 && (
              <div className="sidebar-widget mt-6">
                <h3 className="sidebar-widget-title">مقالات حديثة</h3>
                <div>
                  {sidebarArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Warned companies section */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                <AlertTriangle className="text-red-500" size={22} />
                شركات الفوركس المحذر منها
              </h2>
              <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>قائمة محدّثة بالشركات الاحتيالية التي يجب تجنبها</p>
            </div>
            <Link href="/companies" className="text-sm font-bold border-2 border-primary-800 text-primary-800 px-5 py-2 rounded hover:bg-primary-800 hover:text-white transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
              عرض الكل
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {warnedCompanies.map((company) => {
              const config = warningLevelConfig[company.warning_level];
              return (
                <div key={company.id} className="bg-white rounded-lg p-4 border border-gray-100 hover:border-red-200 transition-colors" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>{company.name}</h3>
                      {company.country && <p className="text-xs text-gray-400 mt-0.5">{company.country}</p>}
                    </div>
                    <span className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded ${config.bg} ${config.text}`}>
                      {config.label}
                    </span>
                  </div>
                  {company.description && (
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      {company.description}
                    </p>
                  )}
                  {company.scam_type && (
                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
                      نوع الاحتيال: {company.scam_type}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Law offices section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
              مكاتب المحاماة الموصى بها
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              قمنا بمراجعة وتقييم أفضل المكاتب القانونية المتخصصة في استرداد الأموال من شركات الفوركس المحتالة
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {lawOffices.map((office) => (
              <div key={office.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-yellow-200 transition-all duration-300" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                <div className="px-6 py-5" style={{ background: '#1B2A4A' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>{office.name}</h3>
                      {office.badge && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded mt-1.5 inline-block" style={{ background: '#C9A55A', color: '#0F1E36' }}>
                          {office.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold" style={{ color: '#C9A55A', fontFamily: 'Cairo, sans-serif' }}>{office.rating}</div>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={12} className={s <= Math.floor(office.rating) ? 'fill-current' : ''} style={{ color: s <= Math.floor(office.rating) ? '#C9A55A' : '#6b7280' }} />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{office.reviews_count} تقييم</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-5" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                    {office.description}
                  </p>
                  {office.services && office.services.length > 0 && (
                    <div className="mb-5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>الخدمات الرئيسية</h4>
                      <div className="flex flex-wrap gap-2">
                        {office.services.slice(0, 4).map((service) => (
                          <span key={service} className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#eef1f8', color: '#1B2A4A', fontFamily: 'Tajawal, sans-serif' }}>
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {office.advantages && office.advantages.length > 0 && (
                    <div className="space-y-1.5 mb-5">
                      {office.advantages.slice(0, 3).map((adv) => (
                        <div key={adv} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                          <span style={{ fontFamily: 'Tajawal, sans-serif' }}>{adv}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <Link href={`/law-offices/${office.slug}`} className="flex-1 text-center py-2.5 rounded font-bold text-sm text-white hover:opacity-90 transition-opacity" style={{ background: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                      عرض المراجعة الكاملة
                    </Link>
                    {office.website && (
                      <a href={office.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors border border-gray-200 rounded px-3 py-2">
                        <ExternalLink size={14} />
                        الموقع
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/law-offices" className="border-2 border-primary-800 text-primary-800 px-6 py-2.5 rounded font-bold text-sm hover:bg-primary-800 hover:text-white transition-colors inline-block" style={{ fontFamily: 'Cairo, sans-serif' }}>
              عرض دليل مكاتب المحاماة الكامل
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-14" style={{ background: '#0F1E36' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>لماذا تثق بالمرشد المالي؟</h2>
            <p className="text-gray-400 max-w-xl mx-auto" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              نحن نوفر تحليلات مستقلة وموضوعية بدون تحيز لحماية المستثمر العربي
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'استقلالية تامة', desc: 'مراجعاتنا وتقييماتنا مستقلة وغير مدفوعة من الشركات' },
              { icon: TrendingUp, title: 'خبرة متخصصة', desc: 'فريقنا من المحللين الماليين والقانونيين المتخصصين في التداول' },
              { icon: BarChart2, title: 'بيانات محدّثة', desc: 'قاعدة بيانات محدّثة باستمرار للشركات الموثوقة والمحتالة' },
              { icon: Scale, title: 'مساعدة قانونية', desc: 'نربطك بأفضل المكاتب القانونية المتخصصة في استرداد الأموال' },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: '#263c74' }}>
                  <feature.icon size={24} style={{ color: '#C9A55A' }} />
                </div>
                <h3 className="font-bold text-white mb-2 text-base" style={{ fontFamily: 'Cairo, sans-serif' }}>{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
              الأسئلة الشائعة
            </h2>
            <p className="text-gray-500 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              إجابات على أكثر الأسئلة شيوعاً حول شركات الفوركس واسترداد الأموال
            </p>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <details key={index} className="bg-white rounded-lg border border-gray-100 group" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                  <h3 className="font-bold text-gray-800 text-sm pr-4" style={{ fontFamily: 'Cairo, sans-serif' }}>{item.q}</h3>
                  <ChevronDown size={16} className="text-primary-700 flex-shrink-0 transition-transform duration-200" style={{ color: '#1B2A4A' }} />
                </summary>
                <div className="px-5 pb-4">
                  <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="border-2 border-primary-800 text-primary-800 px-6 py-2.5 rounded font-bold text-sm hover:bg-primary-800 hover:text-white transition-colors inline-block" style={{ fontFamily: 'Cairo, sans-serif' }}>
              عرض جميع الأسئلة الشائعة
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

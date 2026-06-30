import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'خريطة الموقع - المرشد المالي',
  description: 'خريطة موقع المرشد المالي الكاملة لجميع الصفحات والأقسام.',
};

export default async function SitemapPage() {
  const [articlesRes, officesRes] = await Promise.all([
    supabase.from('articles').select('title, slug').eq('status', 'published').order('published_at', { ascending: false }),
    supabase.from('law_offices').select('name, slug'),
  ]);

  const articles = articlesRes.data || [];
  const offices = officesRes.data || [];

  const sections = [
    {
      title: 'الصفحات الرئيسية',
      links: [
        { label: 'الصفحة الرئيسية', href: '/' },
        { label: 'من نحن', href: '/about' },
        { label: 'اتصل بنا', href: '/contact' },
        { label: 'الأسئلة الشائعة', href: '/faq' },
        { label: 'المدونة', href: '/blog' },
      ],
    },
    {
      title: 'الأقسام',
      links: [
        { label: 'تحذيرات الفوركس', href: '/category/forex-warnings' },
        { label: 'كيفية التداول', href: '/category/trading-guide' },
        { label: 'مكاتب المحاماة', href: '/law-offices' },
        { label: 'استرداد الأموال', href: '/category/fund-recovery' },
        { label: 'المؤشرات المالية', href: '/category/indicators' },
        { label: 'الشركات المحذر منها', href: '/companies' },
      ],
    },
    {
      title: 'مكاتب المحاماة',
      links: offices.map((o: { name: string; slug: string }) => ({ label: o.name, href: `/law-offices/${o.slug}` })),
    },
    {
      title: 'صفحات قانونية',
      links: [
        { label: 'الشروط والأحكام', href: '/terms' },
        { label: 'سياسة الخصوصية', href: '/privacy' },
        { label: 'سياسة الإفصاح', href: '/disclosure' },
        { label: 'خريطة الموقع', href: '/sitemap' },
      ],
    },
    {
      title: 'المقالات',
      links: articles.map((a: { title: string; slug: string }) => ({ label: a.title, href: `/articles/${a.slug}` })),
    },
  ];

  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>خريطة الموقع</h1>
          <p className="text-gray-300" style={{ fontFamily: 'Tajawal, sans-serif' }}>جميع صفحات موقع المرشد المالي</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-bold mb-4 pb-2 border-b border-gray-200" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-600 hover:text-primary-800 transition-colors flex items-center gap-1.5" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

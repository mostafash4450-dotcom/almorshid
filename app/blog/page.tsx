import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ArticleCard from '@/components/articles/ArticleCard';
import type { Article, Category } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'المدونة - مقالات في التداول والفوركس وحماية الأموال',
  description: 'اقرأ أحدث المقالات المتخصصة في التداول والفوركس وحماية الأموال من الاحتيال على موقع المرشد المالي.',
};

export default async function BlogPage() {
  const [articlesRes, categoriesRes] = await Promise.all([
    supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: false }),
    supabase.from('categories').select('*'),
  ]);

  const articles = (articlesRes.data || []) as (Article & { categories: { name: string; slug: string } | null })[];
  const categories = (categoriesRes.data || []) as Category[];

  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <a href="/" className="hover:text-white transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-white">المدونة</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>المدونة</h1>
          <p className="text-gray-300" style={{ fontFamily: 'Tajawal, sans-serif' }}>مقالات متخصصة في التداول والفوركس وحماية الأموال من الاحتيال</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="bg-white border-b border-gray-100 sticky top-[var(--header-height,140px)] z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
            <Link href="/blog" className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-primary-800 text-white" style={{ fontFamily: 'Cairo, sans-serif' }}>
              الكل
            </Link>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`} className="whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-800 transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-xl font-bold text-gray-600 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>لا توجد مقالات بعد</h2>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

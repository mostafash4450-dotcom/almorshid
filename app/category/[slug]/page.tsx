import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ArticleCard from '@/components/articles/ArticleCard';
import type { Article, Category } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data } = await supabase.from('categories').select('slug');
  return (data || []).map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = await supabase.from('categories').select('*').eq('slug', params.slug).single();
  if (!data) return {};
  const cat = data as Category;
  return {
    title: `${cat.name} - مقالات ومحتوى متخصص | المرشد المالي`,
    description: cat.description || `اقرأ أحدث المقالات في قسم ${cat.name} على موقع المرشد المالي المرجع العربي الموثوق.`,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const [catRes, articlesRes] = await Promise.all([
    supabase.from('categories').select('*').eq('slug', params.slug).single(),
    supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: false }),
  ]);

  if (!catRes.data) notFound();
  const category = catRes.data as Category;

  const allArticles = (articlesRes.data || []) as (Article & { categories: { name: string; slug: string } | null })[];
  const articles = allArticles.filter((a) => a.categories?.slug === params.slug);

  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <a href="/" className="hover:text-white transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>{category.name}</h1>
          {category.description && (
            <p className="text-gray-300 max-w-2xl" style={{ fontFamily: 'Tajawal, sans-serif' }}>{category.description}</p>
          )}
          <div className="mt-4 text-sm" style={{ color: '#C9A55A', fontFamily: 'Cairo, sans-serif' }}>
            {articles.length} مقال
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-xl font-bold text-gray-600 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>لا توجد مقالات بعد</h2>
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>سيتم إضافة مقالات قريباً في هذا القسم</p>
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

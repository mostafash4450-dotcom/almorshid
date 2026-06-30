import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Eye, Tag, ArrowLeft, Share2, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getSupabaseAdmin, hasSupabaseServiceRoleKey } from '@/lib/supabase-admin';
import ArticleCard from '@/components/articles/ArticleCard';
import CommentForm from '@/components/articles/CommentForm';
import type { Article, PublicArticleComment } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function normalizeSlug(slug: string) {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = normalizeSlug(params.slug);
  const { data } = await supabase
    .from('articles')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (!data) return {};
  const article = data as Article;
  return {
    title: article.meta_title || `${article.title} | المرشد المالي`,
    description: article.meta_description || article.excerpt || '',
    openGraph: {
      title: article.meta_title || article.title,
      description: article.meta_description || article.excerpt || '',
      images: article.featured_image ? [{ url: article.featured_image }] : [],
      type: 'article',
      publishedTime: article.published_at || '',
    },
  };
}

function formatDate(dateString: string | null) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const slug = normalizeSlug(params.slug);
  const [articleRes, relatedRes] = await Promise.all([
    supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single(),
    supabase
      .from('articles')
      .select('*, categories(name, slug)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(4),
  ]);

  if (!articleRes.data) notFound();
  const article = articleRes.data as Article & { categories: { name: string; slug: string } | null };
  const related = ((relatedRes.data || []) as (Article & { categories: { name: string; slug: string } | null })[])
    .filter((a) => a.id !== article.id)
    .slice(0, 3);
  const commentsClient = hasSupabaseServiceRoleKey ? getSupabaseAdmin() : supabase;
  const commentsQuery = hasSupabaseServiceRoleKey
    ? commentsClient
        .from('article_comments')
        .select('id, article_id, name, comment, created_at')
        .eq('status', 'approved')
    : commentsClient
        .from('article_comments')
        .select('id, article_id, name, comment, created_at');
  const commentsRes = await commentsQuery
    .eq('article_id', article.id)
    .order('created_at', { ascending: false });
  const comments = (commentsRes.data || []) as PublicArticleComment[];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featured_image,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { '@type': 'Person', name: article.author_name },
    publisher: {
      '@type': 'Organization',
      name: 'المرشد المالي',
      logo: { '@type': 'ImageObject', url: '/image-removebg-preview.png' },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://almorshid-almali.com' },
      ...(article.categories ? [{ '@type': 'ListItem', position: 2, name: article.categories.name, item: `https://almorshid-almali.com/category/${article.categories.slug}` }] : []),
      { '@type': 'ListItem', position: article.categories ? 3 : 2, name: article.title, item: `https://almorshid-almali.com/articles/${article.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              <Link href="/" className="hover:text-primary-800 transition-colors">الرئيسية</Link>
              {article.categories && (
                <>
                  <span>/</span>
                  <Link href={`/category/${article.categories.slug}`} className="hover:text-primary-800 transition-colors">{article.categories.name}</Link>
                </>
              )}
              <span>/</span>
              <span className="text-gray-600 line-clamp-1">{article.title}</span>
            </nav>

            {/* Category tag */}
            {article.categories && (
              <Link href={`/category/${article.categories.slug}`} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-4" style={{ background: '#eef1f8', color: '#1B2A4A' }}>
                <Tag size={11} />
                {article.categories.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-snug" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center flex-wrap gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(article.published_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14} />
                {article.author_name}
              </span>
              {article.views > 0 && (
                <span className="flex items-center gap-1.5">
                  <Eye size={14} />
                  {article.views} مشاهدة
                </span>
              )}
              <button className="flex items-center gap-1.5 mr-auto hover:text-primary-700 transition-colors">
                <Share2 size={14} />
                مشاركة
              </button>
            </div>

            {/* Featured image */}
            {article.featured_image && (
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 bg-gray-100">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Excerpt */}
            {article.excerpt && (
              <div className="border-r-4 bg-blue-50 px-5 py-4 rounded-lg mb-8" style={{ borderColor: '#1B2A4A' }}>
                <p className="text-gray-700 leading-relaxed font-medium" style={{ fontFamily: 'Tajawal, sans-serif' }}>{article.excerpt}</p>
              </div>
            )}

            {/* Content */}
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>الوسوم:</span>
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author box */}
            <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: '#1B2A4A' }}>
                  {article.author_name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-800" style={{ fontFamily: 'Cairo, sans-serif' }}>{article.author_name}</div>
                  <div className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>فريق تحرير المرشد المالي</div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <section className="mt-8 border-t border-gray-100 pt-8">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-xl font-bold" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                  <MessageSquare size={20} />
                  التعليقات
                </h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
                  {comments.length}
                </span>
              </div>

              {comments.length > 0 ? (
                <div className="mb-8 space-y-3">
                  {comments.map((item) => (
                    <article key={item.id} className="rounded-lg border border-gray-100 bg-white p-4">
                      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div className="font-bold text-gray-800" style={{ fontFamily: 'Cairo, sans-serif' }}>
                          {item.name}
                        </div>
                        <time className="text-xs text-gray-400" dateTime={item.created_at} style={{ fontFamily: 'Tajawal, sans-serif' }}>
                          {formatDate(item.created_at)}
                        </time>
                      </div>
                      <p className="whitespace-pre-line text-sm leading-7 text-gray-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                        {item.comment}
                      </p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mb-8 rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  لا توجد تعليقات منشورة بعد.
                </div>
              )}

              <div className="rounded-xl border border-gray-100 bg-white p-5">
                <h3 className="text-base font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  أضف تعليقك
                </h3>
                <p className="mt-1 text-sm text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  لن يظهر بريدك الإلكتروني للزوار، والتعليق يحتاج موافقة الأدمن قبل النشر.
                </p>
                <CommentForm articleId={article.id} />
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-24">
              <div className="sidebar-widget">
                <h3 className="sidebar-widget-title">مقالات ذات صلة</h3>
                <div className="space-y-1">
                  {related.map((rel) => (
                    <ArticleCard key={rel.id} article={rel} variant="compact" />
                  ))}
                </div>
              </div>

              <div className="sidebar-widget">
                <h3 className="sidebar-widget-title">أقسام الموقع</h3>
                <div className="space-y-2">
                  {[
                    { label: 'تحذيرات الفوركس', href: '/category/forex-warnings' },
                    { label: 'كيفية التداول', href: '/category/trading-guide' },
                    { label: 'استرداد الأموال', href: '/category/fund-recovery' },
                    { label: 'مكاتب المحاماة', href: '/law-offices' },
                    { label: 'المؤشرات المالية', href: '/category/indicators' },
                  ].map((item) => (
                    <Link key={item.label} href={item.href} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-sm text-gray-600 hover:text-primary-800 transition-colors group">
                      <span style={{ fontFamily: 'Tajawal, sans-serif' }}>{item.label}</span>
                      <ArrowLeft size={13} className="text-gray-300 group-hover:text-primary-700 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl p-5 text-white" style={{ background: '#1B2A4A' }}>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>تعرضت للاحتيال؟</h3>
                <p className="text-gray-300 text-xs leading-relaxed mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  احصل على استشارة مجانية من محامين متخصصين في استرداد أموال الفوركس.
                </p>
                <Link href="/contact" className="w-full block text-center py-2.5 rounded font-bold text-sm hover:opacity-90 transition-opacity" style={{ background: '#C9A55A', color: '#0F1E36', fontFamily: 'Cairo, sans-serif' }}>
                  استشارة مجانية
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 py-10 mt-10">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>مقالات قد تهمك</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <ArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

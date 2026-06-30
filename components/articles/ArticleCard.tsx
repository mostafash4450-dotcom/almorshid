import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Eye } from 'lucide-react';
import type { Article } from '@/lib/supabase';

type Props = {
  article: Article & { categories?: { name: string; slug: string } | null };
  variant?: 'default' | 'featured' | 'compact' | 'horizontal';
};

function formatDate(dateString: string | null) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ArticleCard({ article, variant = 'default' }: Props) {
  const href = `/articles/${article.slug}`;
  const categoryHref = article.categories ? `/category/${article.categories.slug}` : '#';

  if (variant === 'horizontal') {
    return (
      <Link href={href} className="article-card flex gap-4 p-4 group">
        {article.featured_image && (
          <div className="relative w-28 h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {article.categories && (
            <span className="text-xs font-medium text-gold-600 mb-1 block" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {article.categories.name}
            </span>
          )}
          <h3 className="text-sm font-bold text-primary-900 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {article.title}
          </h3>
          <span className="text-xs text-gray-400">
            {formatDate(article.published_at)}
          </span>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 group">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary-800 transition-colors line-clamp-2 leading-snug" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {article.title}
          </h3>
          <span className="text-xs text-gray-400 mt-1 block">{formatDate(article.published_at)}</span>
        </div>
        {article.featured_image && (
          <div className="relative w-16 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
            <Image src={article.featured_image} alt={article.title} fill className="object-cover" />
          </div>
        )}
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={href} className="article-card group block overflow-hidden">
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          {article.featured_image ? (
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center">
              <span className="text-white/20 text-6xl font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                {article.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          {article.categories && (
            <span className="absolute top-3 right-3 bg-gold-500 text-primary-900 text-xs font-bold px-2.5 py-1 rounded" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {article.categories.name}
            </span>
          )}
          <div className="absolute bottom-4 right-4 left-4">
            <h2 className="text-white text-xl font-bold leading-snug group-hover:text-gold-200 transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {article.title}
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-white/70 text-xs">
                <Calendar size={12} />
                {formatDate(article.published_at)}
              </span>
              <span className="flex items-center gap-1 text-white/70 text-xs">
                <User size={12} />
                {article.author_name}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="article-card group block overflow-hidden">
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        {article.featured_image ? (
          <Image
            src={article.featured_image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center">
            <span className="text-white/20 text-5xl font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>
              {article.title.charAt(0)}
            </span>
          </div>
        )}
        {article.categories && (
          <span className="absolute top-2.5 right-2.5 bg-gold-500 text-primary-900 text-xs font-bold px-2 py-0.5 rounded" style={{ fontFamily: 'Cairo, sans-serif' }}>
            {article.categories.name}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-primary-900 leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            {article.excerpt}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-gray-100 pt-3">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(article.published_at)}
          </span>
          <span className="flex items-center gap-1">
            <User size={12} />
            {article.author_name}
          </span>
          {article.views > 0 && (
            <span className="flex items-center gap-1 mr-auto">
              <Eye size={12} />
              {article.views}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

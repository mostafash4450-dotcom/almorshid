import Link from 'next/link';
import { Plus, Edit, Eye, Trash2, FileText } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Article } from '@/lib/supabase';

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function ArticlesListPage() {
  const { data, error } = await supabase
    .from('articles')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  const articles = (data || []) as (Article & { categories: { name: string } | null })[];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>إدارة المقالات</h1>
          <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            {articles.length} مقال
          </p>
        </div>
        <Link href="/admin/articles/new" className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white hover:opacity-90 transition-opacity" style={{ background: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
          <Plus size={16} />
          مقال جديد
        </Link>
      </div>

      {error?.code === 'PGRST205' && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
          جداول المقالات غير موجودة في Supabase بعد. شغل ملف
          {' '}
          <code className="rounded bg-red-100 px-1.5 py-0.5 text-xs">supabase/admin_setup.sql</code>
          {' '}
          مرة واحدة من Supabase SQL Editor ثم أعد فتح الصفحة.
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {articles.length === 0 ? (
          <div className="py-20 text-center">
            <FileText size={40} className="text-gray-200 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-500 mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>لا توجد مقالات بعد</h3>
            <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>ابدأ بنشر مقالك الأول</p>
            <Link href="/admin/articles/new" className="inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-bold text-white" style={{ background: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
              <Plus size={15} />
              مقال جديد
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase" style={{ fontFamily: 'Cairo, sans-serif' }}>العنوان</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden sm:table-cell" style={{ fontFamily: 'Cairo, sans-serif' }}>القسم</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase" style={{ fontFamily: 'Cairo, sans-serif' }}>الحالة</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden md:table-cell" style={{ fontFamily: 'Cairo, sans-serif' }}>تاريخ النشر</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase hidden lg:table-cell" style={{ fontFamily: 'Cairo, sans-serif' }}>المشاهدات</th>
                  <th className="text-right px-4 py-3 text-xs font-bold text-gray-500 uppercase" style={{ fontFamily: 'Cairo, sans-serif' }}>إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-sm text-gray-800 line-clamp-1" style={{ fontFamily: 'Cairo, sans-serif' }}>{article.title}</div>
                      {article.excerpt && (
                        <div className="text-xs text-gray-400 mt-0.5 line-clamp-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>{article.excerpt}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      {article.categories && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                          {article.categories.name}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {article.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>{formatDate(article.published_at)}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Eye size={12} />
                        {article.views}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/articles/${article.id}`} className="p-1.5 text-gray-400 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors">
                          <Edit size={14} />
                        </Link>
                        <Link href={`/articles/${article.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                          <Eye size={14} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

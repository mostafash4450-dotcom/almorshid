import Link from 'next/link';
import { AlertTriangle, MessageSquare } from 'lucide-react';
import CommentModerationActions from '@/components/admin/CommentModerationActions';
import { getSupabaseAdmin, hasSupabaseServiceRoleKey } from '@/lib/supabase-admin';
import type { ArticleComment } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type CommentWithArticle = ArticleComment & {
  articles: { title: string; slug: string } | null;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const statusLabel = {
  pending: 'بانتظار المراجعة',
  approved: 'موافق عليه',
  rejected: 'مرفوض',
};

const statusClass = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

function SetupNotice() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800" style={{ fontFamily: 'Tajawal, sans-serif' }}>
      <div className="mb-1 flex items-center gap-2 font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>
        <AlertTriangle size={16} />
        يلزم إعداد مفتاح الأدمن
      </div>
      أضف <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs">SUPABASE_SERVICE_ROLE_KEY</code> إلى ملف البيئة حتى تتمكن لوحة الأدمن من قراءة التعليقات ومراجعتها بدون فتح صلاحيات عامة في قاعدة البيانات.
    </div>
  );
}

export default async function AdminCommentsPage() {
  let comments: CommentWithArticle[] = [];
  let errorCode: string | undefined;

  if (hasSupabaseServiceRoleKey) {
    const { data, error } = await getSupabaseAdmin()
      .from('article_comments')
      .select('*, articles(title, slug)')
      .order('created_at', { ascending: false });

    comments = (data || []) as CommentWithArticle[];
    errorCode = error?.code;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>
          مراجعة التعليقات
        </h1>
        <p className="mt-0.5 text-sm text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>
          وافق على التعليقات المناسبة أو ارفضها قبل ظهورها للزوار.
        </p>
      </div>

      {!hasSupabaseServiceRoleKey && (
        <div className="mb-5">
          <SetupNotice />
        </div>
      )}

      {errorCode === 'PGRST205' && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
          جدول التعليقات غير موجود بعد. شغل ملف{' '}
          <code className="rounded bg-red-100 px-1.5 py-0.5 text-xs">supabase/comments_setup.sql</code>
          {' '}من Supabase SQL Editor.
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {comments.length === 0 ? (
          <div className="py-20 text-center">
            <MessageSquare size={40} className="mx-auto mb-3 text-gray-200" />
            <h3 className="mb-1 text-base font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>
              لا توجد تعليقات للمراجعة
            </h3>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {comments.map((comment) => (
              <div key={comment.id} className="p-5">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      {comment.name}
                    </div>
                    <div className="text-xs text-gray-500" dir="ltr">
                      {comment.email}
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[comment.status]}`}>
                    {statusLabel[comment.status]}
                  </span>
                </div>

                <p className="mb-3 whitespace-pre-line text-sm leading-7 text-gray-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  {comment.comment}
                </p>

                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span>{formatDate(comment.created_at)}</span>
                  {comment.articles && (
                    <>
                      <span>•</span>
                      <Link href={`/articles/${comment.articles.slug}`} target="_blank" className="text-primary-700 hover:underline">
                        {comment.articles.title}
                      </Link>
                    </>
                  )}
                </div>

                <CommentModerationActions commentId={comment.id} status={comment.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

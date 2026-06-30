import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ArticleEditor from '@/components/admin/ArticleEditor';
import type { Article } from '@/lib/supabase';

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const [articleRes, categoriesRes] = await Promise.all([
    supabase.from('articles').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('*'),
  ]);

  if (!articleRes.data) notFound();

  return <ArticleEditor article={articleRes.data as Article} categories={categoriesRes.data || []} />;
}

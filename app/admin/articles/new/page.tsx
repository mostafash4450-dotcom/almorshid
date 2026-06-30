import { supabase } from '@/lib/supabase';
import ArticleEditor from '@/components/admin/ArticleEditor';

export default async function NewArticlePage() {
  const { data: categories, error } = await supabase.from('categories').select('*');

  return (
    <ArticleEditor
      categories={categories || []}
      databaseError={error?.code === 'PGRST205' ? error.message : undefined}
    />
  );
}

-- Run this once in Supabase Dashboard > SQL Editor for the project used by .env.
-- It creates the tables needed by the admin article editor and default categories.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[],
  views INTEGER DEFAULT 0,
  author_name TEXT DEFAULT 'فريق التحرير',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_categories" ON public.categories;
DROP POLICY IF EXISTS "insert_categories" ON public.categories;
DROP POLICY IF EXISTS "update_categories" ON public.categories;
DROP POLICY IF EXISTS "delete_categories" ON public.categories;

DROP POLICY IF EXISTS "select_articles" ON public.articles;
DROP POLICY IF EXISTS "insert_articles" ON public.articles;
DROP POLICY IF EXISTS "update_articles" ON public.articles;
DROP POLICY IF EXISTS "delete_articles" ON public.articles;

CREATE POLICY "select_categories" ON public.categories
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "select_articles" ON public.articles
  FOR SELECT TO anon, authenticated
  USING (true);

-- These write policies keep the current editor working with the public anon key.
-- For maximum database-level security, move admin writes to a server route with a
-- Supabase service-role key, then remove these anon write policies.
CREATE POLICY "insert_articles" ON public.articles
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "update_articles" ON public.articles
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "delete_articles" ON public.articles
  FOR DELETE TO anon, authenticated
  USING (true);

INSERT INTO public.categories (name, slug, description, icon, color) VALUES
  ('تحذيرات الفوركس', 'forex-warnings', 'تحذيرات من شركات التداول المشبوهة والنصابة', 'alert-triangle', '#ef4444'),
  ('كيفية التداول', 'trading-guide', 'مقالات تعليمية للمبتدئين والمحترفين في التداول', 'trending-up', '#2563eb'),
  ('مكاتب المحاماة', 'law-offices', 'مراجعة مكاتب المحاماة الموثوقة لاسترداد الأموال', 'scale', '#C9A55A'),
  ('استرداد الأموال', 'fund-recovery', 'دليل استرداد الأموال من شركات الفوركس المحتالة', 'shield', '#10b981'),
  ('المؤشرات المالية', 'indicators', 'شرح المؤشرات الفنية وأدوات التحليل', 'bar-chart-2', '#7c3aed')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon,
  color = EXCLUDED.color;

NOTIFY pgrst, 'reload schema';

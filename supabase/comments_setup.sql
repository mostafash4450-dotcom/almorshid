-- Run this once in Supabase Dashboard > SQL Editor.
-- It adds moderated comments for articles without exposing commenter emails publicly.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.article_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 80),
  email TEXT NOT NULL CHECK (char_length(trim(email)) <= 160),
  comment TEXT NOT NULL CHECK (char_length(trim(comment)) BETWEEN 3 AND 1200),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS article_comments_article_status_idx
  ON public.article_comments(article_id, status, created_at DESC);

DROP VIEW IF EXISTS public.public_article_comments;

ALTER TABLE public.article_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_approved_article_comments" ON public.article_comments;
DROP POLICY IF EXISTS "insert_pending_article_comments" ON public.article_comments;
DROP POLICY IF EXISTS "admin_update_article_comments" ON public.article_comments;

REVOKE ALL ON TABLE public.article_comments FROM anon, authenticated;

GRANT INSERT (article_id, name, email, comment, status) ON public.article_comments TO anon, authenticated;
GRANT SELECT (id, article_id, name, comment, created_at) ON public.article_comments TO anon, authenticated;

CREATE POLICY "select_approved_article_comments" ON public.article_comments
  FOR SELECT TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "insert_pending_article_comments" ON public.article_comments
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND EXISTS (
      SELECT 1
      FROM public.articles
      WHERE articles.id = article_comments.article_id
        AND articles.status = 'published'
    )
  );

-- Admin reads/updates are done from protected Next.js admin routes with
-- SUPABASE_SERVICE_ROLE_KEY. Public SELECT is limited to approved rows and
-- safe columns only; email is not granted to anon/authenticated roles.

NOTIFY pgrst, 'reload schema';

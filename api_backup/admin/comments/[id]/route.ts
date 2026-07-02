import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth';
import { getSupabaseAdmin, hasSupabaseServiceRoleKey } from '@/lib/supabase-admin';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

function isCommentStatus(value: unknown): value is 'approved' | 'rejected' {
  return value === 'approved' || value === 'rejected';
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasSupabaseServiceRoleKey) {
    return NextResponse.json({ error: 'Admin database key is not configured' }, { status: 500 });
  }

  const parsedParams = paramsSchema.safeParse(params);
  if (!parsedParams.success) {
    return NextResponse.json({ error: 'Invalid comment id' }, { status: 400 });
  }

  const body = await request.json().catch(() => null);

  if (!isCommentStatus(body?.status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const { data: comment } = await supabaseAdmin
    .from('article_comments')
    .select('articles(slug)')
    .eq('id', parsedParams.data.id)
    .single();
  const { error } =
    body.status === 'rejected'
      ? await supabaseAdmin.from('article_comments').delete().eq('id', parsedParams.data.id)
      : await supabaseAdmin
          .from('article_comments')
          .update({
            status: 'approved',
            reviewed_at: new Date().toISOString(),
          })
          .eq('id', parsedParams.data.id);

  if (error) {
    return NextResponse.json({ error: 'Could not update comment' }, { status: 500 });
  }

  const commentWithArticle = comment as unknown as {
    articles?: { slug?: string } | Array<{ slug?: string }> | null;
  } | null;
  const articles = commentWithArticle?.articles;
  const slug = Array.isArray(articles)
    ? articles[0]?.slug
    : articles?.slug;
  if (slug) {
    revalidatePath(`/articles/${slug}`);
  }
  revalidatePath('/admin/comments');

  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const commentSchema = z.object({
  articleId: z.string().uuid(),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  comment: z.string().trim().min(3).max(1200),
  website: z.string().max(0).optional().or(z.literal('')),
});

export async function POST(request: NextRequest) {
  const parsed = commentSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'يرجى تعبئة الاسم والبريد والتعليق بشكل صحيح' },
      { status: 400, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const { articleId, name, email, comment } = parsed.data;
  const { error } = await supabase.from('article_comments').insert([
    {
      article_id: articleId,
      name,
      email: email.toLowerCase(),
      comment,
      status: 'pending',
    },
  ]);

  if (error) {
    return NextResponse.json(
      { error: 'تعذر إرسال التعليق الآن' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}

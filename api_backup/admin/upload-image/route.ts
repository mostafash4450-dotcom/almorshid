import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { join, relative, sep } from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth';

export const runtime = 'nodejs';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
]);

function cleanSegment(value: FormDataEntryValue | null, fallback: string) {
  const text = typeof value === 'string' ? value : '';
  const cleaned = text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^؀-ۿa-z0-9_-]/gi, '')
    .replace(/-+/g, '-')
    .slice(0, 80);

  return cleaned || fallback;
}

function publicImagePath(...segments: string[]) {
  return '/' + ['uploads', 'articles', ...segments].map(encodeURIComponent).join('/');
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'لم يتم إرسال صورة' }, { status: 400 });
  }

  const extension = ALLOWED_IMAGE_TYPES.get(file.type);
  if (!extension) {
    return NextResponse.json({ error: 'نوع الصورة غير مدعوم' }, { status: 400 });
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' }, { status: 400 });
  }

  const kind = cleanSegment(formData.get('kind'), 'content') === 'featured' ? 'featured' : 'content';
  const categorySlug = cleanSegment(formData.get('categorySlug'), 'uncategorized');
  const articleSlug = cleanSegment(formData.get('articleSlug'), 'draft');
  const uploadRoot = join(process.cwd(), 'public', 'uploads', 'articles');
  const targetDir = join(uploadRoot, categorySlug, articleSlug, kind);
  const relativeTarget = relative(uploadRoot, targetDir);

  if (relativeTarget.startsWith('..') || relativeTarget.includes('..' + sep)) {
    return NextResponse.json({ error: 'مسار الصورة غير صالح' }, { status: 400 });
  }

  await mkdir(targetDir, { recursive: true });

  const fileName = Date.now() + '-' + randomUUID() + '.' + extension;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(join(targetDir, fileName), bytes);

  return NextResponse.json(
    {
      url: publicImagePath(categorySlug, articleSlug, kind, fileName),
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

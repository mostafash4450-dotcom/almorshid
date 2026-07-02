import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
  isValidAdminCredentials,
} from '@/lib/admin-auth';

function safeAdminRedirect(value: FormDataEntryValue | null) {
  const nextPath = typeof value === 'string' && value.startsWith('/admin') ? value : '/admin';

  return nextPath === '/admin/login' ? '/admin' : nextPath;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '');
  const password = String(formData.get('password') || '');
  const nextPath = safeAdminRedirect(formData.get('next'));

  if (!isValidAdminCredentials(email, password)) {
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('error', '1');
    loginUrl.searchParams.set('next', nextPath);

    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(nextPath, request.url), { status: 303 });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: await createAdminSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}

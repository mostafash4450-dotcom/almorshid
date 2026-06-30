import { LockKeyhole } from 'lucide-react';

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string; next?: string };
}) {
  const nextPath = searchParams?.next?.startsWith('/admin') ? searchParams.next : '/admin';
  const hasError = searchParams?.error === '1';

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4" dir="rtl">
      <section className="w-full max-w-sm bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded bg-primary-900 text-white flex items-center justify-center">
            <LockKeyhole size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>
              دخول الأدمن
            </h1>
            <p className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              هذه الصفحة محمية للمدير فقط
            </p>
          </div>
        </div>

        {hasError && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            بيانات الدخول غير صحيحة
          </div>
        )}

        <form action="/api/admin/login" method="post" className="space-y-4">
          <input type="hidden" name="next" value={nextPath} />

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-gray-700" style={{ fontFamily: 'Cairo, sans-serif' }}>
              البريد الإلكتروني
            </span>
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-left focus:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-100"
              dir="ltr"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold text-gray-700" style={{ fontFamily: 'Cairo, sans-serif' }}>
              كلمة المرور
            </span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-left focus:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-100"
              dir="ltr"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded bg-primary-900 px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: 'Cairo, sans-serif' }}
          >
            دخول
          </button>
        </form>
      </section>
    </main>
  );
}

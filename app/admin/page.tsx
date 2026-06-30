import Link from 'next/link';
import { FileText, AlertTriangle, MessageSquare, Scale, Plus, Eye, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function AdminDashboard() {
  const [articlesRes, warnedRes, contactsRes, officesRes] = await Promise.all([
    supabase.from('articles').select('id, title, status, published_at, views').order('created_at', { ascending: false }).limit(5),
    supabase.from('warned_companies').select('id', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('id, name, email, status, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('law_offices').select('id', { count: 'exact', head: true }),
  ]);

  const recentArticles = articlesRes.data || [];
  const recentContacts = contactsRes.data || [];

  const stats = [
    { label: 'المقالات', value: recentArticles.length, icon: FileText, href: '/admin/articles', color: '#1B2A4A' },
    { label: 'الشركات المحذر منها', value: warnedRes.count || 0, icon: AlertTriangle, href: '/admin/companies', color: '#ef4444' },
    { label: 'مكاتب المحاماة', value: officesRes.count || 0, icon: Scale, href: '/admin/law-offices', color: '#C9A55A' },
    { label: 'رسائل التواصل', value: recentContacts.length, icon: MessageSquare, href: '/admin/contacts', color: '#10b981' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>لوحة التحكم</h1>
        <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>مرحباً بك في نظام إدارة المرشد المالي</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}18` }}>
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'Cairo, sans-serif' }}>{stat.value}</div>
            <div className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent articles */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>أحدث المقالات</h2>
            <Link href="/admin/articles/new" className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded text-white" style={{ background: '#1B2A4A' }}>
              <Plus size={13} />
              مقال جديد
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentArticles.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <FileText size={32} className="text-gray-200 mx-auto mb-2" />
                <p className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal, sans-serif' }}>لا توجد مقالات بعد</p>
                <Link href="/admin/articles/new" className="text-xs text-primary-700 hover:underline mt-1 block" style={{ fontFamily: 'Cairo, sans-serif' }}>أنشئ مقالك الأول</Link>
              </div>
            ) : (
              recentArticles.map((article: any) => (
                <div key={article.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate" style={{ fontFamily: 'Cairo, sans-serif' }}>{article.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${article.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {article.status === 'published' ? 'منشور' : 'مسودة'}
                      </span>
                      {article.views > 0 && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Eye size={11} />
                          {article.views}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href={`/admin/articles/${article.id}`} className="text-xs text-gray-400 hover:text-primary-700 transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    تعديل
                  </Link>
                </div>
              ))
            )}
          </div>
          <div className="px-5 py-3 border-t border-gray-50">
            <Link href="/admin/articles" className="text-xs text-primary-700 hover:text-primary-900 font-medium" style={{ fontFamily: 'Cairo, sans-serif' }}>
              عرض جميع المقالات ←
            </Link>
          </div>
        </div>

        {/* Recent contacts */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>أحدث رسائل التواصل</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentContacts.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <MessageSquare size={32} className="text-gray-200 mx-auto mb-2" />
                <p className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal, sans-serif' }}>لا توجد رسائل بعد</p>
              </div>
            ) : (
              recentContacts.map((contact: any) => (
                <div key={contact.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate" style={{ fontFamily: 'Cairo, sans-serif' }}>{contact.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5" style={{ fontFamily: 'Tajawal, sans-serif' }}>{contact.email}</p>
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0 ${contact.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                    {contact.status === 'new' ? 'جديد' : contact.status === 'in_progress' ? 'قيد المعالجة' : 'مغلق'}
                  </span>
                </div>
              ))
            )}
          </div>
          <div className="px-5 py-3 border-t border-gray-50">
            <Link href="/admin/contacts" className="text-xs text-primary-700 hover:text-primary-900 font-medium" style={{ fontFamily: 'Cairo, sans-serif' }}>
              عرض جميع الرسائل ←
            </Link>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 bg-white rounded-xl border border-gray-100 p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <h2 className="font-bold text-gray-800 text-sm mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>إجراءات سريعة</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'نشر مقال جديد', href: '/admin/articles/new', icon: Plus },
            { label: 'عرض المقالات', href: '/admin/articles', icon: FileText },
            { label: 'الشركات المحذر منها', href: '/admin/companies', icon: AlertTriangle },
            { label: 'رسائل التواصل', href: '/admin/contacts', icon: MessageSquare },
            { label: 'عرض الموقع', href: '/', icon: Eye },
          ].map((action) => (
            <Link key={action.label} href={action.href} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-primary-300 hover:text-primary-800 transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
              <action.icon size={15} />
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

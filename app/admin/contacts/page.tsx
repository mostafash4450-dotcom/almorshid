import { supabase } from '@/lib/supabase';
import type { ContactSubmission } from '@/lib/supabase';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const statusConfig = {
  new: { label: 'جديد', cls: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'قيد المعالجة', cls: 'bg-yellow-100 text-yellow-700' },
  resolved: { label: 'تم الحل', cls: 'bg-green-100 text-green-700' },
  closed: { label: 'مغلق', cls: 'bg-gray-100 text-gray-500' },
};

export default async function ContactsPage() {
  const { data } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  const contacts = (data || []) as ContactSubmission[];
  const newCount = contacts.filter((c) => c.status === 'new').length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>رسائل التواصل</h1>
          <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            {contacts.length} رسالة ({newCount} جديد)
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        {contacts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>لا توجد رسائل بعد</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['الاسم', 'البريد الإلكتروني', 'شركة التداول', 'المبلغ', 'الحالة', 'التاريخ'].map((h) => (
                    <th key={h} className="text-right px-4 py-3 text-xs font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {contacts.map((contact) => {
                  const sc = statusConfig[contact.status];
                  return (
                    <tr key={contact.id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3.5">
                        <div className="font-medium text-sm text-gray-800" style={{ fontFamily: 'Cairo, sans-serif' }}>{contact.name}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline" dir="ltr">{contact.email}</a>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-gray-600" style={{ fontFamily: 'Tajawal, sans-serif' }}>{contact.company_name || '—'}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-gray-600">{contact.amount || '—'}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${sc.cls}`}>{sc.label}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-gray-400" style={{ fontFamily: 'Tajawal, sans-serif' }}>{formatDate(contact.created_at)}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details panel for messages */}
      {contacts.filter(c => c.problem_description).length > 0 && (
        <div className="mt-6">
          <h2 className="text-base font-bold text-gray-800 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>تفاصيل الرسائل</h2>
          <div className="space-y-4">
            {contacts.filter(c => c.problem_description).slice(0, 5).map((contact) => (
              <div key={contact.id} className="bg-white rounded-xl border border-gray-100 p-5" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>{contact.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5" dir="ltr">{contact.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(contact.created_at)}</span>
                </div>
                {contact.company_name && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>شركة التداول:</span>
                    <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded">{contact.company_name}</span>
                    {contact.amount && <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded">{contact.amount}</span>}
                  </div>
                )}
                <p className="text-sm text-gray-700 leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>{contact.problem_description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

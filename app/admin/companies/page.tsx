import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { WarnedCompany } from '@/lib/supabase';

const warningLabels = {
  critical: { label: 'خطر شديد', cls: 'bg-red-100 text-red-700' },
  high: { label: 'تحذير عالي', cls: 'bg-orange-100 text-orange-700' },
  medium: { label: 'تحذير متوسط', cls: 'bg-yellow-100 text-yellow-700' },
  low: { label: 'تحذير منخفض', cls: 'bg-blue-100 text-blue-700' },
};

export default async function CompaniesAdminPage() {
  const { data } = await supabase.from('warned_companies').select('*').order('created_at', { ascending: false });
  const companies = (data || []) as WarnedCompany[];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>الشركات المحذر منها</h1>
          <p className="text-gray-500 text-sm mt-0.5" style={{ fontFamily: 'Tajawal, sans-serif' }}>{companies.length} شركة</p>
        </div>
        <Link href="/companies" target="_blank" className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 px-4 py-2 rounded transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
          عرض الصفحة العامة
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['اسم الشركة', 'الدولة', 'مستوى التحذير', 'نوع الاحتيال', 'الحالة'].map((h) => (
                  <th key={h} className="text-right px-4 py-3 text-xs font-bold text-gray-500" style={{ fontFamily: 'Cairo, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {companies.map((company) => {
                const wc = warningLabels[company.warning_level];
                return (
                  <tr key={company.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-sm text-gray-800" style={{ fontFamily: 'Cairo, sans-serif' }}>{company.name}</div>
                      {company.description && (
                        <div className="text-xs text-gray-400 mt-0.5 line-clamp-1" style={{ fontFamily: 'Tajawal, sans-serif' }}>{company.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500">{company.country || '—'}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${wc.cls}`}>{wc.label}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500">{company.scam_type || '—'}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${company.status === 'active' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                        {company.status === 'active' ? 'نشط' : 'غير نشط'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
        <div className="flex items-center gap-2 text-yellow-700 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>
          <AlertTriangle size={15} />
          <span>لإضافة شركة جديدة، تواصل مع المطور لإضافة واجهة الإدارة الكاملة.</span>
        </div>
      </div>
    </div>
  );
}

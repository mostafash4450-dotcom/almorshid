import Link from 'next/link';
import { Star, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { LawOffice } from '@/lib/supabase';

export default async function LawOfficesAdminPage() {
  const { data } = await supabase.from('law_offices').select('*').order('rating', { ascending: false });
  const offices = (data || []) as LawOffice[];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>مكاتب المحاماة</h1>
          <p className="text-gray-500 text-sm mt-0.5">{offices.length} مكاتب</p>
        </div>
        <Link href="/law-offices" target="_blank" className="text-sm text-gray-500 hover:text-gray-800 border border-gray-200 px-4 py-2 rounded transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
          عرض الصفحة العامة
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {offices.map((office) => (
          <div key={office.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800" style={{ fontFamily: 'Cairo, sans-serif' }}>{office.name}</h3>
                {office.badge && <span className="text-xs bg-yellow-100 text-yellow-700 font-medium px-2 py-0.5 rounded mt-1 inline-block">{office.badge}</span>}
              </div>
              <div className="flex items-center gap-1">
                <Star size={15} className="fill-current" style={{ color: '#C9A55A' }} />
                <span className="text-sm font-bold text-gray-700">{office.rating}</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-gray-600 mb-4 line-clamp-2" style={{ fontFamily: 'Tajawal, sans-serif' }}>{office.description}</p>
              <div className="flex items-center gap-3">
                <Link href={`/law-offices/${office.slug}`} target="_blank" className="text-xs font-medium text-primary-700 hover:text-primary-900 border border-primary-200 px-3 py-1.5 rounded transition-colors" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  عرض الصفحة
                </Link>
                {office.website && (
                  <a href={office.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors">
                    <ExternalLink size={12} />
                    الموقع الرسمي
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

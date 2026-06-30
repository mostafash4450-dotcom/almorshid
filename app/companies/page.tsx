import type { Metadata } from 'next';
import { AlertTriangle, Shield, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { WarnedCompany } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'قائمة شركات الفوركس المحذر منها',
  description: 'قائمة شاملة ومحدّثة بجميع شركات التداول والفوركس المحتالة والمشبوهة التي يجب تجنبها. تحقق قبل الإيداع.',
};

const warningConfig = {
  critical: { label: 'خطر شديد', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  high: { label: 'تحذير عالي', bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  medium: { label: 'تحذير متوسط', bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  low: { label: 'تحذير منخفض', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
};

export default async function CompaniesPage() {
  const { data: companies } = await supabase
    .from('warned_companies')
    .select('*')
    .eq('status', 'active')
    .order('warning_level', { ascending: false });

  const allCompanies = (companies || []) as WarnedCompany[];

  const critical = allCompanies.filter((c) => c.warning_level === 'critical');
  const high = allCompanies.filter((c) => c.warning_level === 'high');
  const others = allCompanies.filter((c) => c.warning_level !== 'critical' && c.warning_level !== 'high');

  return (
    <>
      {/* Page header */}
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <a href="/" className="hover:text-white transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-white">الشركات المحذر منها</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>
            قائمة شركات الفوركس المحذر منها
          </h1>
          <p className="text-gray-300 max-w-2xl" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            قائمة شاملة ومحدّثة بجميع شركات التداول والفوركس التي ثبت احتيالها أو تصرفها بطريقة مشبوهة. تحقق دائماً قبل الإيداع.
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400" style={{ fontFamily: 'Cairo, sans-serif' }}>{critical.length}</div>
              <div className="text-xs text-gray-400">خطر شديد</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400" style={{ fontFamily: 'Cairo, sans-serif' }}>{high.length}</div>
              <div className="text-xs text-gray-400">تحذير عالي</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#C9A55A', fontFamily: 'Cairo, sans-serif' }}>{allCompanies.length}</div>
              <div className="text-xs text-gray-400">إجمالي الشركات</div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning notice */}
      <div className="bg-red-50 border-b border-red-100 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <strong>تحذير هام:</strong> إذا أودعت أموالاً في إحدى هذه الشركات، تواصل فوراً مع بنكك وتواصل معنا للحصول على مساعدة قانونية.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Critical */}
        {critical.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-red-600 mb-5 flex items-center gap-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
              <AlertTriangle size={20} />
              شركات خطر شديد ({critical.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {critical.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        )}

        {/* High */}
        {high.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-orange-600 mb-5 flex items-center gap-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
              <AlertTriangle size={20} />
              شركات تحذير عالي ({high.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {high.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        )}

        {/* Others */}
        {others.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-700 mb-5 flex items-center gap-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
              <Shield size={20} />
              شركات مشبوهة أخرى ({others.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        )}

        {/* Protect yourself */}
        <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 mt-10">
          <h3 className="text-lg font-bold text-primary-900 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
            كيف تحمي نفسك من شركات الفوركس المحتالة؟
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'تحقق دائماً من ترخيص الشركة عبر الموقع الرسمي للهيئة التنظيمية',
              'لا تودع أموالاً بضغط من مندوبي المبيعات أو بسبب "عروض محدودة"',
              'اقرأ تقييمات المستخدمين من مصادر مستقلة قبل الإيداع',
              'تجنب الشركات التي تعد بأرباح مضمونة أو عوائد غير واقعية',
              'تأكد من سهولة سحب الأموال قبل الإيداع الكبير',
              'إذا لاحظت صعوبة في السحب، تواصل مع بنكك فوراً',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-primary-800 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700" style={{ fontFamily: 'Tajawal, sans-serif' }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CompanyCard({ company }: { company: WarnedCompany }) {
  const config = warningConfig[company.warning_level];
  return (
    <div className={`rounded-lg p-4 border ${config.border} ${config.bg}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Cairo, sans-serif' }}>{company.name}</h3>
          {company.country && <p className="text-xs text-gray-500 mt-0.5">{company.country}</p>}
        </div>
        <span className={`flex-shrink-0 text-xs font-bold px-2 py-1 rounded ${config.badge}`}>
          {config.label}
        </span>
      </div>
      {company.description && (
        <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
          {company.description}
        </p>
      )}
      <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-200 pt-2 mt-2">
        {company.scam_type && (
          <span className="flex items-center gap-1">
            <AlertTriangle size={11} className="text-gray-400" />
            {company.scam_type}
          </span>
        )}
      </div>
    </div>
  );
}

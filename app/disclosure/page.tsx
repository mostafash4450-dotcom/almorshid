import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'سياسة الإفصاح - المرشد المالي',
  description: 'سياسة الإفصاح والشفافية الخاصة بموقع المرشد المالي.',
};

export default function DisclosurePage() {
  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>سياسة الإفصاح</h1>
          <p className="text-gray-300 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>الشفافية والإفصاح الكامل لزوارنا الكرام</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Important notice */}
        <div className="flex items-start gap-4 bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">
          <AlertTriangle size={22} className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-yellow-800 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>إشعار هام</h2>
            <p className="text-yellow-700 text-sm leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              يرجى قراءة هذه الصفحة بعناية لفهم طبيعة المحتوى المقدم على موقعنا وأي علاقات تجارية قد تؤثر على محتواه.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <DisclosureSection title="1. طبيعة الموقع والمحتوى">
              موقع المرشد المالي هو موقع إعلامي تعليمي متخصص في مجال التداول والاستثمار المالي. المحتوى المقدم:
              <ul className="list-disc list-inside space-y-1 mr-4 mt-2 text-gray-600 text-sm">
                <li>لأغراض تعليمية وإعلامية فقط</li>
                <li>لا يُعدّ مشورة مالية أو استثمارية أو قانونية</li>
                <li>لا يُشكّل توصية بشراء أو بيع أي أصل مالي</li>
              </ul>
            </DisclosureSection>

            <DisclosureSection title="2. العلاقات التجارية والإفصاح">
              <p className="text-gray-700 text-sm mb-3">من الشفافية الكاملة مع قرائنا، نُفصح عن الآتي:</p>
              <ul className="list-disc list-inside space-y-2 mr-4 text-gray-600 text-sm">
                <li>قد يتضمن الموقع روابط تابعة (Affiliate Links) لبعض الخدمات والمكاتب القانونية</li>
                <li>قد نتلقى عمولة عند إحالتك لبعض الخدمات، دون أي تكلفة إضافية عليك</li>
                <li>هذه العلاقات التجارية لا تؤثر على استقلالية تقييماتنا أو تحيزنا</li>
                <li>تقييماتنا لمكاتب المحاماة والشركات تستند إلى معايير موضوعية مستقلة</li>
              </ul>
            </DisclosureSection>

            <DisclosureSection title="3. مصادر المعلومات">
              نستند في معلوماتنا إلى:
              <ul className="list-disc list-inside space-y-1 mr-4 mt-2 text-gray-600 text-sm">
                <li>الوثائق والتقارير الرسمية للهيئات التنظيمية</li>
                <li>تجارب موثقة من مستخدمين حقيقيين</li>
                <li>تحليلات مستقلة من فريق متخصص</li>
                <li>مصادر إخبارية ومالية موثوقة</li>
              </ul>
            </DisclosureSection>

            <DisclosureSection title="4. المخاطر والتحذيرات">
              <p className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>تحذير من مخاطر التداول:</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                التداول في سوق الفوركس والأسواق المالية الأخرى ينطوي على مخاطر عالية وقد يؤدي إلى خسارة كل أو جزء من رأس المال المستثمر. لا تستثمر أكثر مما تستطيع تحمل خسارته. الأداء السابق لا يضمن نتائج مستقبلية.
              </p>
            </DisclosureSection>

            <DisclosureSection title="5. استقلالية التحرير">
              نلتزم باستقلالية تحريرية كاملة. تقييماتنا ومراجعاتنا لا تتأثر بأي دفعات من الشركات أو المكاتب الواردة فيها. إذا تلقى أي محرر من محرري الموقع أي مزايا من أي جهة، فسيُفصح عن ذلك بوضوح في المقال ذي الصلة.
            </DisclosureSection>

            <DisclosureSection title="6. التحديثات">
              نحرص على تحديث قوائم الشركات المحذر منها والمكاتب القانونية الموصى بها بانتظام. تاريخ آخر تحديث مُذكور في كل صفحة. إذا لاحظت أي معلومة غير دقيقة، يرجى التواصل معنا.
            </DisclosureSection>

            <DisclosureSection title="7. تواصل معنا">
              <p className="text-gray-700 text-sm">
                لأي استفسار حول سياسة الإفصاح لدينا أو للإبلاغ عن محتوى غير دقيق: <br />
                <a href="mailto:editor@almorshid-almali.com" className="text-blue-600 underline">editor@almorshid-almali.com</a>
              </p>
            </DisclosureSection>
          </div>
        </div>
      </div>
    </>
  );
}

function DisclosureSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="text-base font-bold mb-3" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>{title}</h2>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

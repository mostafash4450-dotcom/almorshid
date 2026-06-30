import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'الشروط والأحكام - المرشد المالي',
  description: 'اقرأ الشروط والأحكام الخاصة باستخدام موقع المرشد المالي.',
};

export default function TermsPage() {
  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>الشروط والأحكام</h1>
          <p className="text-gray-300 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>آخر تحديث: يناير 2025</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl border border-gray-100 p-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="prose-arabic" style={{ fontFamily: 'Tajawal, sans-serif', lineHeight: 1.9 }}>
            <Section title="1. الموافقة على الشروط">
              باستخدامك لموقع المرشد المالي، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى التوقف عن استخدام الموقع.
            </Section>
            <Section title="2. طبيعة المحتوى">
              <p>المعلومات والمحتوى المقدم على موقع المرشد المالي هو لأغراض تعليمية وإعلامية فقط، ولا يُعدّ:</p>
              <ul>
                <li>مشورة استثمارية أو مالية</li>
                <li>مشورة قانونية</li>
                <li>توصية بشراء أو بيع أي ورقة مالية أو عملة</li>
                <li>ضماناً لأي نتيجة استثمارية</li>
              </ul>
              <p>يجب عليك استشارة مستشار مالي أو قانوني مرخص قبل اتخاذ أي قرار استثماري.</p>
            </Section>
            <Section title="3. الملكية الفكرية">
              جميع المحتويات المنشورة على الموقع، بما فيها النصوص والصور والشعارات والتصميم، هي ملك حصري لموقع المرشد المالي. لا يُسمح بإعادة نشر أي محتوى دون الحصول على إذن كتابي مسبق.
            </Section>
            <Section title="4. حدود المسؤولية">
              لن يكون موقع المرشد المالي مسؤولاً عن أي خسائر أو أضرار ناجمة عن:
              <ul>
                <li>الاعتماد على المعلومات المنشورة دون مراجعة مستقلة</li>
                <li>قرارات استثمارية بناءً على محتوى الموقع</li>
                <li>انقطاع الخدمة أو الأخطاء التقنية</li>
                <li>روابط مواقع خارجية</li>
              </ul>
            </Section>
            <Section title="5. الروابط الخارجية">
              قد يحتوي الموقع على روابط لمواقع خارجية. لا نتحكم في محتوى هذه المواقع ولا نتحمل أي مسؤولية عنها. إدراج الرابط لا يعني توصيتنا لهذا الموقع.
            </Section>
            <Section title="6. التعديلات">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعار المستخدمين بأي تغييرات جوهرية عبر نشرها على الموقع.
            </Section>
            <Section title="7. القانون المطبّق">
              تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة، وأي نزاع يُحل وفق الأنظمة القانونية المعمول بها.
            </Section>
            <Section title="8. تواصل معنا">
              لأي استفسار حول هذه الشروط، تواصل معنا على: <a href="mailto:legal@almorshid-almali.com" className="text-blue-600 underline">legal@almorshid-almali.com</a>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-3" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>{title}</h2>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

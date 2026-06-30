import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - المرشد المالي',
  description: 'اقرأ سياسة الخصوصية الخاصة بموقع المرشد المالي وكيفية حماية بياناتك الشخصية.',
};

export default function PrivacyPage() {
  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>سياسة الخصوصية</h1>
          <p className="text-gray-300 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>آخر تحديث: يناير 2025</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl border border-gray-100 p-8" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontFamily: 'Tajawal, sans-serif', lineHeight: 1.9 }}>
            <PrivacySection title="1. المعلومات التي نجمعها">
              <p>نجمع المعلومات التالية:</p>
              <ul className="list-disc list-inside space-y-1 mr-4 text-gray-600">
                <li><strong>معلومات التواصل:</strong> الاسم والبريد الإلكتروني عند ملء نماذج الاتصال</li>
                <li><strong>بيانات الاستخدام:</strong> صفحات الزيارة، مدة التصفح، الجهاز والمتصفح المستخدم</li>
                <li><strong>ملفات تعريف الارتباط (Cookies):</strong> لتحسين تجربة الزيارة</li>
              </ul>
            </PrivacySection>
            <PrivacySection title="2. كيف نستخدم معلوماتك">
              <ul className="list-disc list-inside space-y-1 mr-4 text-gray-600">
                <li>الرد على استفساراتك وطلباتك</li>
                <li>إرسال معلومات ذات صلة باهتماماتك (مع موافقتك)</li>
                <li>تحسين خدماتنا ومحتوى الموقع</li>
                <li>الامتثال للمتطلبات القانونية</li>
              </ul>
            </PrivacySection>
            <PrivacySection title="3. مشاركة المعلومات">
              لا نبيع ولا نشارك معلوماتك الشخصية مع أطراف ثالثة، باستثناء:
              <ul className="list-disc list-inside space-y-1 mr-4 mt-2 text-gray-600">
                <li>موافقتك الصريحة على المشاركة</li>
                <li>الامتثال لأوامر قانونية أو قضائية</li>
                <li>مزودي الخدمة الذين يساعدوننا في تشغيل الموقع (تحت التزامات سرية صارمة)</li>
              </ul>
            </PrivacySection>
            <PrivacySection title="4. ملفات تعريف الارتباط">
              نستخدم ملفات تعريف الارتباط لتحسين تجربتك. يمكنك التحكم في إعدادات الكوكيز من متصفحك. تعطيل الكوكيز قد يؤثر على بعض وظائف الموقع.
            </PrivacySection>
            <PrivacySection title="5. أمان البيانات">
              نتخذ إجراءات أمنية مناسبة لحماية معلوماتك، بما في ذلك التشفير وأنظمة الحماية من الوصول غير المصرح به. مع ذلك، لا يوجد نظام آمن بنسبة 100%.
            </PrivacySection>
            <PrivacySection title="6. حقوقك">
              <ul className="list-disc list-inside space-y-1 mr-4 text-gray-600">
                <li>الاطلاع على المعلومات التي نحتفظ بها عنك</li>
                <li>طلب تصحيح أي معلومات غير دقيقة</li>
                <li>طلب حذف معلوماتك</li>
                <li>إلغاء الاشتراك في التواصل التسويقي</li>
              </ul>
            </PrivacySection>
            <PrivacySection title="7. تواصل معنا">
              لأي استفسار حول خصوصيتك: <a href="mailto:privacy@almorshid-almali.com" className="text-blue-600 underline">privacy@almorshid-almali.com</a>
            </PrivacySection>
          </div>
        </div>
      </div>
    </>
  );
}

function PrivacySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="text-base font-bold mb-3" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>{title}</h2>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

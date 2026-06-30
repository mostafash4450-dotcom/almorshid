import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Target, Eye, Users, CheckCircle, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'من نحن - المرشد المالي',
  description: 'تعرف على موقع المرشد المالي، المرجع العربي الموثوق في تقييم شركات التداول والتحذير من الفوركس النصابة.',
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div style={{ background: '#1B2A4A' }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>من نحن</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            المرشد المالي — المرجع العربي الموثوق في حماية المستثمر من شركات التداول الاحتيالية
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full mb-4" style={{ background: '#eef1f8', color: '#1B2A4A' }}>
              <Target size={13} />
              رسالتنا
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
              حماية المستثمر العربي من الاحتيال المالي
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              انطلق المرشد المالي برؤية واضحة: أن يكون المرجع الأول للمستثمر العربي الذي يبحث عن معلومات موثوقة ومستقلة في عالم التداول والفوركس.
            </p>
            <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
              في ظل انتشار شركات التداول الاحتيالية التي تستهدف المستثمرين العرب، قررنا إنشاء منصة متخصصة توفر تحليلات موضوعية ومستقلة، وتحذيرات من الشركات المشبوهة، وتوجيهاً قانونياً لضحايا الاحتيال.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-56 h-56">
              <div className="w-full h-full rounded-full flex items-center justify-center border-4" style={{ background: '#eef1f8', borderColor: '#C9A55A' }}>
                <Image src="/image-removebg-preview.png" alt="المرشد المالي" width={180} height={180} className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>قيمنا الأساسية</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'الموثوقية', desc: 'نلتزم بالدقة والصدق في كل معلومة ننشرها، ولا نتأثر بأي اعتبارات تجارية في تقييماتنا.' },
              { icon: Eye, title: 'الشفافية', desc: 'نكشف بوضوح عن منهجية عملنا ومصادر معلوماتنا، ونبلّغ بصدق عن سياسة الإفصاح لدينا.' },
              { icon: Users, title: 'خدمة المجتمع', desc: 'هدفنا الأول حماية المستثمر العربي وتزويده بالأدوات اللازمة لاتخاذ قرارات مالية سليمة.' },
            ].map((v) => (
              <div key={v.title} className="text-center p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: '#eef1f8' }}>
                  <v.icon size={22} style={{ color: '#1B2A4A' }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What we do */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>ماذا نقدم؟</h2>
          <div className="space-y-4">
            {[
              { title: 'تحذيرات من شركات الفوركس المحتالة', desc: 'قاعدة بيانات محدّثة باستمرار تشمل الشركات التي ثبت احتيالها أو تصرفها بطريقة مشبوهة.' },
              { title: 'مراجعات مستقلة لشركات التداول', desc: 'تقييمات تفصيلية موضوعية لشركات التداول المرخصة لمساعدتك في الاختيار الصحيح.' },
              { title: 'دليل مكاتب المحاماة الموثوقة', desc: 'قائمة مختارة من المكاتب القانونية المتخصصة في استرداد الأموال من شركات الفوركس المحتالة.' },
              { title: 'محتوى تعليمي متخصص', desc: 'مقالات تعليمية احترافية للمبتدئين والمحترفين في مجال التداول والاستثمار.' },
              { title: 'استشارات وتوجيه مجاني', desc: 'نربطك بالمختصين القانونيين المناسبين لحالتك من خلال نموذج التواصل المجاني.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1" style={{ fontFamily: 'Cairo, sans-serif' }}>{item.title}</h3>
                  <p className="text-gray-500 text-sm" style={{ fontFamily: 'Tajawal, sans-serif' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-6 bg-yellow-50 border border-yellow-100 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} style={{ color: '#C9A55A' }} />
            <h3 className="font-bold" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>إخلاء المسؤولية</h3>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            المحتوى المقدم على موقع المرشد المالي هو لأغراض تعليمية وإعلامية فقط. نحن لسنا مستشارين ماليين ولا نقدم مشورة استثمارية. التداول في الفوركس والأسواق المالية ينطوي على مخاطر عالية. يتحمل المستخدم المسؤولية الكاملة عن قراراته الاستثمارية. اقرأ{' '}
            <Link href="/disclosure" className="underline hover:text-yellow-700" style={{ color: '#b8892a' }}>سياسة الإفصاح الكاملة</Link> لمزيد من التفاصيل.
          </p>
        </div>
      </div>
    </>
  );
}

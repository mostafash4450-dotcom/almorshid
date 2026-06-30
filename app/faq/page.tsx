import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة - المرشد المالي',
  description: 'إجابات شاملة على أكثر الأسئلة شيوعاً حول التداول في الفوركس وكيفية الكشف عن شركات النصب واسترداد الأموال.',
};

const faqCategories = [
  {
    title: 'الكشف عن شركات الفوركس المحتالة',
    items: [
      { q: 'كيف أعرف أن شركة الفوركس محتالة؟', a: 'هناك علامات واضحة تشير إلى شركات الفوركس الاحتيالية: عدم وجود ترخيص قابل للتحقق من جهات تنظيمية معترف بها، وعود بأرباح مضمونة أو عوائد غير واقعية، صعوبة في سحب الأموال، ضغط مستمر للإيداع بعروض محدودة الوقت، وغياب الشفافية في الرسوم والعمولات.' },
      { q: 'هل يمكنني التحقق من ترخيص شركة الفوركس؟', a: 'نعم، يمكنك التحقق من ترخيص الشركة مباشرةً على المواقع الرسمية للهيئات التنظيمية: FCA للمملكة المتحدة، ASIC لأستراليا، CySEC لقبرص، وFINMA لسويسرا. إذا لم تجد الشركة في قواعد بياناتهم فهي على الأرجح غير مرخصة.' },
      { q: 'ما الفرق بين شركة الفوركس المرخصة وغير المرخصة؟', a: 'الشركة المرخصة خاضعة لرقابة تنظيمية وتلتزم بمعايير محددة لحماية العملاء مثل الفصل بين أموال العملاء وأموال الشركة، وضمانات التعويض. الشركة غير المرخصة لا تخضع لأي رقابة ولا توجد آلية لحماية أموالك.' },
      { q: 'هل الخيارات الثنائية شرعية؟', a: 'الخيارات الثنائية محظورة في كثير من الدول المتقدمة كالمملكة المتحدة وأستراليا وكندا بسبب طبيعتها الاحتيالية. معظم شركات الخيارات الثنائية تتلاعب بالنتائج ضد العميل.' },
    ],
  },
  {
    title: 'استرداد الأموال',
    items: [
      { q: 'هل يمكن فعلاً استرداد الأموال من شركة فوركس محتالة؟', a: 'نعم، في كثير من الحالات يمكن استرداد الأموال، خاصة إذا تصرفت سريعاً. إذا أودعت بالبطاقة الائتمانية يمكن طلب استرداد (Chargeback). أما للتحويلات البنكية فالأمر يتطلب تدخلاً قانونياً، لكن كثيراً من القضايا تُحل بنجاح عبر مكاتب محاماة متخصصة.' },
      { q: 'كم من الوقت يستغرق استرداد الأموال؟', a: 'يختلف الوقت حسب طريقة الإيداع وتعقيد القضية. طلبات Chargeback تستغرق 45-120 يوماً. القضايا القانونية قد تستغرق من 3 أشهر إلى سنتين. كلما تصرفت سريعاً، كانت فرص النجاح أعلى.' },
      { q: 'ما هي الخطوات الأولى لاسترداد أموالي؟', a: 'الخطوات الفورية: (1) وثّق كل شيء - لقطات شاشة، رسائل، إيصالات. (2) أبلغ بنكك فوراً إذا أودعت بالبطاقة. (3) أبلغ الشرطة المحلية وهيئة الأوراق المالية. (4) تواصل مع مكتب محاماة متخصص في قضايا الفوركس.' },
      { q: 'هل أحتاج لمحامٍ لاسترداد أموالي؟', a: 'ليس دائماً ضرورياً للمبالغ الصغيرة أو حالات Chargeback البسيطة. لكن للمبالغ الكبيرة أو القضايا المعقدة، محامٍ متخصص يزيد فرص النجاح بشكل كبير ويوفر وقتك وجهدك.' },
    ],
  },
  {
    title: 'التداول الصحيح',
    items: [
      { q: 'كيف أبدأ التداول في الفوركس بشكل آمن؟', a: 'ابدأ بتعليم نفسك أساسيات التداول. اختر وسيطاً مرخصاً من هيئة تنظيمية معترف بها. ابدأ بحساب تجريبي قبل المال الحقيقي. لا تودع أكثر مما تستطيع تحمل خسارته. تعلم إدارة المخاطر قبل أي شيء.' },
      { q: 'ما هي أفضل الهيئات التنظيمية للفوركس؟', a: 'أبرز الهيئات التنظيمية الموثوقة: FCA (المملكة المتحدة)، ASIC (أستراليا)، FINMA (سويسرا)، MAS (سنغافورة)، CySEC (قبرص). تجنب الوسطاء المرخصين من جزر بعيدة مجهولة الاسم كسيشيل أو جزر العذراء.' },
      { q: 'هل الرافعة المالية العالية جيدة؟', a: 'الرافعة المالية العالية مخاطرة عالية، وليست مناسبة للمبتدئين. رافعة 1:50 تعني أن خسارة 2% في السوق تمحو رأس مالك كاملاً. أفضل الوسطاء المنظمون يحدّون من الرافعة لحماية العملاء.' },
    ],
  },
  {
    title: 'مكاتب المحاماة',
    items: [
      { q: 'كيف أختار مكتب محاماة موثوق لاسترداد أموالي؟', a: 'تحقق من: الترخيص والشرعية القانونية للمكتب، سجل نجاحاتهم في قضايا مشابهة، الشفافية في الرسوم (تجنب من يطلب مبالغ ضخمة مقدماً)، توفر فريق ناطق بالعربية، استشارة أولية مجانية.' },
      { q: 'هل مكاتب الاسترداد جميعها موثوقة؟', a: 'لا! للأسف بعض مكاتب الاسترداد نفسها احتيالية تستغل ضحايا الفوركس. تجنب أي مكتب يطلب مبالغ ضخمة مقدماً بدون ضمانات، أو يعدك باسترداد مضمون 100%.' },
      { q: 'ما هي رسوم مكاتب المحاماة عادةً؟', a: 'تختلف حسب المكتب وطبيعة القضية. بعض المكاتب تعمل على أساس نسبة من المبلغ المستردّ (contingency fee)، وبعضها يفرض رسوماً ثابتة. اطلع على هيكل الرسوم بوضوح قبل التوقيع.' },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <a href="/" className="hover:text-white transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-white">الأسئلة الشائعة</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>الأسئلة الشائعة</h1>
          <p className="text-gray-300" style={{ fontFamily: 'Tajawal, sans-serif' }}>إجابات على أكثر الأسئلة شيوعاً حول الفوركس وشركات التداول واسترداد الأموال</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {faqCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-10">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-3" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: '#C9A55A', color: '#0F1E36' }}>
                {catIndex + 1}
              </span>
              {category.title}
            </h2>
            <div className="space-y-3">
              {category.items.map((item, i) => (
                <details key={i} className="bg-white rounded-lg border border-gray-100 group" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none">
                    <h3 className="font-bold text-gray-800 text-sm pr-4" style={{ fontFamily: 'Cairo, sans-serif' }}>{item.q}</h3>
                    <ChevronDown size={16} className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180" style={{ color: '#1B2A4A' }} />
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 p-6 rounded-xl text-center" style={{ background: '#1B2A4A' }}>
          <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>لديك سؤال آخر؟</h3>
          <p className="text-gray-300 text-sm mb-4" style={{ fontFamily: 'Tajawal, sans-serif' }}>تواصل معنا مباشرةً وسيجيب عليك فريق متخصص</p>
          <a href="/contact" className="inline-block px-6 py-2.5 rounded font-bold text-sm hover:opacity-90 transition-opacity" style={{ background: '#C9A55A', color: '#0F1E36', fontFamily: 'Cairo, sans-serif' }}>
            اتصل بنا
          </a>
        </div>
      </div>
    </>
  );
}

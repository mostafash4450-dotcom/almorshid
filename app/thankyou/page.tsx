import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, ArrowLeft, MessageSquare, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'شكراً لتواصلك معنا | المرشد المالي',
  description: 'تم استلام طلبك بنجاح. سيتواصل معنا فريقنا خلال 24-48 ساعة.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)' }}>
            <CheckCircle size={40} className="text-green-600" />
          </div>

          <h1 className="text-2xl font-bold mb-3" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
            شكراً لتواصلك معنا!
          </h1>

          <p className="text-gray-600 mb-8" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            تم استلام طلبك بنجاح. سيقوم فريقنا بمراجعة تفاصيل قضيتك والتواصل معك في أقرب وقت.
          </p>

          {/* Info Cards */}
          <div className="grid gap-4 mb-8">
            <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 text-right">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eef1f8' }}>
                <Clock size={18} style={{ color: '#1B2A4A' }} />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>خلال 24-48 ساعة</div>
                <div className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>سيتواصل معك أحد خبرائنا</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 text-right">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eef1f8' }}>
                <MessageSquare size={18} style={{ color: '#1B2A4A' }} />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>مراجعة شاملة</div>
                <div className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>سنقوم بتحليل قضيتك بدقة</div>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 text-right">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eef1f8' }}>
                <Shield size={18} style={{ color: '#1B2A4A' }} />
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>خصوصية تامة</div>
                <div className="text-xs text-gray-500" style={{ fontFamily: 'Tajawal, sans-serif' }}>بياناتك محمية وآمنة</div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
            style={{ background: '#1B2A4A', color: 'white', fontFamily: 'Cairo, sans-serif' }}
          >
            <ArrowLeft size={16} />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

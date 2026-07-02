'use client';

import { useState } from 'react';
import { Mail, Shield, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    amount: '',
    description: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
  };

  return (
    <>
      <div style={{ background: '#1B2A4A' }} className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            <a href="/" className="hover:text-white transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-white">اتصل بنا</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>اتصل بنا</h1>
          <p className="text-gray-300" style={{ fontFamily: 'Tajawal, sans-serif' }}>
            أخبرنا بمشكلتك وسنوجهك للحل الأمثل لاسترداد أموالك
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 p-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <h2 className="text-xl font-bold mb-6" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                أرسل لنا تفاصيل قضيتك
              </h2>

              <form
                action="https://crm.zoho.com/crm/WebToLeadForm"
                method="POST"
                name="WebToLeads4493626000071855001"
                acceptCharset="UTF-8"
                className="space-y-5"
              >
                {/* Zoho hidden fields */}
                <input type="hidden" name="xnQsjsdp" value="971f56dc56ae7f8daa5c7ee5f0be0fb64671dd1feb2efd8ef6af8071cbd996b1" />
                <input type="hidden" name="zc_gad" id="zc_gad" value="" />
                <input type="hidden" name="xmIwtLD" value="58f630380ac93c47e0a14604d86bf1da3a45d433945811f1beb52c2a492e20c16082cb62d6f24082a70b170516780f8e" />
                <input type="hidden" name="actionType" value="TGVhZHM=" />
                <input type="hidden" name="returnURL" value="https://almorshidalmali.com/thankyou" />
                <input type="hidden" name="Lead Source" value="المرشد المالي" />

                {/* First Name & Last Name */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      الاسم الأول <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="First Name"
                        required
                        value={form.firstName}
                        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        placeholder="أدخل اسمك الأول"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                        style={{ fontFamily: 'Tajawal, sans-serif' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      اسم العائلة <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="Last Name"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="أدخل اسم العائلة"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      name="Phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Country & Company */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      الدولة
                    </label>
                    <input
                      type="text"
                      name="Country"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      placeholder="مثال: السعودية"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                      اسم شركة التداول
                    </label>
                    <input
                      type="text"
                      name="Company"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="اسم الشركة التي تعاملت معها"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                      style={{ fontFamily: 'Tajawal, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    قيمة المبلغ المُودَع / المفقود
                  </label>
                  <input
                    type="text"
                    name="Amount"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    placeholder="مثال: 5,000 دولار"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all"
                    style={{ fontFamily: 'Tajawal, sans-serif' }}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    وصف المشكلة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="Description"
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="اشرح تفاصيل ما حدث معك بقدر الإمكان..."
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all resize-none"
                    style={{ fontFamily: 'Tajawal, sans-serif' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  style={{ background: '#1B2A4A', color: 'white', fontFamily: 'Cairo, sans-serif' }}
                >
                  <Shield size={16} />
                  أرسل الطلب مجاناً
                </button>

                <p className="text-xs text-gray-400 text-center" style={{ fontFamily: 'Tajawal, sans-serif' }}>
                  معلوماتك سرية ومحمية. لن يتم مشاركتها مع أي طرف ثالث بدون إذنك.
                </p>
              </form>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-5" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h3 className="font-bold text-base mb-4 pb-2 border-b border-gray-100" style={{ color: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}>
                معلومات التواصل
              </h3>
              <div className="space-y-4">
                <a href="mailto:info@almorshidalmali.com" className="flex items-center gap-3 text-gray-600 hover:text-primary-800 transition-colors">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#eef1f8' }}>
                    <Mail size={16} style={{ color: '#1B2A4A' }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400" style={{ fontFamily: 'Cairo, sans-serif' }}>البريد الإلكتروني</div>
                    <div className="text-sm font-medium" style={{ fontFamily: 'Tajawal, sans-serif' }}>info@almorshidalmali.com</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="rounded-xl p-5" style={{ background: '#1B2A4A' }}>
              <h3 className="font-bold text-white mb-3" style={{ fontFamily: 'Cairo, sans-serif' }}>ماذا يحدث بعد التواصل؟</h3>
              <div className="space-y-3">
                {[
                  'سيراجع فريقنا طلبك خلال 24 ساعة',
                  'سيتواصل معك متخصص لمناقشة تفاصيل قضيتك',
                  'ستتلقى تقييماً لفرص الاسترداد',
                  'سنوجهك للمكتب القانوني المناسب',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{ background: '#C9A55A', color: '#0F1E36', fontFamily: 'Cairo, sans-serif' }}>
                      {i + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: 'Tajawal, sans-serif' }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

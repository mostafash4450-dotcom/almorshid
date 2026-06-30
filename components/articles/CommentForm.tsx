'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, Send } from 'lucide-react';

type Props = {
  articleId: string;
};

export default function CommentForm({ articleId }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, name, email, comment, website }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus('error');
      setMessage(payload.error || 'تعذر إرسال التعليق الآن');
      return;
    }

    setName('');
    setEmail('');
    setComment('');
    setWebsite('');
    setStatus('sent');
    setMessage('تم إرسال تعليقك، وسيظهر بعد موافقة الأدمن.');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-gray-700" style={{ fontFamily: 'Cairo, sans-serif' }}>
            الاسم
          </span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            maxLength={80}
            autoComplete="name"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-bold text-gray-700" style={{ fontFamily: 'Cairo, sans-serif' }}>
            البريد الإلكتروني
          </span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            maxLength={160}
            type="email"
            dir="ltr"
            autoComplete="email"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </label>
      </div>

      <input
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <label className="block">
        <span className="mb-1.5 block text-sm font-bold text-gray-700" style={{ fontFamily: 'Cairo, sans-serif' }}>
          التعليق
        </span>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          required
          minLength={3}
          maxLength={1200}
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm leading-7 focus:outline-none focus:ring-2 focus:ring-primary-200"
          style={{ fontFamily: 'Tajawal, sans-serif' }}
        />
      </label>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
            status === 'sent' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}
        >
          {status === 'sent' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: '#1B2A4A', fontFamily: 'Cairo, sans-serif' }}
      >
        {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
        إرسال للمراجعة
      </button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, X } from 'lucide-react';

type CommentStatus = 'pending' | 'approved' | 'rejected';

type Props = {
  commentId: string;
  status: CommentStatus;
};

export default function CommentModerationActions({ commentId, status }: Props) {
  const router = useRouter();
  const [loadingStatus, setLoadingStatus] = useState<'approved' | 'rejected' | null>(null);
  const [error, setError] = useState('');

  const updateStatus = async (nextStatus: 'approved' | 'rejected') => {
    setLoadingStatus(nextStatus);
    setError('');

    const response = await fetch(`/api/admin/comments/${commentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error || 'تعذر تحديث التعليق');
      setLoadingStatus(null);
      return;
    }

    router.refresh();
    setLoadingStatus(null);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => updateStatus('approved')}
          disabled={loadingStatus !== null || status === 'approved'}
          className="inline-flex items-center gap-1.5 rounded bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loadingStatus === 'approved' ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
          موافقة
        </button>
        <button
          type="button"
          onClick={() => updateStatus('rejected')}
          disabled={loadingStatus !== null}
          className="inline-flex items-center gap-1.5 rounded bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loadingStatus === 'rejected' ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
          {status === 'rejected' ? 'حذف' : 'رفض'}
        </button>
      </div>
      {error && <div className="text-xs text-red-600">{error}</div>}
    </div>
  );
}

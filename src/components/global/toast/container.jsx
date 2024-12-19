'use client';

import { useToast } from '@/providers/toast-provider';
import { Toast } from '@/components/global/toast';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

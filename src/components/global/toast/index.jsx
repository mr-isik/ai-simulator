import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'fixed bottom-4 right-4 flex items-center p-4 mb-4 rounded-lg shadow transition-opacity duration-300',
  {
    variants: {
      type: {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
);

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

export const Toast = ({ message, type, onClose }) => {
  const Icon = icons[type || 'info'];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={cn(toastVariants({ type }))}>
      <Icon className='w-5 h-5 mr-2' />
      <span>{message}</span>
      <button onClick={onClose} className='ml-auto'>
        <X className='w-4 h-4' />
      </button>
    </div>
  );
};

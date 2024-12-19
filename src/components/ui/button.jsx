import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

export const Button = ({
  children,
  size,
  variant = 'primary',
  className,
  loading,
  loadingText,
  ...props
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 text-lg font-medium rounded-lg transition-color flex items-center justify-center gap-2',
        size === 'sm' && 'text-sm',
        variant === 'primary'
          ? 'text-white bg-blue-600'
          : 'text-gray-400 bg-slate-700 hover:bg-slate-600/50',
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && (
        <>
          <LoaderCircle className='w-6 h-6 animate-spin' />
          {loadingText && <span>{loadingText}</span>}
        </>
      )}
      {!loading && children}
    </button>
  );
};

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Inter } from 'next/font/google';
import { ToastProvider } from '@/providers/toast-provider';
import { ToastContainer } from '@/components/global/toast/container';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next generation AI App',
  description: 'Next generation AI App',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased bg-slate-900`}>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}

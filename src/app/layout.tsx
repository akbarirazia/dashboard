'use client';

import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang='en' className={`${montserrat.variable} ${roboto.variable}`}>
      <head>
        <style>{`
          .text-gradient {
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
          .text-gradient:hover {
            background: linear-gradient(to right, #4338ca, #6d28d9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
          }
        `}</style>
      </head>
      <body className='bg-gradient-to-b from-indigo-50 to-purple-50 text-gray-900 font-montserrat min-h-screen'>
        <QueryClientProvider client={queryClient}>
          <nav className='bg-white shadow-lg p-4 md:p-6 sticky top-0 z-50'>
            <div className='container mx-auto flex max-w-7xl justify-between items-center'>
              <Link href='/' className='text-2xl font-bold text-gradient '>
                Post Dashboard
              </Link>
              <div className='flex gap-4'>
                <Link href='/'>
                  <Button
                    variant='ghost'
                    className='text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl text-base '
                  >
                    Posts
                  </Button>
                </Link>
                <Link href='/admin'>
                  <Button className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white  rounded-xl shadow-md'>
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </nav>

          <main className='container mx-auto p-4 md:p-8 max-w-7xl'>
            <div className='bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100'>
              {children}
            </div>
          </main>

          <footer className='bg-white border-t border-gray-100 mt-12 p-6 text-center text-gray-500 text-sm font-roboto'>
            <p className='bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl py-3'>
              © {new Date().getFullYear()} Post Dashboard. All rights reserved.
            </p>
          </footer>
        </QueryClientProvider>
      </body>
    </html>
  );
}

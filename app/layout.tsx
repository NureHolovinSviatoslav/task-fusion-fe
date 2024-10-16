import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import React from 'react';

import { MainLayout } from '@/layouts/MainLayout';

const inter = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Taskfusion',
  description: 'Manage your tasks with ease.',
};

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
};

export default Layout;

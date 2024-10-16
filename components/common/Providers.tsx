'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { queryClient } from '@/utils/queryClient';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

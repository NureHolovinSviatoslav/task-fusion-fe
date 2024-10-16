'use client';

import { ErrorView } from '@/views/common/ErrorView';

export default function Error({ error }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorView error={error} />;
}

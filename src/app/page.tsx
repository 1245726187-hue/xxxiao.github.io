'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isDemoAuthenticated } from '@/lib/demo-mode';

export default function EntryPage() {
  const router = useRouter();

  useEffect(() => {
    if (isDemoAuthenticated()) {
      router.replace('/home');
    } else {
      router.replace('/onboarding');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface">
      <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

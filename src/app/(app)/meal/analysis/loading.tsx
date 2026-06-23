'use client';

import { Suspense } from 'react';
import { AnalysisProgress } from '@/components/analysis/AnalysisProgress';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function AnalysisLoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const image = searchParams.get('image');
    if (image) {
      setImageUrl(decodeURIComponent(image));
    } else {
      router.push('/camera');
    }
  }, [searchParams, router]);

  if (!imageUrl) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="-mx-4 min-h-[calc(100vh-8rem)] bg-surface-secondary flex items-center justify-center">
      <AnalysisProgress
        imageUrl={imageUrl}
        onComplete={() => {
          const encoded = encodeURIComponent(imageUrl);
          router.replace(`/meal/analysis?image=${encoded}`);
        }}
      />
    </div>
  );
}

export default function AnalysisLoadingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AnalysisLoadingContent />
    </Suspense>
  );
}

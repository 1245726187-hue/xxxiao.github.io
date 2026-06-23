'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import { CameraCapture, CameraControls, GalleryPicker, PhotoPreview } from '@/components/camera/CameraCapture';

type Step = 'capture' | 'preview' | 'analyzing';

export default function CameraPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState<Step>('capture');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [cameraReady, setCameraReady] = useState(true);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = useCallback((file: File, preview: string) => {
    setPreviewUrl(preview);
    setCapturedFile(file);
    setStep('preview');
  }, []);

  const handleConfirm = async () => {
    if (!capturedFile) return;
    setStep('analyzing');

    try {
      // Create a local preview URL for the analysis page
      const analysisImageUrl = previewUrl!;

      // Navigate to analysis page with the image
      // In a real app, we'd upload to storage first, then call AI API
      const encodedImage = encodeURIComponent(analysisImageUrl);
      router.push(`/meal/analysis?image=${encodedImage}`);
    } catch {
      showToast('error', '图片处理失败，请重试。');
      setStep('capture');
    }
  };

  const handleRetake = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setCapturedFile(null);
    setStep('capture');
  };

  const handleGallerySelect = useCallback((file: File, preview: string) => {
    setPreviewUrl(preview);
    setCapturedFile(file);
    setStep('preview');
  }, []);

  const handleCameraError = useCallback((error: string) => {
    showToast('error', error);
  }, [showToast]);

  const openGallery = () => {
    galleryInputRef.current?.click();
  };

  return (
    <div className="-mx-4 h-[calc(100vh-8rem)] relative bg-black overflow-hidden">
      {step === 'capture' && (
        <>
          <CameraCapture onCapture={handleCapture} onError={handleCameraError} />
          <CameraControls
            onCapture={() => {
              // CameraCapture handles via internal ref
              const video = document.querySelector('video');
              if (!video) return;
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext('2d');
              if (!ctx) return;
              ctx.drawImage(video, 0, 0);
              canvas.toBlob((blob) => {
                if (!blob) return;
                const file = new File([blob], `meal-${Date.now()}.jpg`, { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);
                handleCapture(file, url);
              }, 'image/jpeg', 0.9);
            }}
            onFlip={() => {
              // Camera flip is handled internally
            }}
            onGallery={openGallery}
            cameraReady={cameraReady}
          />
          <GalleryPicker onSelect={handleGallerySelect} />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                handleGallerySelect(file, url);
              }
            }}
            className="hidden"
          />
        </>
      )}

      {step === 'preview' && previewUrl && (
        <PhotoPreview
          previewUrl={previewUrl}
          onConfirm={handleConfirm}
          onRetake={handleRetake}
        />
      )}

      {step === 'analyzing' && (
        <div className="flex items-center justify-center h-full bg-surface-secondary">
          <div className="text-center animate-pulse-soft">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-accent border-t-transparent animate-spin" />
            <p className="text-ink-secondary text-body">正在准备分析...</p>
          </div>
        </div>
      )}
    </div>
  );
}

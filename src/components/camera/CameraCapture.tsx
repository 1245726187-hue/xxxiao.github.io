'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface CameraCaptureProps {
  onCapture: (file: File, previewUrl: string) => void;
  onError: (error: string) => void;
}

export function CameraCapture({ onCapture, onError }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraReady, setCameraReady] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1080 },
          height: { ideal: 1440 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraReady(true);
        setPermissionDenied(false);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setPermissionDenied(true);
        onError('相机权限被拒绝，请在浏览器设置中允许相机访问。');
      } else {
        onError('无法访问相机，请改用相册上传。');
      }
    }
  }, [facingMode, onError]);

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [startCamera]);

  function flipCamera() {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }

  function capturePhoto() {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) {
        onError('拍照失败。');
        return;
      }
      const file = new File([blob], `meal-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const previewUrl = URL.createObjectURL(blob);
      onCapture(file, previewUrl);

      // Stop camera stream after capture
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    }, 'image/jpeg', 0.9);
  }

  if (permissionDenied) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-6">
        <div className="w-16 h-16 rounded-full bg-red-light flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        </div>
        <h3 className="text-title text-ink mb-2">需要相机权限</h3>
        <p className="text-ink-secondary text-body">
          请在浏览器设置中允许相机访问，以便拍摄餐食照片。
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black">
      {/* Viewfinder */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full grid grid-cols-3 grid-rows-3 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-white/30" />
          ))}
        </div>
      </div>

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

export function CameraControls({
  onCapture,
  onFlip,
  onGallery,
  cameraReady,
}: {
  onCapture: () => void;
  onFlip: () => void;
  onGallery: () => void;
  cameraReady: boolean;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 pb-safe" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
      <div className="flex items-center justify-around px-8 py-6">
        {/* Gallery button */}
        <button
          onClick={onGallery}
          className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center
                     active:scale-90 transition-transform"
          aria-label="打开相册"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </button>

        {/* Shutter button */}
        <button
          onClick={onCapture}
          disabled={!cameraReady}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center
                     active:scale-90 transition-transform disabled:opacity-50"
          aria-label="拍照"
        >
          <div className="w-[62px] h-[62px] rounded-full bg-white" />
        </button>

        {/* Flip camera */}
        <button
          onClick={onFlip}
          className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center
                     active:scale-90 transition-transform"
          aria-label="翻转镜头"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function GalleryPicker({ onSelect }: { onSelect: (file: File, previewUrl: string) => void }) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    onSelect(file, previewUrl);
  }

  return (
    <input
      type="file"
      accept="image/*"
      capture="environment"
      onChange={handleChange}
      className="hidden"
      id="gallery-picker"
    />
  );
}

export function PhotoPreview({
  previewUrl,
  onConfirm,
  onRetake,
}: {
  previewUrl: string;
  onConfirm: () => void;
  onRetake: () => void;
}) {
  return (
    <div className="relative w-full h-full bg-black flex flex-col">
      <img src={previewUrl} alt="Preview" className="flex-1 w-full object-contain" />
      <div className="absolute bottom-0 left-0 right-0 pb-safe" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-center gap-6 px-8 py-6">
          <button
            onClick={onRetake}
            className="px-6 py-3 rounded-card-sm bg-white/20 text-white font-medium
                       active:scale-95 transition-transform backdrop-blur-sm"
          >
            重拍
          </button>
          <button
            onClick={onConfirm}
            className="px-8 py-3 rounded-card-sm bg-accent text-white font-semibold
                       shadow-lg shadow-accent/30 active:scale-95 transition-transform"
          >
            使用照片
          </button>
        </div>
      </div>
    </div>
  );
}

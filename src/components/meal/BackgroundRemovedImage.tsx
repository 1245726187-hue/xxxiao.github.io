'use client';

import { cn } from '@/lib/utils/cn';

interface BackgroundRemovedImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showCheckerboard?: boolean;
}

export function BackgroundRemovedImage({
  src,
  alt,
  className,
  size = 'md',
  showCheckerboard = true,
}: BackgroundRemovedImageProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-full aspect-[4/3]',
    lg: 'w-full aspect-[3/4]',
    full: 'w-full aspect-square',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-card',
        sizeClasses[size],
        showCheckerboard && 'bg-surface-tertiary',
        className
      )}
    >
      {/* Checkerboard pattern suggesting transparency */}
      {showCheckerboard && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
              linear-gradient(-45deg, #e0e0e0 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
              linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)
            `,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
          }}
        />
      )}

      {/* Food image with radial mask cutout */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover animate-float"
        style={{
          maskImage: 'radial-gradient(ellipse 62% 62% at 50% 45%, black 55%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 62% 62% at 50% 45%, black 55%, transparent 100%)',
          filter: 'drop-shadow(0 12px 30px rgba(0,0,0,0.2))',
        }}
      />

      {/* Subtle border ring */}
      <div className="absolute inset-0 rounded-card ring-1 ring-inset ring-white/20 pointer-events-none" />
    </div>
  );
}

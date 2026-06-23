import { cn } from '@/lib/utils/cn';

type SkeletonVariant = 'text' | 'circle' | 'rect';

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Skeleton({
  variant = 'rect',
  width,
  height,
  className,
}: SkeletonProps) {
  const baseClasses =
    'animate-shimmer bg-gradient-to-r from-ink/5 via-ink/10 to-ink/5';

  const variantClasses: Record<SkeletonVariant, string> = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rect: 'rounded-card-sm',
  };

  const defaultSizes: Record<SkeletonVariant, { w: number | string; h: number | string }> = {
    text: { w: '100%', h: '1em' },
    circle: { w: 48, h: 48 },
    rect: { w: '100%', h: 120 },
  };

  const resolvedWidth = width ?? defaultSizes[variant].w;
  const resolvedHeight = height ?? defaultSizes[variant].h;

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{
        width:
          typeof resolvedWidth === 'number'
            ? `${resolvedWidth}px`
            : resolvedWidth,
        height:
          typeof resolvedHeight === 'number'
            ? `${resolvedHeight}px`
            : resolvedHeight,
      }}
      aria-hidden="true"
    />
  );
}

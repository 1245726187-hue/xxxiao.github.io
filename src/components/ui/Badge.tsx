import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-accent-orange/10 text-accent-orange',
  success: 'bg-accent-green/10 text-accent-green',
  warning: 'bg-accent-yellow/10 text-accent-yellow',
  danger: 'bg-accent-red/10 text-accent-red',
  info: 'bg-accent-blue/10 text-accent-blue',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-caption',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({
  variant = 'default',
  size = 'sm',
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

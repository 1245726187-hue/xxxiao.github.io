'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type CardVariant = 'default' | 'glass' | 'elevated' | 'interactive';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';
type CardRounded = 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  rounded?: CardRounded;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface rounded-card',
  glass: 'glass-card',
  elevated: 'card-elevated',
  interactive: 'card-elevated card-interactive',
};

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6 sm:p-8',
};

const roundedStyles: Record<CardRounded, string> = {
  sm: 'rounded-card-sm',
  md: 'rounded-card',
  lg: 'rounded-card-lg',
  xl: 'rounded-card-lg',
};

export default function Card({
  variant = 'elevated',
  padding = 'md',
  rounded = 'md',
  className,
  children,
  onClick,
  href,
}: CardProps) {
  const classes = cn(
    variantStyles[variant],
    paddingStyles[padding],
    roundedStyles[rounded],
    className,
  );

  if (href) {
    return (
      <a href={href} className={cn(classes, 'block no-underline text-ink')}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(classes, 'w-full text-left cursor-pointer')}
      >
        {children}
      </button>
    );
  }

  return <div className={classes}>{children}</div>;
}

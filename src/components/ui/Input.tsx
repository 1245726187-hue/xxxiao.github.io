'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  multiline?: boolean;
  rows?: number;
  className?: string;
  inputClassName?: string;
}

export default function Input({
  label,
  error,
  icon,
  multiline = false,
  rows = 3,
  className,
  inputClassName,
  id,
  disabled,
  ...props
}: InputProps) {
  const inputId =
    id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const inputClasses = cn(
    'w-full bg-surface border rounded-card-sm px-4',
    'text-ink placeholder:text-ink-tertiary',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error
      ? 'border-danger focus:ring-danger/30 focus:border-danger'
      : 'border-surface-tertiary',
    multiline ? 'py-3 resize-y' : icon ? 'py-3 pl-11' : 'py-3',
    inputClassName,
  );

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-ink-secondary"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && !multiline && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-tertiary pointer-events-none">
            {icon}
          </span>
        )}
        {multiline ? (
          <textarea
            id={inputId}
            rows={rows}
            disabled={disabled}
            className={inputClasses}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={inputId}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />
        )}
      </div>
      {error && (
        <p className="text-sm text-danger mt-0.5">{error}</p>
      )}
    </div>
  );
}

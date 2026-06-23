import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-ink-inverse hover:bg-accent-orange/90 active:bg-accent-orange/80',
  secondary:
    'border-2 border-ink/10 text-ink bg-transparent hover:bg-ink/5',
  ghost:
    'text-accent bg-transparent hover:bg-accent/10',
  danger:
    'bg-danger text-ink-inverse hover:bg-accent-red/90 active:bg-accent-red/80',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-sm rounded-card-sm',
  md: 'py-3 px-6 text-base rounded-card-sm',
  lg: 'py-4 px-8 text-lg rounded-card-sm',
  icon: 'p-3 rounded-card-sm',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold',
        'active:scale-[0.97] transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

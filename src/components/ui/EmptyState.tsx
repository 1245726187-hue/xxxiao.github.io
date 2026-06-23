import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import Button from './Button';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className,
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-surface-tertiary flex items-center justify-center mb-6 text-ink-tertiary">
          <span className="text-2xl">{icon}</span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-ink mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-ink-secondary max-w-xs mb-6 leading-relaxed">
          {description}
        </p>
      )}

      {action && (
        <Button variant="primary" size="md" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

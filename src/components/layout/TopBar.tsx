'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface TopBarProps {
  title: string;
  backButton?: boolean;
  backUrl?: string;
  action?: {
    icon: React.ReactNode;
    onClick: () => void;
    label: string;
  };
  transparent?: boolean;
}

export function TopBar({ title, backButton = false, backUrl, action, transparent = false }: TopBarProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full',
        transparent
          ? 'bg-transparent'
          : 'bg-surface/80 backdrop-blur-xl border-b border-surface-tertiary/50'
      )}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="flex items-center justify-between h-12 px-4">
        {/* Left side */}
        <div className="w-10 flex items-center justify-start">
          {backButton && (
            <button
              onClick={() => (backUrl ? router.push(backUrl) : router.back())}
              className="w-9 h-9 flex items-center justify-center rounded-full
                         bg-surface-secondary/80 hover:bg-surface-tertiary
                         transition-colors active:scale-95"
              aria-label="返回"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Center title */}
        <h1 className="text-body font-semibold text-ink text-center flex-1 truncate px-2">
          {title}
        </h1>

        {/* Right side */}
        <div className="w-10 flex items-center justify-end">
          {action && (
            <button
              onClick={action.onClick}
              className="w-9 h-9 flex items-center justify-center rounded-full
                         bg-surface-secondary/80 hover:bg-surface-tertiary
                         transition-colors active:scale-95"
              aria-label={action.label}
            >
              {action.icon}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

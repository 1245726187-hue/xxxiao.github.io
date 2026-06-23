'use client';

import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';

interface ShellProps {
  children: React.ReactNode;
  title?: string;
  showNav?: boolean;
  showTopBar?: boolean;
  backButton?: boolean;
  backUrl?: string;
  topBarAction?: {
    icon: React.ReactNode;
    onClick: () => void;
    label: string;
  };
  topBarTransparent?: boolean;
  contentClassName?: string;
}

export function Shell({
  children,
  title = '',
  showNav = true,
  showTopBar = true,
  backButton = false,
  backUrl,
  topBarAction,
  topBarTransparent = false,
  contentClassName = '',
}: ShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-surface-secondary">
      {/* TopBar */}
      {showTopBar && (
        <TopBar
          title={title}
          backButton={backButton}
          backUrl={backUrl}
          action={topBarAction}
          transparent={topBarTransparent}
        />
      )}

      {/* Main content */}
      <main
        className={`flex-1 px-4 ${showNav ? 'pb-28' : 'pb-8'} ${contentClassName}`}
        style={showNav ? { paddingBottom: 'calc(7rem + env(safe-area-inset-bottom))' } : undefined}
      >
        {children}
      </main>

      {/* Bottom Navigation */}
      {showNav && <BottomNav />}
    </div>
  );
}

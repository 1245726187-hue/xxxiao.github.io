'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  route: string;
  isCenter?: boolean;
}

const tabs: Tab[] = [
  {
    id: 'home',
    label: '首页',
    route: '/home',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      </svg>
    ),
    activeIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      </svg>
    ),
  },
  {
    id: 'history',
    label: '历史',
    route: '/history',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    activeIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'camera',
    label: '记录',
    route: '/camera',
    isCenter: true,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    activeIcon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" fill="white" />
      </svg>
    ),
  },
  {
    id: 'search',
    label: '搜索',
    route: '/search',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
    activeIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: '我的',
    route: '/profile',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    activeIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {/* 毛玻璃背景 */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-secondary via-surface-secondary/80 to-transparent pointer-events-none z-40" />

      {/* 导航栏 */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 pb-safe"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
      >
        <div className="mx-auto max-w-lg px-3">
          <div className="glass-card rounded-pill px-1 py-1.5 flex items-center justify-around relative">
            {tabs.map((tab) => {
              const isActive = tab.route === '/'
                ? pathname === '/'
                : pathname === tab.route || pathname.startsWith(tab.route + '/');

              if (tab.isCenter) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => router.push(tab.route)}
                    className={cn(
                      'relative -mt-8 flex flex-col items-center justify-center',
                      'w-14 h-14 rounded-full bg-accent text-white',
                      'shadow-lg shadow-accent/30',
                      'active:scale-95 transition-transform'
                    )}
                    aria-label={tab.label}
                  >
                    {tab.icon}
                  </button>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => router.push(tab.route)}
                  className={cn(
                    'flex flex-col items-center justify-center min-w-[48px] py-1 px-2',
                    'rounded-xl transition-all duration-200',
                    'active:scale-90',
                    isActive
                      ? 'text-ink'
                      : 'text-ink-tertiary hover:text-ink-secondary'
                  )}
                  aria-label={tab.label}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    {isActive ? tab.activeIcon : tab.icon}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] leading-tight mt-0.5 font-medium',
                      isActive && 'text-ink'
                    )}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

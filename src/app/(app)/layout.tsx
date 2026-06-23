'use client';

import { Shell } from '@/components/layout/Shell';
import { usePathname } from 'next/navigation';

const routeMeta: Record<string, { title: string; backButton?: boolean; showTopBar?: boolean; showNav?: boolean }> = {
  '/home': { title: '食忆', showTopBar: true, showNav: true },
  '/camera': { title: '记录餐食', showTopBar: true, showNav: false, backButton: true },
  '/history': { title: '历史记录', showTopBar: true, showNav: true },
  '/search': { title: '搜索', showTopBar: true, showNav: true },
  '/profile': { title: '我的', showTopBar: true, showNav: true },
  '/profile/edit': { title: '编辑资料', showTopBar: true, showNav: true, backButton: true },
};

function getRouteMeta(pathname: string) {
  if (routeMeta[pathname]) return routeMeta[pathname];

  if (pathname.startsWith('/meal/analysis')) {
    return { title: 'AI 分析', showTopBar: true, showNav: false, backButton: false };
  }
  if (pathname.startsWith('/meal/new')) {
    return { title: '手动添加', showTopBar: true, showNav: true, backButton: true };
  }
  if (pathname.startsWith('/meal')) {
    return { title: '餐食详情', showTopBar: true, showNav: true, backButton: true };
  }

  return { title: '食忆', showTopBar: true, showNav: true };
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const meta = getRouteMeta(pathname);

  return (
    <Shell
      title={meta.title}
      showNav={meta.showNav !== false}
      showTopBar={meta.showTopBar !== false}
      backButton={meta.backButton}
    >
      {children}
    </Shell>
  );
}

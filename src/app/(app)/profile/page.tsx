'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDemoAuth, clearDemoAuth } from '@/lib/demo-mode';
import { ProfileHeader, SettingsGroup, SettingsRow } from '@/components/profile/ProfileHeader';
import { useToast } from '@/components/ui/Toast';

export default function ProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [profile, setProfile] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // 演示模式：从 localStorage 获取用户信息
    const demo = getDemoAuth();
    if (demo) {
      setProfile({ name: demo.name, email: demo.email });
    } else {
      setProfile({ name: '美食探索者', email: 'demo@foodmemory.app' });
    }
  }, []);

  function handleSignOut() {
    clearDemoAuth();
    router.push('/onboarding');
  }

  return (
    <div className="space-y-4 pb-4 pt-2">
      {/* 个人信息 */}
      <ProfileHeader
        name={profile?.name || '美食探索者'}
        email={undefined}
        stats={{
          totalMeals: 12,
          streak: 3,
          avgCalories: 1850,
        }}
      />

      {/* 营养目标 */}
      <SettingsGroup title="营养目标">
        <SettingsRow label="每日热量目标" value="2000 kcal" />
        <SettingsRow label="宏量营养素配比" value="30P / 40C / 30F" />
        <SettingsRow label="饮食偏好" value="无" />
      </SettingsGroup>

      {/* 应用设置 */}
      <SettingsGroup title="应用">
        <SettingsRow label="通知" value="开启" />
        <SettingsRow label="数据导出" onClick={() => showToast('info', '即将推出！')} />
        <SettingsRow label="关于食忆" value="v1.0" />
      </SettingsGroup>

      {/* 账户 */}
      <SettingsGroup title="账户">
        <SettingsRow label="编辑资料" onClick={() => router.push('/profile/edit')} />
        <SettingsRow label="退出登录" onClick={handleSignOut} destructive />
      </SettingsGroup>

      <p className="text-center text-[10px] text-ink-tertiary pt-4">
        用心记录，健康饮食 💚
      </p>
    </div>
  );
}

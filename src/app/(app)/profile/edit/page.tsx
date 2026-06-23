'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';

export default function EditProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState('美食探索者');
  const [calorieGoal, setCalorieGoal] = useState('2000');

  function handleSave() {
    // 演示模式：直接保存
    showToast('success', '资料已更新！');
    router.back();
  }

  return (
    <div className="space-y-5 pb-8 pt-2">
      <div className="space-y-4">
        <div>
          <label className="block text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-2">
            显示名称
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3.5 bg-surface-secondary border border-surface-tertiary rounded-card-sm
                       text-body text-ink focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label className="block text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-2">
            每日热量目标
          </label>
          <input
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(e.target.value)}
            className="w-full px-4 py-3.5 bg-surface-secondary border border-surface-tertiary rounded-card-sm
                       text-body text-ink focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-4 bg-accent text-white rounded-card-sm font-semibold text-body
                   shadow-lg shadow-accent/25 active:scale-[0.98] transition-all"
      >
        保存修改
      </button>
    </div>
  );
}

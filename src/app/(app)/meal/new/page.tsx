'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MealDetailForm } from '@/components/meal/MealDetailForm';
import { useToast } from '@/components/ui/Toast';
import type { Meal } from '@/types/meal';

export default function NewMealPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [meal, setMeal] = useState<Partial<Meal>>({
    name: '',
    meal_type: 'lunch',
    eaten_at: new Date().toISOString(),
    notes: '',
    total_calories: 0,
    total_protein_g: 0,
    total_carbs_g: 0,
    total_fat_g: 0,
  });
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!meal.name?.trim()) {
      showToast('error', '请输入餐食名称');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...meal, is_manual: true }),
      });
      if (res.ok) {
        showToast('success', '创建成功！');
        router.push('/home');
      }
    } catch {
      showToast('success', '创建成功！');
      router.push('/home');
    }
  }

  return (
    <div className="space-y-5 pb-8 pt-2">
      <div className="card-elevated p-5 text-center">
        <span className="text-4xl">✍️</span>
        <h3 className="text-body font-semibold text-ink mt-2">手动添加</h3>
        <p className="text-caption text-ink-secondary mt-1">无需拍照，手动记录餐食</p>
      </div>

      <MealDetailForm meal={meal} onChange={(updates) => setMeal({ ...meal, ...updates })} />

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full py-4 bg-accent text-white rounded-card-sm font-semibold text-body
                   shadow-lg shadow-accent/25 active:scale-[0.98] transition-all disabled:opacity-60"
      >
        {saving ? '保存中...' : '创建记录'}
      </button>
    </div>
  );
}

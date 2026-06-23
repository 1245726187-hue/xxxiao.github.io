'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BackgroundRemovedImage } from '@/components/meal/BackgroundRemovedImage';
import { MealDetailForm } from '@/components/meal/MealDetailForm';
import { NutritionGrid } from '@/components/meal/NutritionGrid';
import { getDemoMeals } from '@/lib/demo-mode';
import { useToast } from '@/components/ui/Toast';
import type { Meal } from '@/types/meal';

function MealDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [meal, setMeal] = useState<Partial<Meal> | null>(null);
  const [loading, setLoading] = useState(true);

  const mealId = searchParams.get('id');

  useEffect(() => {
    if (!mealId) {
      setLoading(false);
      return;
    }
    const allMeals = getDemoMeals();
    const found = allMeals.find((m: any) => m.id === mealId);
    if (found) setMeal(found);
    setLoading(false);
  }, [mealId]);

  function handleSave() {
    if (!meal || !mealId) return;
    const allMeals = getDemoMeals();
    const index = allMeals.findIndex((m: any) => m.id === mealId);
    if (index !== -1) {
      allMeals[index] = { ...allMeals[index], ...meal };
      localStorage.setItem('food-memory-demo-meals', JSON.stringify(allMeals));
    }
    showToast('success', '餐食已更新！');
    router.back();
  }

  function handleDelete() {
    if (!confirm('确定删除这条记录？此操作无法撤销。')) return;
    if (!mealId) return;
    const allMeals = getDemoMeals();
    const updated = allMeals.filter((m: any) => m.id !== mealId);
    localStorage.setItem('food-memory-demo-meals', JSON.stringify(updated));
    showToast('success', '餐食已删除。');
    router.push('/home');
  }

  if (loading) {
    return (
      <div className="space-y-5 pt-2">
        <div className="w-full aspect-[4/3] rounded-card bg-surface-tertiary animate-shimmer" />
        <div className="space-y-3">
          <div className="h-8 w-2/3 bg-surface-tertiary rounded animate-shimmer" />
          <div className="h-4 w-1/3 bg-surface-tertiary rounded animate-shimmer" />
        </div>
      </div>
    );
  }

  if (!meal) {
    return (
      <div className="text-center py-16">
        <span className="text-4xl">🔍</span>
        <h3 className="text-title text-ink mt-4">未找到餐食</h3>
        <button onClick={() => router.back()} className="mt-4 text-accent font-medium">
          返回
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-8">
      {/* 食物图片 */}
      {meal.photo_url && (
        <BackgroundRemovedImage src={meal.photo_url} alt={meal.name || '餐食'} size="md" />
      )}

      {/* 编辑表单 */}
      <MealDetailForm meal={meal} onChange={(updates) => setMeal({ ...meal, ...updates })} />

      {/* 营养信息 */}
      {meal.total_calories !== undefined && (
        <NutritionGrid
          nutrition={{
            calories: meal.total_calories || 0,
            protein_g: meal.total_protein_g || 0,
            carbs_g: meal.total_carbs_g || 0,
            fat_g: meal.total_fat_g || 0,
          }}
        />
      )}

      {/* 操作按钮 */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={handleDelete}
          className="flex-1 py-4 border-2 border-accent-red/20 text-accent-red rounded-card-sm
                     font-semibold text-body hover:bg-red-light active:scale-[0.98] transition-all"
        >
          删除
        </button>
        <button
          onClick={handleSave}
          className="flex-[2] py-4 bg-accent text-white rounded-card-sm font-semibold text-body
                     shadow-lg shadow-accent/25 active:scale-[0.98] transition-all"
        >
          保存修改
        </button>
      </div>
    </div>
  );
}

export default function MealDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <MealDetailContent />
    </Suspense>
  );
}

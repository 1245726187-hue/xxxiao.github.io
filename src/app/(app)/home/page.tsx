'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DateStrip } from '@/components/home/DateStrip';
import { AINutritionSummary } from '@/components/home/AINutritionSummary';
import { DailyTimeline } from '@/components/home/DailyTimeline';
import { getDemoMeals, getDemoAuth } from '@/lib/demo-mode';
import type { Meal, NutritionTotals } from '@/types/meal';

export default function HomePage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [userName, setUserName] = useState('朋友');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载演示数据
    const demo = getDemoAuth();
    if (demo) setUserName(demo.name);

    const allMeals = getDemoMeals();
    // 筛选选中日期的餐食
    const dateStr = selectedDate.toISOString().split('T')[0];
    const filtered = allMeals.filter((m: any) => {
      const mealDate = (m.eaten_at || m.created_at).split('T')[0];
      return mealDate === dateStr;
    });
    setMeals(filtered);
    setLoading(false);
  }, [selectedDate]);

  const totals: NutritionTotals = {
    calories: meals.reduce((sum, m) => sum + (m.total_calories || 0), 0),
    protein_g: meals.reduce((sum, m) => sum + (m.total_protein_g || 0), 0),
    carbs_g: meals.reduce((sum, m) => sum + (m.total_carbs_g || 0), 0),
    fat_g: meals.reduce((sum, m) => sum + (m.total_fat_g || 0), 0),
  };

  const allMeals = getDemoMeals();

  return (
    <div className="space-y-5 pt-2">
      {/* 日期选择条 */}
      <DateStrip
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        mealDates={allMeals.map((m: any) => new Date(m.eaten_at || m.created_at))}
      />

      {/* AI 营养摘要 */}
      <AINutritionSummary
        name={userName}
        summaryText={
          meals.length > 0
            ? `今天记录了 ${meals.length} 餐，共 ${totals.calories} 千卡。`
            : '今天还没有记录任何餐食。从添加你的第一餐开始吧！'
        }
        totals={totals}
        mealCount={meals.length}
        healthScore={meals.length > 0 ? Math.min(100, Math.round((totals.protein_g / (totals.calories / 10)) * 20 + 60)) : undefined}
      />

      {/* 今日餐食时间线 */}
      <div className="pt-2">
        <h3 className="text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-3 px-1">
          今日餐食
        </h3>
        {loading ? (
          <div className="space-y-4 px-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-tertiary animate-shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 bg-surface-tertiary rounded animate-shimmer" />
                  <div className="h-3 w-1/3 bg-surface-tertiary rounded animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DailyTimeline meals={meals} onAddMeal={() => router.push('/camera')} />
        )}
      </div>
    </div>
  );
}

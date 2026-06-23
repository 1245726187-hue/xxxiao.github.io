'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MonthCalendar } from '@/components/history/MonthCalendar';
import { MealCard } from '@/components/meal/MealCard';
import { getDemoMeals } from '@/lib/demo-mode';
import type { Meal } from '@/types/meal';
import { formatDate, isSameDay } from '@/lib/utils/dates';

export default function HistoryPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [meals, setMeals] = useState<Meal[]>([]);
  const [allMealDates, setAllMealDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allMeals = getDemoMeals();
    setMeals(allMeals);
    setAllMealDates(allMeals.map((m: any) => new Date(m.eaten_at || m.created_at)));
    setLoading(false);
  }, []);

  const filteredMeals = selectedDate
    ? meals.filter((m) => isSameDay(new Date(m.eaten_at || m.created_at), selectedDate))
    : [];

  return (
    <div className="space-y-4 pb-4">
      {/* 日历 */}
      <MonthCalendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        mealDates={allMealDates}
      />

      {/* 选中日期的餐食列表 */}
      {selectedDate && (
        <div>
          <h3 className="text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-3 px-1">
            {formatDate(selectedDate, 'yyyy年M月d日 EEEE')}
          </h3>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="card-elevated p-4 flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-tertiary animate-shimmer" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 bg-surface-tertiary rounded animate-shimmer" />
                    <div className="h-3 w-1/3 bg-surface-tertiary rounded animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredMeals.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-3xl">📅</span>
              <p className="text-ink-secondary text-caption mt-2">这天还没有记录</p>
              <button
                onClick={() => router.push('/camera')}
                className="mt-3 text-accent text-caption font-medium hover:underline"
              >
                添加记录
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} variant="compact" />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

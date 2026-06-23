'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { formatTime } from '@/lib/utils/dates';
import { getFoodEmoji } from '@/lib/utils/food-icons';
import type { Meal } from '@/types/meal';
import { NutritionBadge } from './NutritionBadge';

interface MealCardProps {
  meal: Meal;
  variant?: 'compact' | 'full';
  className?: string;
}

export function MealCard({ meal, variant = 'compact', className }: MealCardProps) {
  const router = useRouter();
  const mealEmoji = meal.items?.[0] ? getFoodEmoji(meal.items[0].name, meal.items[0].category) : '🍽️';

  if (variant === 'compact') {
    return (
      <button
        onClick={() => router.push(`/meal?id=${meal.id}`)}
        className={cn(
          'w-full card-interactive p-4 flex items-center gap-4 text-left',
          className
        )}
      >
        {/* Thumbnail */}
        <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
          {meal.photo_url ? (
            <img src={meal.photo_url} alt={meal.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl">{mealEmoji}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-body text-ink truncate">{meal.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-caption text-ink-tertiary">{formatTime(meal.eaten_at)}</span>
            <NutritionBadge label="Cal" value={meal.total_calories} unit="kcal" color="orange" size="sm" />
          </div>
        </div>

        {/* Arrow */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-tertiary flex-shrink-0">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    );
  }

  return (
    <div className={cn('card-elevated overflow-hidden', className)}>
      {meal.photo_url && (
        <div className="w-full aspect-[16/10] overflow-hidden">
          <img src={meal.photo_url} alt={meal.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{mealEmoji}</span>
          <h3 className="text-title text-ink">{meal.name}</h3>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <NutritionBadge label="热量" value={meal.total_calories} unit="kcal" color="orange" />
          <NutritionBadge label="蛋白质" value={meal.total_protein_g} unit="g" color="red" />
          <NutritionBadge label="碳水" value={meal.total_carbs_g} unit="g" color="yellow" />
          <NutritionBadge label="脂肪" value={meal.total_fat_g} unit="g" color="blue" />
        </div>
      </div>
    </div>
  );
}

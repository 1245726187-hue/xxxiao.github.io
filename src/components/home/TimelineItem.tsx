'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { formatTime } from '@/lib/utils/dates';
import { getFoodEmoji, getMealTypeEmoji } from '@/lib/utils/food-icons';
import { NutritionBadge } from '@/components/meal/NutritionBadge';
import type { Meal } from '@/types/meal';

interface TimelineItemProps {
  meal: Meal;
  index: number;
}

const mealTypeLabels: Record<string, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '零食',
};

export function TimelineItem({ meal, index }: TimelineItemProps) {
  const router = useRouter();
  const emoji = meal.items?.[0] ? getFoodEmoji(meal.items[0].name, meal.items[0].category) : getMealTypeEmoji(meal.meal_type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="relative pl-16 pb-5 group"
    >
      {/* Timeline dot */}
      <div className="absolute left-[18px] top-3 w-[18px] h-[18px] rounded-full border-3 border-surface
                      bg-accent shadow-sm z-10 group-hover:scale-125 transition-transform" />

      {/* Time label */}
      <span className="absolute left-0 top-2.5 text-[11px] font-medium text-ink-tertiary w-12 text-right">
        {formatTime(meal.eaten_at, 'HH:mm')}
      </span>

      {/* Meal card */}
      <button
        onClick={() => router.push(`/meal?id=${meal.id}`)}
        className="w-full card-interactive p-4 text-left"
      >
        <div className="flex items-start gap-3">
          {/* Icon/thumb */}
          <div className="w-10 h-10 rounded-xl bg-surface-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
            {meal.photo_url ? (
              <img src={meal.photo_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl">{emoji}</span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold text-body text-ink truncate">{meal.name}</h4>
              <span className="text-[10px] font-medium text-ink-tertiary bg-surface-tertiary px-2 py-0.5 rounded-pill flex-shrink-0">
                {mealTypeLabels[meal.meal_type] || meal.meal_type}
              </span>
            </div>

            {meal.items && meal.items.length > 0 && (
              <p className="text-caption text-ink-tertiary mt-0.5 truncate">
                {meal.items.map((item) => item.name).join(', ')}
              </p>
            )}

            <div className="flex items-center gap-1.5 mt-2">
              <NutritionBadge label="Cal" value={meal.total_calories} unit="kcal" color="orange" size="sm" />
              {meal.total_protein_g > 0 && (
                <NutritionBadge label="P" value={`${Math.round(meal.total_protein_g)}`} unit="g" color="red" size="sm" />
              )}
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

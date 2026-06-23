import type { FoodItem } from '@/types/meal';
import { getFoodEmoji } from '@/lib/utils/food-icons';
import { NutritionBadge } from './NutritionBadge';

interface FoodResultCardProps {
  item: FoodItem;
  index: number;
}

export function FoodResultCard({ item, index }: FoodResultCardProps) {
  const confidencePct = Math.round(item.confidence * 100);
  const emoji = getFoodEmoji(item.name, item.category);

  return (
    <div className="card-elevated p-4 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-start gap-4">
        {/* Food emoji */}
        <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">{emoji}</span>
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="font-semibold text-body text-ink truncate">{item.name}</h4>
            <span className="text-caption text-accent-green font-medium flex-shrink-0">
              {confidencePct}% 匹配度
            </span>
          </div>

          <p className="text-caption text-ink-tertiary mt-0.5">
            {item.quantity} {item.unit}
          </p>

          {/* Macros */}
          <div className="flex items-center gap-1.5 mt-3 flex-wrap">
            <NutritionBadge label="热量" value={item.calories} unit="kcal" color="orange" size="sm" />
            <NutritionBadge label="蛋白质" value={item.protein_g} unit="g" color="red" size="sm" />
            <NutritionBadge label="碳水" value={item.carbs_g} unit="g" color="yellow" size="sm" />
            <NutritionBadge label="脂肪" value={item.fat_g} unit="g" color="blue" size="sm" />
          </div>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="mt-3 w-full bg-surface-tertiary rounded-full h-1">
        <div
          className="h-1 rounded-full bg-accent-green transition-all duration-700"
          style={{ width: `${confidencePct}%` }}
        />
      </div>
    </div>
  );
}

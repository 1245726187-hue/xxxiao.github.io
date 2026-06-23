import type { NutritionTotals } from '@/types/meal';
import { MacroBadge } from './NutritionBadge';

interface NutritionGridProps {
  nutrition: NutritionTotals;
  goals?: Partial<NutritionTotals>;
}

export function NutritionGrid({ nutrition, goals }: NutritionGridProps) {
  return (
    <div className="card-elevated p-5">
      <h3 className="text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-4">
        营养详情
      </h3>
      <div className="grid grid-cols-4 gap-3">
        <MacroBadge label="热量" value={nutrition.calories} goal={goals?.calories} />
        <MacroBadge label="蛋白质" value={nutrition.protein_g} goal={goals?.protein_g} />
        <MacroBadge label="碳水" value={nutrition.carbs_g} goal={goals?.carbs_g} />
        <MacroBadge label="脂肪" value={nutrition.fat_g} goal={goals?.fat_g} />
      </div>

      {/* Macro ratio bar */}
      <div className="mt-5">
        <div className="flex gap-1 h-2 rounded-full overflow-hidden">
          {nutrition.protein_g > 0 && (
            <div
              className="bg-accent transition-all duration-500"
              style={{
                width: `${Math.round((nutrition.protein_g * 4 / (nutrition.calories || 1)) * 100)}%`,
              }}
            />
          )}
          {nutrition.carbs_g > 0 && (
            <div
              className="bg-accent-yellow transition-all duration-500"
              style={{
                width: `${Math.round((nutrition.carbs_g * 4 / (nutrition.calories || 1)) * 100)}%`,
              }}
            />
          )}
          {nutrition.fat_g > 0 && (
            <div
              className="bg-accent-red transition-all duration-500"
              style={{
                width: `${Math.round((nutrition.fat_g * 9 / (nutrition.calories || 1)) * 100)}%`,
              }}
            />
          )}
        </div>
        <div className="flex justify-between mt-2 text-[11px] text-ink-tertiary">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-accent inline-block" /> 蛋白质
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-accent-yellow inline-block" /> 碳水
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-accent-red inline-block" /> 脂肪
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { MacroRings } from './MacroRing';
import type { NutritionTotals } from '@/types/meal';

interface AINutritionSummaryProps {
  name: string;
  summaryText: string;
  totals: NutritionTotals;
  mealCount: number;
  healthScore?: number;
}

export function AINutritionSummary({
  name,
  summaryText,
  totals,
  mealCount,
  healthScore,
}: AINutritionSummaryProps) {
  const greeting = getGreeting();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 relative overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      {/* Greeting */}
      <h2 className="text-title text-ink mb-2 relative z-10">
        {greeting}, <span className="text-gradient">{name || 'there'}</span>
      </h2>

      {/* AI Summary text */}
      <div className="flex items-start gap-2 mb-5 relative z-10">
        <span className="text-sm mt-0.5">✨</span>
        <p className="text-ink-secondary text-caption leading-relaxed flex-1">
          {summaryText}
        </p>
      </div>

      {/* Macro rings */}
      <div className="relative z-10 mb-4">
        <MacroRings
          protein={totals.protein_g}
          carbs={totals.carbs_g}
          fat={totals.fat_g}
        />
      </div>

      {/* Summary stats */}
      <div className="flex items-center justify-between relative z-10 pt-3 border-t border-surface-tertiary">
        <div className="text-center">
          <p className="text-title font-bold text-ink">{totals.calories}</p>
          <p className="text-[10px] text-ink-tertiary uppercase tracking-wider">kcal</p>
        </div>
        <div className="h-8 w-px bg-surface-tertiary" />
        <div className="text-center">
          <p className="text-title font-bold text-ink">{mealCount}</p>
          <p className="text-[10px] text-ink-tertiary uppercase tracking-wider">餐</p>
        </div>
        <div className="h-8 w-px bg-surface-tertiary" />
        <div className="text-center">
          {healthScore !== undefined ? (
            <>
              <p className="text-title font-bold text-accent-green">{healthScore}</p>
              <p className="text-[10px] text-ink-tertiary uppercase tracking-wider">评分</p>
            </>
          ) : (
            <>
              <p className="text-title font-bold text-ink-tertiary">--</p>
              <p className="text-[10px] text-ink-tertiary uppercase tracking-wider">评分</p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return '早上好';
  if (hour < 17) return '下午好';
  return '晚上好';
}

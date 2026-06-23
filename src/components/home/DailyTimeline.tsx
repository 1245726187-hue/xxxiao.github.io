'use client';

import { motion } from 'framer-motion';
import type { Meal } from '@/types/meal';
import { TimelineItem } from './TimelineItem';

interface DailyTimelineProps {
  meals: Meal[];
  onAddMeal: () => void;
}

export function DailyTimeline({ meals, onAddMeal }: DailyTimelineProps) {
  if (meals.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-surface-tertiary flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🍽️</span>
        </div>
        <h3 className="text-title text-ink mb-2">还没有记录</h3>
        <p className="text-ink-secondary text-body mb-6">
          从今天开始记录你的饮食之旅
        </p>
        <button
          onClick={onAddMeal}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-card-sm
                     font-semibold shadow-lg shadow-accent/25 active:scale-95 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          记录第一餐
        </button>
      </motion.div>
    );
  }

  // Sort by eaten_at descending
  const sorted = [...meals].sort((a, b) => new Date(b.eaten_at).getTime() - new Date(a.eaten_at).getTime());

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[26px] top-2 bottom-2 w-px bg-surface-tertiary" />

      <div className="space-y-0">
        {sorted.map((meal, index) => (
          <TimelineItem key={meal.id} meal={meal} index={index} />
        ))}
      </div>

      {/* Add meal button */}
      <div className="relative pl-16 mt-2">
        <button
          onClick={onAddMeal}
          className="w-10 h-10 rounded-full border-2 border-dashed border-ink-tertiary/30
                     flex items-center justify-center text-ink-tertiary
                     hover:border-accent hover:text-accent transition-all active:scale-90"
          aria-label="添加餐食"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}

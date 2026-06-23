'use client';

import { useState } from 'react';
import type { Meal, FoodItem } from '@/types/meal';
import { cn } from '@/lib/utils/cn';

interface MealDetailFormProps {
  meal: Partial<Meal>;
  onChange: (updates: Partial<Meal>) => void;
  readOnly?: boolean;
}

const mealTypeLabels: Record<string, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  snack: '零食',
};

export function MealDetailForm({ meal, onChange, readOnly = false }: MealDetailFormProps) {
  return (
    <div className="space-y-5">
      {/* Meal name */}
      <div>
        <label className="block text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-2">
          餐食名称
        </label>
        <input
          type="text"
          value={meal.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="例如：健康鸡肉沙拉"
          readOnly={readOnly}
          className="w-full px-4 py-3 bg-surface-secondary border border-surface-tertiary rounded-card-sm
                     text-body text-ink placeholder:text-ink-tertiary
                     focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                     transition-all read-only:opacity-60 read-only:cursor-default"
        />
      </div>

      {/* Meal type */}
      <div>
        <label className="block text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-2">
          餐食类型
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
            <button
              key={type}
              type="button"
              disabled={readOnly}
              onClick={() => onChange({ meal_type: type })}
              className={cn(
                'py-2.5 px-3 rounded-card-sm text-caption font-medium capitalize transition-all',
                meal.meal_type === type
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface-secondary text-ink-secondary hover:bg-surface-tertiary',
                readOnly && 'cursor-default'
              )}
            >
              {mealTypeLabels[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-2">
            日期
          </label>
          <input
            type="date"
            value={meal.eaten_at ? new Date(meal.eaten_at).toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const time = meal.eaten_at ? new Date(meal.eaten_at).toISOString().split('T')[1] : '12:00';
              onChange({ eaten_at: `${e.target.value}T${time}` });
            }}
            readOnly={readOnly}
            className="w-full px-4 py-3 bg-surface-secondary border border-surface-tertiary rounded-card-sm
                       text-body text-ink focus:outline-none focus:border-accent
                       read-only:opacity-60"
          />
        </div>
        <div>
          <label className="block text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-2">
            时间
          </label>
          <input
            type="time"
            value={meal.eaten_at ? new Date(meal.eaten_at).toISOString().split('T')[1].substring(0, 5) : ''}
            onChange={(e) => {
              const date = meal.eaten_at ? new Date(meal.eaten_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
              onChange({ eaten_at: `${date}T${e.target.value}:00` });
            }}
            readOnly={readOnly}
            className="w-full px-4 py-3 bg-surface-secondary border border-surface-tertiary rounded-card-sm
                       text-body text-ink focus:outline-none focus:border-accent
                       read-only:opacity-60"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-2">
          备注
        </label>
        <textarea
          value={meal.notes || ''}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="这顿饭感觉怎么样？有什么想记录的..."
          readOnly={readOnly}
          rows={3}
          className="w-full px-4 py-3 bg-surface-secondary border border-surface-tertiary rounded-card-sm
                     text-body text-ink placeholder:text-ink-tertiary resize-none
                     focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
                     transition-all read-only:opacity-60 read-only:cursor-default"
        />
      </div>
    </div>
  );
}

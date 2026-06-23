'use client';

import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { getCalendarDays, isSameDay } from '@/lib/utils/dates';
import { cn } from '@/lib/utils/cn';

interface MonthCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  mealDates: Date[];
}

export function MonthCalendar({ selectedDate, onSelectDate, mealDates }: MonthCalendarProps) {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = getCalendarDays(year, month);

  function hasMeal(date: Date): boolean {
    return mealDates.some((d) => isSameDay(d, date));
  }

  function getMealCount(date: Date): number {
    return mealDates.filter((d) => isSameDay(d, date)).length;
  }

  return (
    <div className="card-elevated p-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewDate(subMonths(viewDate, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-secondary transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h3 className="text-body font-semibold text-ink">
          {format(viewDate, 'MMMM yyyy')}
        </h3>
        <button
          onClick={() => setViewDate(addMonths(viewDate, 1))}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-secondary transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {['一', '二', '三', '四', '五', '六', '日'].map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-ink-tertiary uppercase py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isSelected = selectedDate && isSameDay(day.date, selectedDate);
          const hasMealToday = hasMeal(day.date);
          const count = getMealCount(day.date);

          return (
            <button
              key={i}
              onClick={() => day.isCurrentMonth && onSelectDate(day.date)}
              disabled={!day.isCurrentMonth}
              className={cn(
                'relative aspect-square rounded-xl flex flex-col items-center justify-center',
                'transition-all duration-150',
                !day.isCurrentMonth && 'opacity-20 cursor-default',
                day.isCurrentMonth && 'hover:bg-surface-secondary active:scale-90',
                isSelected && 'bg-accent text-white hover:bg-accent shadow-sm',
                day.isToday && !isSelected && 'ring-1 ring-accent'
              )}
            >
              <span className={cn(
                'text-xs font-medium',
                isSelected ? 'text-white' : day.isToday ? 'text-accent' : 'text-ink',
              )}>
                {day.dayOfMonth}
              </span>

              {/* Meal indicators */}
              {hasMealToday && !isSelected && (
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: Math.min(count, 3) }).map((_, j) => (
                    <div key={j} className="w-1 h-1 rounded-full bg-accent" />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

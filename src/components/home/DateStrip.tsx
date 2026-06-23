'use client';

import { useRef, useEffect, useState } from 'react';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { cn } from '@/lib/utils/cn';

interface DateStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  mealDates?: Date[];
}

export function DateStrip({ selectedDate, onSelectDate, mealDates = [] }: DateStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i - 3)); // 3 days before, today, 10 days after

  useEffect(() => {
    const selectedIndex = days.findIndex((d) => isSameDay(d, selectedDate));
    if (scrollRef.current && selectedIndex >= 0) {
      const child = scrollRef.current.children[selectedIndex] as HTMLElement;
      child?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedDate, days]);

  function hasMeal(date: Date): boolean {
    return mealDates.some((d) => isSameDay(d, date));
  }

  return (
    <div className="w-full py-2">
      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto scrollbar-hide px-1"
      >
        {days.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, today);
          const hasMealToday = hasMeal(date);

          return (
            <button
              key={date.toISOString()}
              onClick={() => onSelectDate(date)}
              className={cn(
                'flex flex-col items-center justify-center min-w-[52px] h-[72px] rounded-card-sm',
                'transition-all duration-200 active:scale-95',
                isSelected
                  ? 'bg-accent text-white shadow-md shadow-accent/20'
                  : 'bg-surface hover:bg-surface-secondary text-ink-secondary'
              )}
            >
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {format(date, 'EEE')}
              </span>
              <span className={cn('text-lg font-semibold mt-0.5', isToday && !isSelected && 'text-accent')}>
                {format(date, 'd')}
              </span>
              {hasMealToday && !isSelected && (
                <span className="w-1 h-1 rounded-full bg-accent mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface MacroRingProps {
  value: number;
  goal: number;
  label: string;
  color: string;
  size?: number;
}

export function MacroRing({ value, goal, label, color, size = 72 }: MacroRingProps) {
  const percentage = Math.min(Math.round((value / goal) * 100), 100);
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={6}
            className="text-surface-tertiary"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-ink leading-none">{Math.round(value)}</span>
          <span className="text-[9px] text-ink-tertiary leading-tight mt-0.5">{label}</span>
        </div>
      </div>
    </div>
  );
}

interface MacroRingsProps {
  protein: number;
  carbs: number;
  fat: number;
  proteinGoal?: number;
  carbsGoal?: number;
  fatGoal?: number;
}

export function MacroRings({
  protein,
  carbs,
  fat,
  proteinGoal = 150,
  carbsGoal = 250,
  fatGoal = 65,
}: MacroRingsProps) {
  return (
    <div className="flex justify-center gap-6">
      <MacroRing value={protein} goal={proteinGoal} label="蛋白质" color="#FF6B35" />
      <MacroRing value={carbs} goal={carbsGoal} label="碳水" color="#FFCC00" />
      <MacroRing value={fat} goal={fatGoal} label="脂肪" color="#FF3B30" />
    </div>
  );
}

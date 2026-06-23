import { cn } from '@/lib/utils/cn';

interface NutritionBadgeProps {
  label: string;
  value: number | string;
  unit?: string;
  color?: 'orange' | 'green' | 'blue' | 'red' | 'yellow' | 'gray';
  size?: 'sm' | 'md';
}

const colorClasses = {
  orange: 'bg-accent-light text-accent',
  green: 'bg-green-light text-accent-green',
  blue: 'bg-blue-light text-accent-blue',
  red: 'bg-red-light text-accent-red',
  yellow: 'bg-yellow-light text-accent-yellow',
  gray: 'bg-surface-tertiary text-ink-secondary',
};

export function NutritionBadge({
  label,
  value,
  unit = 'g',
  color = 'gray',
  size = 'md',
}: NutritionBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill font-medium',
        colorClasses[color],
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-caption'
      )}
    >
      <span className="font-semibold">{value}</span>
      <span className="opacity-70">{unit}</span>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function MacroBadge({ label, value, goal }: { label: string; value: number; goal?: number }) {
  const pct = goal ? Math.round((value / goal) * 100) : null;
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-title font-bold text-ink">{Math.round(value)}</span>
      <span className="text-caption text-ink-tertiary">{label}</span>
      {goal && (
        <div className="w-full bg-surface-tertiary rounded-full h-1 mt-1">
          <div
            className="h-1 rounded-full bg-accent transition-all duration-500"
            style={{ width: `${Math.min(pct!, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState, useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface AnimatedProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export default function AnimatedProgress({
  value,
  size = 120,
  strokeWidth = 8,
  color = '#FF6B35',
  label,
  showPercentage = true,
  className,
}: AnimatedProgressProps) {
  const glowId = useId();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedValue = Math.max(0, Math.min(100, value));
  const offset = circumference - (clampedValue / 100) * circumference;
  const center = size / 2;

  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    setAnimatedOffset(offset);
  }, [offset]);

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <filter id={glowId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-ink/10"
        />

        {/* Animated progress arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: animatedOffset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          filter={`url(#${glowId})`}
        />
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {showPercentage && (
          <span className="text-2xl font-bold text-ink tabular-nums">
            {Math.round(clampedValue)}%
          </span>
        )}
        {label && (
          <span className="text-caption text-ink-secondary mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

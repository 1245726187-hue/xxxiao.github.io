'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AnalysisStage } from '@/types/ai';

const STAGES: AnalysisStage[] = [
  { id: 'capture', label: '正在捕获图像...', icon: '📷', status: 'pending' },
  { id: 'analyze', label: '正在分析食物...', icon: '🔍', status: 'pending' },
  { id: 'identify', label: '正在识别成分...', icon: '🔬', status: 'pending' },
  { id: 'nutrition', label: '正在计算营养...', icon: '⚡', status: 'pending' },
  { id: 'insight', label: '正在生成洞察...', icon: '✨', status: 'pending' },
];

const STAGE_DURATIONS = [500, 2000, 2000, 1800, 1200];

interface AnalysisProgressProps {
  imageUrl: string;
  onComplete: () => void;
}

export function AnalysisProgress({ imageUrl, onComplete }: AnalysisProgressProps) {
  const [stages, setStages] = useState<AnalysisStage[]>(STAGES.map((s) => ({ ...s })));
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useEffect(() => {
    let stageIndex = 0;
    const timers: NodeJS.Timeout[] = [];

    function runNextStage() {
      if (stageIndex >= STAGES.length) {
        onComplete();
        return;
      }

      // Mark current as active
      setStages((prev) =>
        prev.map((s, i) =>
          i === stageIndex ? { ...s, status: 'active' as const } : s
        )
      );
      setCurrentStageIndex(stageIndex);

      // Update progress
      const startProgress = (stageIndex / STAGES.length) * 100;
      const endProgress = ((stageIndex + 1) / STAGES.length) * 100;
      setProgress(startProgress);

      const steps = 20;
      const stepDuration = STAGE_DURATIONS[stageIndex] / steps;
      let step = 0;

      const progressTimer = setInterval(() => {
        step++;
        const pct = startProgress + (endProgress - startProgress) * (step / steps);
        setProgress(Math.min(pct, 100));
        if (step >= steps) clearInterval(progressTimer);
      }, stepDuration);

      // Complete stage after delay
      const completeTimer = setTimeout(() => {
        setStages((prev) =>
          prev.map((s, i) =>
            i === stageIndex ? { ...s, status: 'complete' as const } : s
          )
        );
        stageIndex++;
        runNextStage();
      }, STAGE_DURATIONS[stageIndex]);

      timers.push(progressTimer, completeTimer);
    }

    runNextStage();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      {/* Image preview with scanning effect */}
      <div className="relative w-64 h-64 rounded-card-lg overflow-hidden mb-10 shadow-float">
        <img src={imageUrl} alt="Analyzing meal" className="w-full h-full object-cover" />

        {/* Scanning line overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent" />

        {/* Animated bounding boxes */}
        <AnimatePresence>
          {currentStageIndex >= 1 && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: [0.95, 1.05, 1] }}
                transition={{ repeat: 2, duration: 1 }}
                className="absolute top-[20%] left-[15%] w-[35%] h-[25%] border-2 border-accent rounded-lg"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: [0.95, 1.05, 1] }}
                transition={{ repeat: 2, duration: 1, delay: 0.3 }}
                className="absolute top-[30%] right-[15%] w-[30%] h-[30%] border-2 border-accent-green rounded-lg"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: [0.95, 1.05, 1] }}
                transition={{ repeat: 2, duration: 1, delay: 0.6 }}
                className="absolute bottom-[15%] left-[25%] w-[40%] h-[22%] border-2 border-accent-blue rounded-lg"
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Progress ring */}
      <div className="relative mb-8">
        <svg width="128" height="128" className="-rotate-90">
          <circle
            cx="64"
            cy="64"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-surface-tertiary"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="54"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B35" />
              <stop offset="100%" stopColor="#34C759" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-title font-bold text-ink">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Stages */}
      <div className="w-full max-w-xs space-y-3">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-lg w-7 flex-shrink-0">{stage.icon}</span>
            <span
              className={`text-caption flex-1 ${
                stage.status === 'complete'
                  ? 'text-accent-green'
                  : stage.status === 'active'
                  ? 'text-ink font-medium'
                  : 'text-ink-tertiary'
              }`}
            >
              {stage.label}
            </span>
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
              {stage.status === 'complete' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {stage.status === 'active' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full"
                />
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

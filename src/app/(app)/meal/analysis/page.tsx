'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { BackgroundRemovedImage } from '@/components/meal/BackgroundRemovedImage';
import { FoodResultCard } from '@/components/meal/FoodResultCard';
import { NutritionGrid } from '@/components/meal/NutritionGrid';
import { saveDemoMeal } from '@/lib/demo-mode';
import { useToast } from '@/components/ui/Toast';
import type { FoodItem, NutritionTotals } from '@/types/meal';

// 模拟 AI 食物识别
function simulateRecognition(): { items: FoodItem[]; summary: string; mealType: string } {
  const hour = new Date().getHours();
  let mealType: string;
  if (hour < 10) mealType = 'breakfast';
  else if (hour < 15) mealType = 'lunch';
  else mealType = 'dinner';

  const meals: Record<string, { items: FoodItem[]; summary: string }> = {
    breakfast: {
      items: [
        { id: '1', name: '炒鸡蛋', quantity: 2, unit: '个', calories: 180, protein_g: 14, carbs_g: 2, fat_g: 12, confidence: 0.95, emoji: '🥚', category: 'protein' },
        { id: '2', name: '全麦吐司', quantity: 2, unit: '片', calories: 220, protein_g: 8, carbs_g: 40, fat_g: 3, confidence: 0.91, emoji: '🍞', category: 'carb' },
        { id: '3', name: '混合浆果', quantity: 1, unit: '杯', calories: 70, protein_g: 1, carbs_g: 17, fat_g: 0.5, confidence: 0.87, emoji: '🫐', category: 'fruit' },
      ],
      summary: '营养均衡的早餐！鸡蛋提供优质蛋白质，全麦吐司提供缓释碳水，浆果富含抗氧化物和维生素C。',
    },
    lunch: {
      items: [
        { id: '1', name: '香煎鸡胸肉', quantity: 1, unit: '份', calories: 280, protein_g: 52, carbs_g: 0, fat_g: 6, confidence: 0.96, emoji: '🍗', category: 'protein' },
        { id: '2', name: '凯撒沙拉', quantity: 1, unit: '碗', calories: 180, protein_g: 6, carbs_g: 10, fat_g: 14, confidence: 0.89, emoji: '🥗', category: 'vegetable' },
        { id: '3', name: '糙米饭', quantity: 1, unit: '碗', calories: 216, protein_g: 5, carbs_g: 45, fat_g: 1.6, confidence: 0.93, emoji: '🍚', category: 'carb' },
      ],
      summary: '高蛋白午餐搭配！鸡胸肉富含优质蛋白，糙米提供持久能量，沙拉补充膳食纤维和微量元素。',
    },
    dinner: {
      items: [
        { id: '1', name: '三文鱼排', quantity: 1, unit: '块', calories: 360, protein_g: 40, carbs_g: 0, fat_g: 22, confidence: 0.94, emoji: '🐟', category: 'protein' },
        { id: '2', name: '清炒芦笋', quantity: 6, unit: '根', calories: 50, protein_g: 3, carbs_g: 6, fat_g: 2, confidence: 0.88, emoji: '🌿', category: 'vegetable' },
        { id: '3', name: '红薯泥', quantity: 1, unit: '碗', calories: 180, protein_g: 3, carbs_g: 41, fat_g: 0.5, confidence: 0.90, emoji: '🍠', category: 'carb' },
      ],
      summary: '富含 Omega-3 的优质晚餐！三文鱼提供有益心脏健康的不饱和脂肪酸和优质蛋白质，红薯富含维生素A，芦笋补充膳食纤维。',
    },
  };

  const data = meals[mealType] || meals.lunch;
  return { ...data, mealType };
}

function AnalysisResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [imageUrl, setImageUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const result = useMemo(() => simulateRecognition(), []);

  useEffect(() => {
    const image = searchParams.get('image');
    if (image) {
      setImageUrl(decodeURIComponent(image));
    }
  }, [searchParams]);

  const totals: NutritionTotals = {
    calories: result.items.reduce((s, i) => s + i.calories, 0),
    protein_g: result.items.reduce((s, i) => s + i.protein_g, 0),
    carbs_g: result.items.reduce((s, i) => s + i.carbs_g, 0),
    fat_g: result.items.reduce((s, i) => s + i.fat_g, 0),
  };

  const mealTypeLabels: Record<string, string> = {
    breakfast: '早餐',
    lunch: '午餐',
    dinner: '晚餐',
    snack: '零食',
  };

  function handleSave() {
    setSaving(true);
    const mealName = result.items.map((i) => i.name).join(' + ');
    saveDemoMeal({
      name: mealName,
      meal_type: result.mealType,
      photo_url: imageUrl,
      total_calories: totals.calories,
      total_protein_g: totals.protein_g,
      total_carbs_g: totals.carbs_g,
      total_fat_g: totals.fat_g,
      notes: result.summary,
      items: result.items,
      eaten_at: new Date().toISOString(),
    });

    setTimeout(() => {
      showToast('success', '餐食已保存！');
      router.push('/home');
    }, 300);
  }

  return (
    <div className="space-y-5 pb-8">
      {/* 背景已去除的食物图片 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {imageUrl && (
          <BackgroundRemovedImage src={imageUrl} alt="你的餐食" size="md" />
        )}
      </motion.div>

      {/* AI 分析摘要 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-elevated p-5"
      >
        <div className="flex items-start gap-2">
          <span className="text-lg">✨</span>
          <div>
            <h3 className="font-semibold text-body text-ink mb-1">AI 分析</h3>
            <p className="text-caption text-ink-secondary leading-relaxed">{result.summary}</p>
          </div>
        </div>
      </motion.div>

      {/* 检测到的食物 */}
      <div>
        <h3 className="text-caption font-semibold text-ink-secondary uppercase tracking-wider mb-3 px-1">
          识别到的食物
        </h3>
        <div className="space-y-3">
          {result.items.map((item, i) => (
            <FoodResultCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* 营养详情 */}
      <NutritionGrid nutrition={totals} />

      {/* 操作按钮 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-3 pt-2"
      >
        <button
          onClick={() => router.back()}
          className="flex-1 py-4 border-2 border-surface-tertiary text-ink-secondary rounded-card-sm
                     font-semibold text-body hover:bg-surface-secondary active:scale-[0.98] transition-all"
        >
          编辑
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-[2] py-4 bg-accent text-white rounded-card-sm font-semibold text-body
                     shadow-lg shadow-accent/25 active:scale-[0.98] transition-all
                     disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              保存中...
            </>
          ) : (
            '保存餐食'
          )}
        </button>
      </motion.div>
    </div>
  );
}

export default function AnalysisResultPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <AnalysisResultContent />
    </Suspense>
  );
}

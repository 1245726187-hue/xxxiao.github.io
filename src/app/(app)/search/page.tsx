'use client';

import { useState, useEffect, useMemo } from 'react';
import { SearchBar, FilterChips } from '@/components/search/SearchBar';
import { MealCard } from '@/components/meal/MealCard';
import { getDemoMeals } from '@/lib/demo-mode';
import type { Meal } from '@/types/meal';

const TYPE_FILTERS = [
  { id: 'all', label: '全部' },
  { id: 'breakfast', label: '早餐' },
  { id: 'lunch', label: '午餐' },
  { id: 'dinner', label: '晚餐' },
  { id: 'snack', label: '零食' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);

  useEffect(() => {
    setAllMeals(getDemoMeals());
  }, []);

  const meals = useMemo(() => {
    let filtered = allMeals;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter((m: any) =>
        m.name?.toLowerCase().includes(q) ||
        m.notes?.toLowerCase().includes(q) ||
        m.items?.some((item: any) => item.name?.toLowerCase().includes(q))
      );
    }
    if (typeFilter && typeFilter !== 'all') {
      filtered = filtered.filter((m: any) => m.meal_type === typeFilter);
    }
    return filtered;
  }, [allMeals, query, typeFilter]);

  return (
    <div className="space-y-4 pb-4">
      {/* 搜索框 */}
      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery('')}
        placeholder="搜索餐食、食材..."
        autoFocus
      />

      {/* 分类筛选 */}
      <FilterChips
        options={TYPE_FILTERS}
        selected={typeFilter}
        onSelect={setTypeFilter}
      />

      {/* 搜索结果 */}
      {meals.length === 0 && query ? (
        <div className="text-center py-16">
          <span className="text-4xl">🔍</span>
          <h3 className="text-title text-ink mt-4 mb-1">未找到结果</h3>
          <p className="text-ink-secondary text-caption">
            没有找到与 &quot;{query}&quot; 匹配的餐食，试试其他关键词。
          </p>
        </div>
      ) : meals.length === 0 && !query ? (
        <div className="text-center py-16">
          <span className="text-4xl">🍽️</span>
          <h3 className="text-title text-ink mt-4 mb-1">搜索你的餐食</h3>
          <p className="text-ink-secondary text-caption">
            输入食物名称或食材，查找过去的饮食记录。
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-caption text-ink-tertiary px-1">
            {meals.length} 条结果
          </p>
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} variant="compact" />
          ))}
        </div>
      )}
    </div>
  );
}

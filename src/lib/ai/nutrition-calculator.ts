import type { FoodItem, NutritionTotals, Meal } from '@/types/meal';

export function calculateMealTotals(items: FoodItem[]): NutritionTotals {
  return items.reduce(
    (totals, item) => ({
      calories: totals.calories + Math.round(item.calories),
      protein_g: totals.protein_g + Math.round(item.protein_g * 10) / 10,
      carbs_g: totals.carbs_g + Math.round(item.carbs_g * 10) / 10,
      fat_g: totals.fat_g + Math.round(item.fat_g * 10) / 10,
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 },
  );
}

export function calculateDailyTotals(meals: Meal[]): NutritionTotals {
  return meals.reduce(
    (totals, meal) => ({
      calories: totals.calories + (meal.total_calories ?? 0),
      protein_g: totals.protein_g + (meal.total_protein_g ?? 0),
      carbs_g: totals.carbs_g + (meal.total_carbs_g ?? 0),
      fat_g: totals.fat_g + (meal.total_fat_g ?? 0),
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 },
  );
}

export function getMacroPercentages(totals: NutritionTotals): {
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
} {
  const proteinCal = totals.protein_g * 4;
  const carbsCal = totals.carbs_g * 4;
  const fatCal = totals.fat_g * 9;
  const totalCal = proteinCal + carbsCal + fatCal;

  if (totalCal === 0) {
    return { proteinPct: 0, carbsPct: 0, fatPct: 0 };
  }

  return {
    proteinPct: Math.round((proteinCal / totalCal) * 100),
    carbsPct: Math.round((carbsCal / totalCal) * 100),
    fatPct: Math.round((fatCal / totalCal) * 100),
  };
}

export function getHealthScore(
  totals: NutritionTotals,
  goal: NutritionTotals,
): number {
  let score = 0;

  score += scoreDimension(totals.calories, goal.calories, 0.2, 30);
  score += scoreDimension(totals.protein_g, goal.protein_g, 0.3, 25);
  score += scoreDimension(totals.carbs_g, goal.carbs_g, 0.3, 25);
  score += scoreDimension(totals.fat_g, goal.fat_g, 0.3, 20);

  return Math.max(0, Math.min(100, Math.round(score)));
}

function scoreDimension(
  actual: number,
  goal: number,
  toleranceRatio: number,
  maxPoints: number,
): number {
  if (goal === 0) return maxPoints;

  const ratio = actual / goal;
  const tolerance = toleranceRatio;

  if (ratio >= 1 - tolerance && ratio <= 1 + tolerance) {
    return maxPoints;
  }

  const deviation = Math.abs(1 - ratio);
  const cappedDeviation = Math.min(deviation, tolerance * 3);
  const penalty = (cappedDeviation / (tolerance * 3)) * maxPoints;

  return maxPoints - penalty;
}

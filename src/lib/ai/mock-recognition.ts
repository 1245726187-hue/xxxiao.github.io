import type { AnalysisStage, RecognitionResult } from '@/types/ai';
import type { FoodItem, NutritionTotals } from '@/types/meal';
import {
  foodDatabase,
  getFoodsByMealType,
  getFoodById,
} from './mock-food-database';
import { calculateMealTotals } from './nutrition-calculator';
import { generateSummary } from './summary-generator';

type ProgressCallback = (stages: AnalysisStage[]) => void;

function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33 + str.charCodeAt(i)) & 0xffffffff;
  }
  return hash >>> 0;
}

function createSeededRng(seed: number) {
  let state = seed;
  return function next(): number {
    state = (state * 1664525 + 1013904223) & 0xffffffff;
    return (state >>> 0) / 0xffffffff;
  };
}

function getMealTypeFromHour(hour: number): 'breakfast' | 'lunch' | 'dinner' | 'snack' {
  if (hour >= 5 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  if (hour >= 16 && hour < 23) return 'dinner';
  return 'snack';
}

function generateBoundingBox(
  index: number,
  total: number,
  rng: () => number,
): { x: number; y: number; w: number; h: number } {
  const gridCols = Math.ceil(Math.sqrt(total));
  const col = index % gridCols;
  const row = Math.floor(index / gridCols);

  const cellW = 1 / gridCols;
  const cellH = 1 / Math.ceil(total / gridCols);

  const margin = 0.04;
  const x = col * cellW + margin + rng() * (cellW * 0.3);
  const y = row * cellH + margin + rng() * (cellH * 0.3);
  const w = Math.min(cellW - margin * 2 - rng() * 0.1, 0.45);
  const h = Math.min(cellH - margin * 2 - rng() * 0.1, 0.45);

  return {
    x: Math.round(x * 1000) / 1000,
    y: Math.round(y * 1000) / 1000,
    w: Math.round(w * 1000) / 1000,
    h: Math.round(h * 1000) / 1000,
  };
}

const STAGES: AnalysisStage[] = [
  { id: 'capture', label: 'Capturing image...', icon: 'camera', status: 'pending' },
  { id: 'analyze', label: 'Analyzing food items...', icon: 'scan', status: 'pending' },
  { id: 'identify', label: 'Identifying ingredients...', icon: 'microscope', status: 'pending' },
  { id: 'calculate', label: 'Calculating nutrition...', icon: 'calculator', status: 'pending' },
  { id: 'insights', label: 'Generating insights...', icon: 'sparkle', status: 'pending' },
];

export function getAnalysisStages(): AnalysisStage[] {
  return STAGES.map((s) => ({ ...s }));
}

export function getStageDuration(stageIndex: number): number {
  const durations = [500, 2000, 2000, 1500, 1000];
  return durations[stageIndex] ?? 1000;
}

export async function mockRecognize(
  imageUrl: string,
  onProgress?: ProgressCallback,
): Promise<RecognitionResult> {
  const seed = hashString(imageUrl);
  const rng = createSeededRng(seed);

  const now = new Date();
  const currentHour = now.getHours();
  const mealType = getMealTypeFromHour(currentHour);

  const candidateItems = getFoodsByMealType(mealType);
  if (candidateItems.length === 0) {
    const fallback = foodDatabase.slice(0, 10);
    return buildResult(fallback.slice(0, 1), mealType, rng, 0);
  }

  const itemCount = weightedItemCount(rng);
  const selectedItems: typeof candidateItems = [];

  const firstItem = candidateItems[Math.floor(rng() * candidateItems.length)];
  selectedItems.push(firstItem);

  for (let i = 1; i < itemCount; i++) {
    const shouldPair = rng() < 0.7 && selectedItems[0].commonPairings.length > 0;
    let nextItem;

    if (shouldPair) {
      const pairingId = selectedItems[0].commonPairings[
        Math.floor(rng() * selectedItems[0].commonPairings.length)
      ];
      const pairedFood = getFoodById(pairingId);
      if (pairedFood && !selectedItems.find((s) => s.id === pairedFood.id)) {
        nextItem = pairedFood;
      }
    }

    if (!nextItem) {
      let attempts = 0;
      do {
        nextItem = candidateItems[Math.floor(rng() * candidateItems.length)];
        attempts++;
      } while (
        selectedItems.find((s) => s.id === nextItem!.id) &&
        attempts < 50
      );
    }

    if (nextItem && !selectedItems.find((s) => s.id === nextItem.id)) {
      selectedItems.push(nextItem);
    }
  }

  const processingTime = await simulateStages(onProgress);

  return buildResult(selectedItems, mealType, rng, processingTime);
}

function weightedItemCount(rng: () => number): number {
  const roll = rng();
  if (roll < 0.15) return 1;
  if (roll < 0.55) return 2;
  if (roll < 0.85) return 3;
  return 4;
}

async function simulateStages(onProgress?: ProgressCallback): Promise<number> {
  if (!onProgress) {
    const delay = 500 + 2000 + 2000 + 1500 + 1000;
    return delay;
  }

  const stages = STAGES.map((s) => ({ ...s }));
  const durations = [500, 2000, 2000, 1500, 1000];
  const startTime = Date.now();

  for (let i = 0; i < stages.length; i++) {
    stages[i].status = 'active';
    onProgress([...stages]);
    await sleep(durations[i]);
    stages[i].status = 'complete';
    onProgress([...stages]);
  }

  return Date.now() - startTime;
}

function buildResult(
  selectedItems: typeof foodDatabase extends (infer T)[] ? T[] : never,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
  rng: () => number,
  processingTime: number,
): RecognitionResult {
  const items: FoodItem[] = selectedItems.map((mock, i) => {
    const quantityMultiplier = 0.75 + rng() * 0.75;
    const quantity = Math.round(mock.servingSize * quantityMultiplier);
    const confidence = Math.min(
      1,
      Math.max(0, mock.confidenceBase + (rng() * 0.1 - 0.05)),
    );

    return {
      id: `item-${i}-${Date.now()}`,
      name: mock.name,
      quantity,
      unit: mock.servingUnit,
      calories: Math.round(mock.perServing.calories * quantityMultiplier),
      protein_g: Math.round(mock.perServing.protein_g * quantityMultiplier * 10) / 10,
      carbs_g: Math.round(mock.perServing.carbs_g * quantityMultiplier * 10) / 10,
      fat_g: Math.round(mock.perServing.fat_g * quantityMultiplier * 10) / 10,
      confidence: Math.round(confidence * 1000) / 1000,
      emoji: mock.emoji,
      category: mock.category,
      bbox: generateBoundingBox(i, selectedItems.length, rng),
    };
  });

  const totalNutrition: NutritionTotals = calculateMealTotals(items);
  const summary = generateSummary(items, totalNutrition, mealType);

  return {
    items,
    totalNutrition,
    summary,
    mealType,
    processingTime,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

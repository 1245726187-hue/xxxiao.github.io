import type { FoodItem, NutritionTotals } from './meal';

export interface RecognitionRequest {
  imageUrl: string;
}

export interface RecognitionResult {
  items: FoodItem[];
  totalNutrition: NutritionTotals;
  summary: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  processingTime: number;
}

export type StageStatus = 'pending' | 'active' | 'complete';

export interface AnalysisStage {
  id: string;
  label: string;
  icon: string;
  status: StageStatus;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  confidence: number;
  emoji: string;
  category: string;
  bbox?: { x: number; y: number; w: number; h: number };
}

export interface NutritionTotals {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface Meal {
  id: string;
  user_id: string;
  name: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  photo_url?: string;
  notes?: string;
  eaten_at: string;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  is_manual: boolean;
  items?: FoodItem[];
  created_at: string;
  updated_at: string;
}

export interface DailySummary {
  id: string;
  summary_date: string;
  summary_text: string;
  health_score: number;
  total_calories: number;
  total_protein_g: number;
  total_carbs_g: number;
  total_fat_g: number;
  meal_count: number;
}

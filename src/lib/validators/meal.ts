import { z } from 'zod';

export const foodItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Food name is required').max(200),
  quantity: z.number().positive('Quantity must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  calories: z.number().min(0),
  protein_g: z.number().min(0),
  carbs_g: z.number().min(0),
  fat_g: z.number().min(0),
  confidence: z.number().min(0).max(1).optional(),
  emoji: z.string().optional(),
  category: z.string().optional(),
  bbox: z
    .object({
      x: z.number(),
      y: z.number(),
      w: z.number().positive(),
      h: z.number().positive(),
    })
    .optional(),
});

export const mealSchema = z.object({
  name: z.string().min(1, 'Meal name is required').max(200),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner', 'snack'] as const, {
    message: 'Meal type must be breakfast, lunch, dinner, or snack',
  }),
  photo_url: z.string().url().optional().or(z.literal('')),
  notes: z.string().max(2000).optional(),
  eaten_at: z.string().datetime({ message: 'Invalid date format' }),
  total_calories: z.number().min(0),
  total_protein_g: z.number().min(0),
  total_carbs_g: z.number().min(0),
  total_fat_g: z.number().min(0),
  is_manual: z.boolean().default(true),
  items: z.array(foodItemSchema).optional(),
});

export const mealUpdateSchema = mealSchema.partial();

export const recognizeRequestSchema = z.object({
  imageUrl: z.string().url('Valid image URL is required'),
});

export const createMealSchema = mealSchema;
export const updateMealSchema = mealUpdateSchema;

export type CreateMealInput = z.infer<typeof createMealSchema>;
export type UpdateMealInput = z.infer<typeof updateMealSchema>;
export type MealFormData = z.infer<typeof mealSchema>;
export type MealUpdateData = z.infer<typeof mealUpdateSchema>;
export type FoodItemData = z.infer<typeof foodItemSchema>;

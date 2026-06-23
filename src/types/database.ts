export interface Database {
  public: {
    Tables: {
      meals: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
          photo_url: string | null;
          notes: string | null;
          eaten_at: string;
          total_calories: number;
          total_protein_g: number;
          total_carbs_g: number;
          total_fat_g: number;
          is_manual: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
          photo_url?: string | null;
          notes?: string | null;
          eaten_at?: string;
          total_calories: number;
          total_protein_g: number;
          total_carbs_g: number;
          total_fat_g: number;
          is_manual?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
          photo_url?: string | null;
          notes?: string | null;
          eaten_at?: string;
          total_calories?: number;
          total_protein_g?: number;
          total_carbs_g?: number;
          total_fat_g?: number;
          is_manual?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      meal_items: {
        Row: {
          id: string;
          meal_id: string;
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
          bbox_x: number | null;
          bbox_y: number | null;
          bbox_w: number | null;
          bbox_h: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          meal_id: string;
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
          bbox_x?: number | null;
          bbox_y?: number | null;
          bbox_w?: number | null;
          bbox_h?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          meal_id?: string;
          name?: string;
          quantity?: number;
          unit?: string;
          calories?: number;
          protein_g?: number;
          carbs_g?: number;
          fat_g?: number;
          confidence?: number;
          emoji?: string;
          category?: string;
          bbox_x?: number | null;
          bbox_y?: number | null;
          bbox_w?: number | null;
          bbox_h?: number | null;
        };
        Relationships: [];
      };
      daily_summaries: {
        Row: {
          id: string;
          user_id: string;
          summary_date: string;
          summary_text: string;
          health_score: number;
          total_calories: number;
          total_protein_g: number;
          total_carbs_g: number;
          total_fat_g: number;
          meal_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          summary_date: string;
          summary_text: string;
          health_score: number;
          total_calories: number;
          total_protein_g: number;
          total_carbs_g: number;
          total_fat_g: number;
          meal_count: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          summary_date?: string;
          summary_text?: string;
          health_score?: number;
          total_calories?: number;
          total_protein_g?: number;
          total_carbs_g?: number;
          total_fat_g?: number;
          meal_count?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

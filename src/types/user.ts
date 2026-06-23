export interface UserProfile {
  id: string;
  display_name: string;
  avatar_url?: string;
  calorie_goal: number;
  protein_pct: number;
  carbs_pct: number;
  fat_pct: number;
  dietary_prefs: string[];
  streak_count: number;
  created_at: string;
}

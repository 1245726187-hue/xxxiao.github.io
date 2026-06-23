/**
 * Demo mode utilities — used when no Supabase backend is configured.
 * The app works fully offline with mock data.
 */

const DEMO_KEY = 'food-memory-demo-auth';

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return true;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url.includes('your-project-id') || url.includes('your-project')) {
    return true;
  }
  return false;
}

export function setDemoAuth(email: string, name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEMO_KEY, JSON.stringify({ email, name, signedInAt: Date.now() }));
}

export function getDemoAuth(): { email: string; name: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearDemoAuth(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(DEMO_KEY);
}

export function isDemoAuthenticated(): boolean {
  return getDemoAuth() !== null;
}

// Demo meal storage in localStorage
const DEMO_MEALS_KEY = 'food-memory-demo-meals';

export function getDemoMeals() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(DEMO_MEALS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveDemoMeal(meal: any) {
  if (typeof window === 'undefined') return;
  const meals = getDemoMeals();
  meals.unshift({ ...meal, id: `demo-${Date.now()}`, created_at: new Date().toISOString() });
  localStorage.setItem(DEMO_MEALS_KEY, JSON.stringify(meals));
}

export function getDemoMealDates() {
  const meals = getDemoMeals();
  return meals.map((m: any) => new Date(m.eaten_at || m.created_at));
}

import type { Meal } from '@/types/meal';

const foodEmojiMap: Record<string, string> = {
  rice: '🍚',
  noodle: '🍜',
  bread: '🍞',
  pasta: '🍝',
  pizza: '🍕',
  hamburger: '🍔',
  fries: '🍟',
  hotdog: '🌭',
  sandwich: '🥪',
  salad: '🥗',
  soup: '🍲',
  steak: '🥩',
  chicken: '🍗',
  egg: '🥚',
  fish: '🐟',
  sushi: '🍣',
  shrimp: '🍤',
  tofu: '🧈',
  cheese: '🧀',
  milk: '🥛',
  yogurt: '🧃',
  apple: '🍎',
  banana: '🍌',
  orange: '🍊',
  grape: '🍇',
  watermelon: '🍉',
  strawberry: '🍓',
  peach: '🍑',
  cherry: '🍒',
  mango: '🥭',
  pineapple: '🍍',
  cake: '🎂',
  cookie: '🍪',
  chocolate: '🍫',
  candy: '🍬',
  icecream: '🍦',
  donut: '🍩',
  coffee: '☕',
  tea: '🍵',
  juice: '🧃',
  water: '💧',
  beer: '🍺',
  wine: '🍷',
};

const categoryEmojiMap: Record<string, string> = {
  staple: '🍚',
  protein: '🥩',
  vegetable: '🥬',
  fruit: '🍎',
  dairy: '🥛',
  snack: '🍪',
  beverage: '🥤',
  dessert: '🍰',
  seafood: '🦐',
  soup: '🍲',
  condiment: '🧂',
  nut: '🥜',
};

const mealTypeEmojiMap: Record<Meal['meal_type'], string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍿',
};

const categoryColorMap: Record<string, string> = {
  staple: '#FFCC00',
  protein: '#FF6B35',
  vegetable: '#34C759',
  fruit: '#FF3B30',
  dairy: '#007AFF',
  snack: '#FFCC00',
  beverage: '#007AFF',
  dessert: '#FF6B35',
  seafood: '#007AFF',
  soup: '#FF6B35',
  condiment: '#AEAEB2',
  nut: '#FFCC00',
};

export function getFoodEmoji(name: string, category?: string): string {
  const normalized = name.toLowerCase().trim();

  const directMatch = foodEmojiMap[normalized];
  if (directMatch) return directMatch;

  for (const [key, emoji] of Object.entries(foodEmojiMap)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return emoji;
    }
  }

  if (category && categoryEmojiMap[category]) {
    return categoryEmojiMap[category];
  }

  return '🍽️';
}

export function getMealTypeEmoji(type: Meal['meal_type']): string {
  return mealTypeEmojiMap[type] ?? '🍽️';
}

export function getCategoryColor(category: string): string {
  return categoryColorMap[category] ?? '#AEAEB2';
}

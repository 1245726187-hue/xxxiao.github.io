import type { FoodItem, NutritionTotals, Meal } from '@/types/meal';
import { getMacroPercentages } from './nutrition-calculator';

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function round(num: number): number {
  return Math.round(num);
}

function getPrimaryNutrient(items: FoodItem[]): string {
  const totals = items.reduce(
    (acc, i) => ({
      protein: acc.protein + i.protein_g,
      carbs: acc.carbs + i.carbs_g,
      fat: acc.fat + i.fat_g,
    }),
    { protein: 0, carbs: 0, fat: 0 },
  );
  if (totals.protein >= totals.carbs && totals.protein >= totals.fat) return '蛋白质';
  if (totals.carbs >= totals.protein && totals.carbs >= totals.fat) return '碳水化合物';
  return '健康脂肪';
}

function getHealthObservation(
  items: FoodItem[],
  totals: NutritionTotals,
  mealType: string,
): string {
  const hasVeggies = items.some(
    (i) => i.category === 'vegetable',
  );
  const macros = getMacroPercentages(totals);
  const isBalanced =
    macros.proteinPct >= 15 && macros.proteinPct <= 45 &&
    macros.carbsPct >= 20 && macros.carbsPct <= 60 &&
    macros.fatPct >= 10 && macros.fatPct <= 50;

  if (totals.protein_g > 30) {
    return '蛋白质含量丰富，有助于肌肉恢复和饱腹感。';
  }
  if (hasVeggies && totals.carbs_g > 10) {
    return '蔬菜中的膳食纤维有助于消化健康。';
  }
  if (isBalanced) {
    return '宏量营养搭配均衡，各种营养素比例恰到好处。';
  }
  if (totals.calories > 800) {
    return '这是一餐丰盛的正餐——非常适合活力满满的一天。';
  }
  if (totals.calories < 300) {
    return '较清淡的一餐——如果需要，稍后可以补充一些营养丰富的小食。';
  }
  if (totals.protein_g < 10 && mealType !== 'snack') {
    return '建议搭配一些蛋白质来源，让这一餐更顶饱。';
  }
  if (totals.fat_g > 40) {
    return '丰盛满足的一餐——慢慢享用。';
  }
  return '令人满足的选择，恰到好处地融入均衡饮食的一天。';
}

const templates = [
  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, primaryNutrient: string) =>
    `这是一餐搭配均衡的${mealType}！${mainItem}提供了优质的${primaryNutrient}，让你活力满满。${getHealthObservation(items, totals, mealType)}`,

  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, _primaryNutrient: string) =>
    `美味的${mealType}，以${mainItem}为主，搭配${items.length - 1}种配菜，总计约${round(totals.calories)}千卡。${getHealthObservation(items, totals, mealType)}`,

  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, primaryNutrient: string) =>
    `不错的选择！这份${mealType}中${mainItem}富含${primaryNutrient}。${getHealthObservation(items, totals, mealType)}`,

  (_items: FoodItem[], totals: NutritionTotals, mealType: string, _mainItem: string, _primaryNutrient: string) =>
    `这份${mealType}大约提供${round(totals.calories)}千卡热量，包含${round(totals.protein_g)}克蛋白质、${round(totals.carbs_g)}克碳水、${round(totals.fat_g)}克脂肪。${getHealthObservation(_items, totals, mealType)}`,

  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, _primaryNutrient: string) =>
    `你的${mealType}包含${mainItem}${items.length > 1 ? `及其他${items.length - 1}种食物` : ''}。${getHealthObservation(items, totals, mealType)}别忘了喝水哦！`,

  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, _primaryNutrient: string) =>
    `嗯，${mainItem}是这份${mealType}的美味主角！约${round(totals.calories)}千卡，${getHealthObservation(items, totals, mealType).toLowerCase()}`,

  (_items: FoodItem[], totals: NutritionTotals, mealType: string, _mainItem: string, _primaryNutrient: string) =>
    `我已经分析了你的${mealType}——总计约${round(totals.calories)}千卡。${getHealthObservation(_items, totals, mealType)}`,

  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, _primaryNutrient: string) =>
    `这份${mealType}真不错！${mainItem}是盘中主角，总计${round(totals.calories)}千卡。${getHealthObservation(items, totals, mealType)}`,

  (_items: FoodItem[], totals: NutritionTotals, mealType: string, _mainItem: string, _primaryNutrient: string) =>
    `来看看这份${mealType}：${round(totals.protein_g)}克蛋白质，${round(totals.carbs_g)}克碳水，${round(totals.fat_g)}克脂肪。${getHealthObservation(_items, totals, mealType)}`,

  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, primaryNutrient: string) =>
    `以${mainItem}为主的${mealType}——${primaryNutrient}的优质来源！总计约${round(totals.calories)}千卡。${getHealthObservation(items, totals, mealType)}`,

  (_items: FoodItem[], totals: NutritionTotals, mealType: string, _mainItem: string, _primaryNutrient: string) =>
    `以下是你的${mealType}详情：总计${round(totals.calories)}千卡。${getHealthObservation(_items, totals, mealType)}每一餐都是迈向目标的一步。`,

  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, _primaryNutrient: string) =>
    `好满足的${mealType}！${mainItem}是这一餐的绝对主角。${getHealthObservation(items, totals, mealType)}`,

  (_items: FoodItem[], totals: NutritionTotals, mealType: string, _mainItem: string, _primaryNutrient: string) =>
    `餐食扫描完成！你的${mealType}提供了${round(totals.protein_g)}克蛋白质和${round(totals.carbs_g)}克碳水。${getHealthObservation(_items, totals, mealType)}`,

  (items: FoodItem[], totals: NutritionTotals, mealType: string, mainItem: string, _primaryNutrient: string) =>
    `${mainItem}——选得不错！这份${mealType}总计${round(totals.calories)}千卡。${getHealthObservation(items, totals, mealType)}继续保持！`,

  (_items: FoodItem[], totals: NutritionTotals, mealType: string, _mainItem: string, _primaryNutrient: string) =>
    `你的${mealType}分析完成：${round(totals.calories)}千卡 | 蛋白质:${round(totals.protein_g)}g 碳水:${round(totals.carbs_g)}g 脂肪:${round(totals.fat_g)}g。${getHealthObservation(_items, totals, mealType)}`,
];

export function generateSummary(
  items: FoodItem[],
  totals: NutritionTotals,
  mealType: string,
): string {
  if (items.length === 0) {
    return `未能识别出这份${mealType}中的食物。请在光线更好的环境下重新拍照试试。`;
  }

  const mainItem = items[0].name;
  const primaryNutrient = getPrimaryNutrient(items);
  const template = pickRandom(templates);

  return template(items, totals, mealType, mainItem, primaryNutrient);
}

const dailyTemplates = [
  (meals: Meal[], totals: NutritionTotals) => {
    const macros = getMacroPercentages(totals);
    return [
      `这是你今天的营养回顾！记录了${meals.length}餐，总计${round(totals.calories)}千卡。`,
      `宏量营养素配比为蛋白质${macros.proteinPct}%、碳水${macros.carbsPct}%、脂肪${macros.fatPct}%。`,
      totals.protein_g >= 50
        ? '今天的蛋白质摄入很棒——你的肌肉会感谢你的！'
        : '明天可以适当增加蛋白质摄入，有助于更好地恢复。',
      totals.calories < 1200
        ? '今天的摄入量偏少，记得要吃饱，给身体充足的能量哦。'
        : '能量摄入充足，足以支撑一天的活力。',
    ].join(' ');
  },

  (meals: Meal[], totals: NutritionTotals) => {
    const macros = getMacroPercentages(totals);
    return [
      `每日摘要：记录了${meals.length}餐，共摄入${round(totals.calories)}千卡。`,
      macros.proteinPct >= 20 && macros.proteinPct <= 40
        ? `宏量营养素搭配得很均衡：蛋白质${macros.proteinPct}%/碳水${macros.carbsPct}%/脂肪${macros.fatPct}%。`
        : `宏量营养素分布为蛋白质${macros.proteinPct}%、碳水${macros.carbsPct}%、脂肪${macros.fatPct}%。`,
      '坚持是进步的关键——每一次记录都在提升意识，养成更好的习惯。',
    ].join(' ');
  },

  (meals: Meal[], totals: NutritionTotals) => {
    const macros = getMacroPercentages(totals);
    const mealTypes = meals.map((m) => m.meal_type).filter((v, i, a) => a.indexOf(v) === i);
    return [
      `今天你吃了${mealTypes.length === 1 ? `只有${mealTypes[0]}` : mealTypes.join('、')}，共${meals.length}餐。`,
      `总摄入：${round(totals.calories)}千卡，宏量配比蛋白质${macros.proteinPct}%/碳水${macros.carbsPct}%/脂肪${macros.fatPct}%。`,
      totals.calories > 2500
        ? '高能量的一天——如果你运动量大的话，非常合适！'
        : '摄入量在合理范围内，表现不错。',
    ].join(' ');
  },

  (_meals: Meal[], totals: NutritionTotals) => {
    return [
      `今日营养概览：全天共${round(totals.calories)}千卡。`,
      `详细：蛋白质${round(totals.protein_g)}克，碳水${round(totals.carbs_g)}克，脂肪${round(totals.fat_g)}克。`,
      '记住，营养是场马拉松——追求持之以恒，而非完美无缺。',
    ].join(' ');
  },

  (meals: Meal[], totals: NutritionTotals) => {
    const macros = getMacroPercentages(totals);
    return [
      `又是一天用心饮食！${meals.length}餐，总计${round(totals.calories)}千卡。`,
      `平均蛋白质占比${macros.proteinPct}%——${macros.proteinPct >= 20 ? '刚好达标！' : '明天可以再加把劲。'}`,
      '记录饮食是了解自己营养模式的第一步，继续加油！',
    ].join(' ');
  },
];

export function generateDailySummary(
  meals: Meal[],
  totals: NutritionTotals,
): string {
  if (meals.length === 0) {
    return '今天还没有记录任何餐食。记住，即使是一份小零食也很重要——持续记录才能养成更好的习惯！';
  }

  const template = pickRandom(dailyTemplates);
  return template(meals, totals);
}

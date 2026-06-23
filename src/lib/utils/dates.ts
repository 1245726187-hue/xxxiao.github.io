import {
  format,
  formatDistanceToNow,
  isSameDay as dateFnsIsSameDay,
  isToday as dateFnsIsToday,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  parseISO,
} from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function formatDate(date: string | Date, pattern: string = 'yyyy-MM-dd'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, pattern, { locale: zhCN });
}

export function formatTime(date: string | Date, pattern: string = 'HH:mm'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, pattern);
}

export function formatRelativeDate(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: zhCN });
}

export function getToday(): Date {
  return new Date();
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const start = startOfMonth(new Date(year, month));
  const end = endOfMonth(start);
  return eachDayOfInterval({ start, end });
}

export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const monthStart = startOfMonth(new Date(year, month));
  const monthEnd = endOfMonth(monthStart);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calStart, end: calEnd });

  return days.map((date) => ({
    date,
    dayOfMonth: date.getDate(),
    isCurrentMonth: date.getMonth() === month,
    isToday: dateFnsIsToday(date),
    isWeekend: date.getDay() === 0 || date.getDay() === 6,
  }));
}

export function isToday(date: string | Date): boolean {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return dateFnsIsToday(d);
}

export function isSameDay(left: string | Date, right: string | Date): boolean {
  const l = typeof left === 'string' ? parseISO(left) : left;
  const r = typeof right === 'string' ? parseISO(right) : right;
  return dateFnsIsSameDay(l, r);
}

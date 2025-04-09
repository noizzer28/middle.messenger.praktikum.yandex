import '@formatjs/intl-datetimeformat/polyfill';

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);
  const now = new Date();

  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return new Intl.DateTimeFormat('ru-RU', { timeStyle: 'short' }).format(
      date
    );
  }

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  if (date >= startOfWeek && date <= endOfWeek) {
    return new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(date);
  }
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short'
  }).format(date);
}

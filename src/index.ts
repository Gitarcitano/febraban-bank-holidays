export interface Holiday {
  date: string;
  name: string;
}

function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(Date.UTC(year, month - 1, day));
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function formatDateISO(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseISODate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getFixedHolidays(year: number): Holiday[] {
  const holidays = [
    { date: `${year}-01-01`, name: 'Confraternização Universal' },
    { date: `${year}-04-21`, name: 'Dia de Tiradentes' },
    { date: `${year}-05-01`, name: 'Dia do Trabalhador' },
    { date: `${year}-09-07`, name: 'Independência do Brasil' },
    { date: `${year}-10-12`, name: 'Dia de Nossa Senhora Aparecida' },
    { date: `${year}-11-02`, name: 'Dia de Finados' },
    { date: `${year}-11-15`, name: 'Proclamação da República do Brasil' },
    { date: `${year}-12-25`, name: 'Natal' },
  ];

  if (year >= 2024) {
    holidays.push({ date: `${year}-11-20`, name: 'Dia da Consciência Negra' });
  }

  return holidays;
}

function getMoveableHolidays(year: number): Holiday[] {
  const easter = calculateEaster(year);

  const carnivalMonday = addDays(easter, -48);
  const carnivalTuesday = addDays(easter, -47);

  const goodFriday = addDays(easter, -2);

  const corpusChristi = addDays(easter, 60);

  return [
    { date: formatDateISO(carnivalMonday), name: 'Carnaval' },
    { date: formatDateISO(carnivalTuesday), name: 'Carnaval' },
    { date: formatDateISO(goodFriday), name: 'Sexta-Feira da Paixão' },
    { date: formatDateISO(corpusChristi), name: 'Corpus Christi' },
  ];
}

export function getBankHolidays(year: number): Holiday[] {
  if (year < 1583 || year > 4099) {
    throw new Error('Year must be between 1583 and 4099');
  }

  const fixedHolidays = getFixedHolidays(year);
  const moveableHolidays = getMoveableHolidays(year);

  const allHolidays = [...fixedHolidays, ...moveableHolidays];

  return allHolidays.sort((a, b) => a.date.localeCompare(b.date));
}

export function isBankHoliday(date: string | Date): boolean {
  const dateStr = typeof date === 'string' ? date : formatDateISO(date);
  const year = parseInt(dateStr.substring(0, 4));
  const holidays = getBankHolidays(year);

  return holidays.some((holiday) => holiday.date === dateStr);
}

export function getNextBusinessDay(date: string | Date): string {
  let currentDate =
    typeof date === 'string' ? parseISODate(date) : parseISODate(formatDateISO(date));
  currentDate = addDays(currentDate, 1);

  while (true) {
    const dayOfWeek = currentDate.getUTCDay();
    const dateStr = formatDateISO(currentDate);

    if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isBankHoliday(dateStr)) {
      return dateStr;
    }

    currentDate = addDays(currentDate, 1);
  }
}

export default {
  getBankHolidays,
  isBankHoliday,
  getNextBusinessDay,
};

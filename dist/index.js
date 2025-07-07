"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBankHolidays = getBankHolidays;
exports.isBankHoliday = isBankHoliday;
exports.getNextBusinessDay = getNextBusinessDay;
exports.isBusinessDay = isBusinessDay;
/**
 * Calculates the date of Easter for a given year.
 * @param year - The year to calculate Easter for.
 * @returns The date of Easter.
 */
function calculateEaster(year) {
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
/**
 * Adds a specified number of days to a given date.
 * @param date - The date to add days to.
 * @param days - The number of days to add.
 * @returns The new date with the days added.
 */
function addDays(date, days) {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result;
}
/**
 * Formats a Date object into an ISO 8601 string (YYYY-MM-DD).
 * @param date - The date to format.
 * @returns The formatted date string.
 */
function formatDateISO(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
/**
 * Parses an ISO 8601 string (YYYY-MM-DD) into a Date object.
 * @param dateStr - The date string to parse.
 * @returns The parsed Date object.
 */
function parseISODate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    return date;
}
/**
 * Gets the fixed national holidays for a given year.
 * @param year - The year to get the holidays for.
 * @returns An array of fixed holidays.
 */
function getFixedHolidays(year) {
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
/**
 * Gets the moveable holidays for a given year based on Easter's date.
 * @param year - The year to get the holidays for.
 * @returns An array of moveable holidays.
 */
function getMoveableHolidays(year) {
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
/**
 * Retrieves all national bank holidays for one or more years.
 * @param years - A single year or an array of years to get the holidays for.
 * @returns A sorted array of all bank holidays for the given year(s).
 * @throws Will throw an error if any year is outside the range of 1583 to 4099.
 */
function getBankHolidays(years) {
    const yearsToProcess = (Array.isArray(years) ? years : [years]).map((y) => Number(y));
    const allHolidays = yearsToProcess.flatMap((year) => {
        if (year < 1583 || year > 4099) {
            throw new Error('Year must be between 1583 and 4099');
        }
        const fixedHolidays = getFixedHolidays(year);
        const moveableHolidays = getMoveableHolidays(year);
        return [...fixedHolidays, ...moveableHolidays];
    });
    return allHolidays.sort((a, b) => a.date.localeCompare(b.date));
}
/**
 * Checks if a given date is a national bank holiday.
 * @param date - The date to check, either as a string (YYYY-MM-DD) or a Date object.
 * @returns `true` if the date is a bank holiday, `false` otherwise.
 */
function isBankHoliday(date) {
    const dateStr = typeof date === 'string' ? date : formatDateISO(date);
    const year = parseInt(dateStr.substring(0, 4));
    const holidays = getBankHolidays(year);
    return holidays.some((holiday) => holiday.date === dateStr);
}
/**
 * Finds the next business day after a given date.
 * It skips weekends (Saturdays and Sundays) and national bank holidays.
 * @param date - The date from which to start searching, either as a string (YYYY-MM-DD) or a Date object.
 * @returns The next business day as a string in YYYY-MM-DD format.
 */
function getNextBusinessDay(date) {
    let currentDate = typeof date === 'string' ? parseISODate(date) : parseISODate(formatDateISO(date));
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
function isBusinessDay(date) {
    const currentDate = typeof date === 'string' ? parseISODate(date) : date;
    const dayOfWeek = currentDate.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return false;
    }
    if (isBankHoliday(currentDate)) {
        return false;
    }
    return true;
}
exports.default = {
    getBankHolidays,
    isBankHoliday,
    getNextBusinessDay,
    isBusinessDay,
};
//# sourceMappingURL=index.js.map
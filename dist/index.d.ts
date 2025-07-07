export interface Holiday {
    date: string;
    name: string;
}
/**
 * Retrieves all national bank holidays for one or more years.
 * @param years - A single year or an array of years to get the holidays for.
 * @returns A sorted array of all bank holidays for the given year(s).
 * @throws Will throw an error if any year is outside the range of 1583 to 4099.
 */
export declare function getBankHolidays(years: number | string | (number | string)[]): Holiday[];
/**
 * Checks if a given date is a national bank holiday.
 * @param date - The date to check, either as a string (YYYY-MM-DD) or a Date object.
 * @returns `true` if the date is a bank holiday, `false` otherwise.
 */
export declare function isBankHoliday(date: string | Date): boolean;
/**
 * Finds the next business day after a given date.
 * It skips weekends (Saturdays and Sundays) and national bank holidays.
 * @param date - The date from which to start searching, either as a string (YYYY-MM-DD) or a Date object.
 * @returns The next business day as a string in YYYY-MM-DD format.
 */
export declare function getNextBusinessDay(date: string | Date): string;
export declare function isBusinessDay(date: string | Date): boolean;
declare const _default: {
    getBankHolidays: typeof getBankHolidays;
    isBankHoliday: typeof isBankHoliday;
    getNextBusinessDay: typeof getNextBusinessDay;
    isBusinessDay: typeof isBusinessDay;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
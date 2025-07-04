export interface Holiday {
    date: string;
    name: string;
}
export declare function getBankHolidays(year: number): Holiday[];
export declare function isBankHoliday(date: string | Date): boolean;
export declare function getNextBusinessDay(date: string | Date): string;
declare const _default: {
    getBankHolidays: typeof getBankHolidays;
    isBankHoliday: typeof isBankHoliday;
    getNextBusinessDay: typeof getNextBusinessDay;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
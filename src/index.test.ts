import { getBankHolidays, isBankHoliday, getNextBusinessDay, isBusinessDay } from './';

describe('febraban-bank-holidays', () => {
  describe('getBankHolidays', () => {
    it('should return all holidays for a single year (number)', () => {
      const holidays = getBankHolidays(2025);
      expect(holidays).toHaveLength(13);
    });

    it('should return all holidays for a single year (string)', () => {
      const holidays = getBankHolidays('2025');
      expect(holidays).toHaveLength(13);
    });

    it('should return combined holidays for multiple years', () => {
      const holidays = getBankHolidays([2024, 2025]);
      expect(holidays).toHaveLength(26); // 13 holidays per year

      const years = holidays.map((h) => h.date.substring(0, 4));
      expect(new Set(years)).toEqual(new Set(['2024', '2025']));
    });

    it('should return combined holidays for multiple years (strings)', () => {
      const holidays = getBankHolidays(['2024', '2025']);
      expect(holidays).toHaveLength(26);
    });

    it('should return combined holidays for multiple years (mixed types)', () => {
      const holidays = getBankHolidays(['2024', 2025]);
      expect(holidays).toHaveLength(26);
    });

    it('should return holidays sorted by date, even with multiple years', () => {
      const holidays = getBankHolidays([2025, 2024]);
      for (let i = 1; i < holidays.length; i++) {
        const prevDate = new Date(holidays[i - 1].date);
        const currDate = new Date(holidays[i].date);
        expect(currDate.getTime()).toBeGreaterThan(prevDate.getTime());
      }
    });

    it('should throw error for years outside valid range (in array)', () => {
      expect(() => getBankHolidays([2025, 1582])).toThrow('Year must be between 1583 and 4099');
      expect(() => getBankHolidays([2025, 4100])).toThrow('Year must be between 1583 and 4099');
    });

    it('should not include Dia da Consciência Negra for years before 2024', () => {
      const holidays = getBankHolidays(2023);
      const diaConscienciaNegra = holidays.find((h) => h.name === 'Dia da Consciência Negra');
      expect(diaConscienciaNegra).toBeUndefined();
    });

    it('should correctly calculate movable holidays for different years', () => {
      const holidays2024 = getBankHolidays(2024);
      const carnival2024 = holidays2024.filter((h) => h.name === 'Carnaval');
      expect(carnival2024[0].date).toBe('2024-02-12');
      expect(carnival2024[1].date).toBe('2024-02-13');

      const holidays2026 = getBankHolidays(2026);
      const carnival2026 = holidays2026.filter((h) => h.name === 'Carnaval');
      expect(carnival2026[0].date).toBe('2026-02-16');
      expect(carnival2026[1].date).toBe('2026-02-17');
    });
  });

  describe('isBankHoliday', () => {
    it('should return true for known holidays', () => {
      expect(isBankHoliday('2025-01-01')).toBe(true);
      expect(isBankHoliday('2025-03-03')).toBe(true);
      expect(isBankHoliday('2025-12-25')).toBe(true);
    });

    it('should return false for days that are not holidays', () => {
      expect(isBankHoliday('2025-01-02')).toBe(false);
      expect(isBankHoliday('2025-06-15')).toBe(false);
      expect(isBankHoliday('2025-08-20')).toBe(false);
    });

    it('should accept Date object as parameter', () => {
      expect(isBankHoliday(new Date('2025-01-01'))).toBe(true);
      expect(isBankHoliday(new Date('2025-01-02'))).toBe(false);
    });
  });

  describe('getNextBusinessDay', () => {
    it('should skip weekends', () => {
      expect(getNextBusinessDay('2025-01-02')).toBe('2025-01-03');
      expect(getNextBusinessDay('2025-01-03')).toBe('2025-01-06');
      expect(getNextBusinessDay('2025-01-04')).toBe('2025-01-06');
    });

    it('should skip holidays', () => {
      expect(getNextBusinessDay('2024-12-31')).toBe('2025-01-02');
      expect(getNextBusinessDay('2025-02-27')).toBe('2025-02-28');
      expect(getNextBusinessDay('2025-02-28')).toBe('2025-03-05');
    });

    it('should skip combinations of weekends and holidays', () => {
      expect(getNextBusinessDay('2025-09-04')).toBe('2025-09-05');
      expect(getNextBusinessDay('2025-09-05')).toBe('2025-09-08');
    });
  });

  describe('isBusinessDay', () => {
    it('should return true for a regular business day', () => {
      expect(isBusinessDay('2025-07-08')).toBe(true);
    });

    it('should return false for a weekend', () => {
      expect(isBusinessDay('2025-07-12')).toBe(false);
      expect(isBusinessDay('2025-07-13')).toBe(false);
    });

    it('should return false for a holiday', () => {
      expect(isBusinessDay('2025-01-01')).toBe(false);
    });

    it('should accept a Date object as a parameter', () => {
      expect(isBusinessDay(new Date('2025-07-08'))).toBe(true);
      expect(isBusinessDay(new Date('2025-07-12'))).toBe(false);
    });
  });
});

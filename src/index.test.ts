import { getBankHolidays, isBankHoliday, getNextBusinessDay } from './';

describe('febraban-bank-holidays', () => {
  describe('getBankHolidays', () => {
    it('should return all holidays for 2025', () => {
      const holidays = getBankHolidays(2025);

      expect(holidays).toHaveLength(13);

      const expectedHolidays = [
        { date: '2025-01-01', name: 'Confraternização Universal' },
        { date: '2025-03-03', name: 'Carnaval' },
        { date: '2025-03-04', name: 'Carnaval' },
        { date: '2025-04-18', name: 'Sexta-Feira da Paixão' },
        { date: '2025-04-21', name: 'Dia de Tiradentes' },
        { date: '2025-05-01', name: 'Dia do Trabalhador' },
        { date: '2025-06-19', name: 'Corpus Christi' },
        { date: '2025-09-07', name: 'Independência do Brasil' },
        { date: '2025-10-12', name: 'Dia de Nossa Senhora Aparecida' },
        { date: '2025-11-02', name: 'Dia de Finados' },
        { date: '2025-11-15', name: 'Proclamação da República do Brasil' },
        { date: '2025-11-20', name: 'Dia da Consciência Negra' },
        { date: '2025-12-25', name: 'Natal' },
      ];

      expectedHolidays.forEach((expected) => {
        const found = holidays.find((h) => h.date === expected.date);
        expect(found).toBeDefined();
        expect(found?.name).toBe(expected.name);
      });
    });

    it('should correctly calculate movable holidays for different years', () => {
      const holidays2024 = getBankHolidays(2024);
      const carnival2024 = holidays2024.filter((h) => h.name === 'Carnaval');
      expect(carnival2024[0].date).toBe('2024-02-12'); // Segunda
      expect(carnival2024[1].date).toBe('2024-02-13'); // Terça

      const holidays2026 = getBankHolidays(2026);
      const carnival2026 = holidays2026.filter((h) => h.name === 'Carnaval');
      expect(carnival2026[0].date).toBe('2026-02-16'); // Segunda
      expect(carnival2026[1].date).toBe('2026-02-17'); // Terça
    });

    it('should return holidays sorted by date', () => {
      const holidays = getBankHolidays(2025);

      for (let i = 1; i < holidays.length; i++) {
        const prevDate = new Date(holidays[i - 1].date);
        const currDate = new Date(holidays[i].date);
        expect(currDate.getTime()).toBeGreaterThan(prevDate.getTime());
      }
    });

    it('should handle leap years correctly', () => {
      const holidays2024 = getBankHolidays(2024);
      expect(holidays2024).toHaveLength(13);

      const corpusChristi = holidays2024.find((h) => h.name === 'Corpus Christi');
      expect(corpusChristi?.date).toBe('2024-05-30');
    });

    it('should throw error for years outside valid range', () => {
      expect(() => getBankHolidays(1582)).toThrow('Year must be between 1583 and 4099');
      expect(() => getBankHolidays(4100)).toThrow('Year must be between 1583 and 4099');
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
});

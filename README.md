# febraban-bank-holidays

TypeScript library to calculate bank holidays in Brazil according to the FEBRABAN calendar.

## Features

- ✅ Calculates all national bank holidays in Brazil
- ✅ Supports movable holidays (Carnival, Good Friday, Corpus Christi)
- ✅ Works for any year between 1583 and 4099
- ✅ Correctly handles leap years
- ✅ Simple and intuitive API
- ✅ Zero dependencies
- ✅ TypeScript with included types
- ✅ 100% tested

## Installation

```bash
npm install febraban-bank-holidays
```

or

```bash
yarn add febraban-bank-holidays
```

## Usage

### Basic Example

```typescript
import { getBankHolidays } from 'febraban-bank-holidays';

// Get all holidays for 2025
const holidays = getBankHolidays(2025);

console.log(holidays);
// [
//   { date: '2025-01-01', name: 'Confraternização Universal' },
//   { date: '2025-03-03', name: 'Carnaval' },
//   { date: '2025-03-04', name: 'Carnaval' },
//   { date: '2025-04-18', name: 'Sexta-Feira da Paixão' },
//   { date: '2025-04-21', name: 'Dia de Tiradentes' },
//   { date: '2025-05-01', name: 'Dia do Trabalhador' },
//   { date: '2025-06-19', name: 'Corpus Christi' },
//   { date: '2025-09-07', name: 'Independência do Brasil' },
//   { date: '2025-10-12', name: 'Dia de Nossa Senhora Aparecida' },
//   { date: '2025-11-02', name: 'Dia de Finados' },
//   { date: '2025-11-15', name: 'Proclamação da República do Brasil' },
//   { date: '2025-11-20', name: 'Dia da Consciência Negra' },
//   { date: '2025-12-25', name: 'Natal' }
// ]
```

### Check if a date is a holiday

```typescript
import { isBankHoliday } from 'febraban-bank-holidays';

// Using ISO string
console.log(isBankHoliday('2025-01-01')); // true
console.log(isBankHoliday('2025-01-02')); // false

// Using Date object
console.log(isBankHoliday(new Date('2025-12-25'))); // true
```

### Get the next business day

```typescript
import { getNextBusinessDay } from 'febraban-bank-holidays';

// Skips weekends and holidays
console.log(getNextBusinessDay('2024-12-31')); // '2025-01-02' (skips 01/01)
console.log(getNextBusinessDay('2025-02-28')); // '2025-03-05' (skips Carnival)
console.log(getNextBusinessDay('2025-01-03')); // '2025-01-06' (Friday → Monday)
```

## API

### `getBankHolidays(year: number): Holiday[]`

Returns all bank holidays for the specified year.

**Parameters:**
- `year`: Desired year (between 1583 and 4099)

**Returns:**
Array of `Holiday` objects sorted by date:
```typescript
interface Holiday {
  date: string; // ISO format (YYYY-MM-DD)
  name: string; // Holiday name
}
```

### `isBankHoliday(date: string | Date): boolean`

Checks if a specific date is a bank holiday.

**Parameters:**
- `date`: Date in ISO string format or Date object

**Returns:**
- `true` if it's a bank holiday
- `false` otherwise

### `getNextBusinessDay(date: string | Date): string`

Returns the next bank business day after the specified date.

**Parameters:**
- `date`: Start date in ISO string format or Date object

**Returns:**
- String with the next business day's date in ISO format

## Included Holidays

### Fixed Holidays
- 1º de janeiro - Confraternização Universal
- 21 de abril - Dia de Tiradentes
- 1º de maio - Dia do Trabalhador
- 7 de setembro - Independência do Brasil
- 12 de outubro - Dia de Nossa Senhora Aparecida
- 2 de novembro - Dia de Finados
- 15 de novembro - Proclamação da República
- 20 de novembro - Dia da Consciência Negra
- 25 de dezembro - Natal

### Movable Holidays
- Carnival Monday (48 days before Easter)
- Carnival Tuesday (47 days before Easter)
- Good Friday (2 days before Easter)
- Corpus Christi (60 days after Easter)

## Algorithm

The library uses the Anonymous Gregorian Algorithm to calculate the date of Easter, which is the basis for all movable holidays. This algorithm is considered the most reliable and has validated accuracy from 1583 to 4099.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## Project Structure

```
febraban-bank-holidays/
├── src/
│   ├── index.ts              # Main file
│   └── index.test.ts         # Tests
├── dist/                     # Compiled files
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Giovanne Tarcitano - [@Gitarcitano](https://github.com/Gitarcitano)

## Acknowledgments

- FEBRABAN for standardizing bank holidays
- Anonymous Gregorian Algorithm for accurate Easter calculation

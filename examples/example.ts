import { getBankHolidays, isBankHoliday, getNextBusinessDay, isBusinessDay } from '../src';

// 1. Listar todos os feriados de um ano
console.log('=== Feriados Bancários de 2025 ===');
const holidays2025 = getBankHolidays(2025);

holidays2025.forEach((holiday) => {
  const [year, month, day] = holiday.date.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  const formattedDate = date.toLocaleDateString('pt-BR');

  console.log(`${formattedDate} (${dayOfWeek}) - ${holiday.name}`);
});

// 2. Verificar se datas específicas são feriados
console.log('\n=== Verificação de Feriados ===');
const datesToCheck = ['2025-01-01', '2025-01-02', '2025-03-03', '2025-12-25', '2025-12-26'];

datesToCheck.forEach((date) => {
  const isHoliday = isBankHoliday(date);
  console.log(`${date}: ${isHoliday ? 'É feriado' : 'Não é feriado'}`);
});

// 3. Calcular próximo dia útil
console.log('\n=== Próximo Dia Útil ===');
const businessDayExamples = [
  { date: '2024-12-31', description: 'Véspera de Ano Novo' },
  { date: '2025-02-28', description: 'Sexta antes do Carnaval' },
  { date: '2025-04-17', description: 'Quinta antes da Sexta-feira da Paixão' },
  { date: '2025-09-05', description: 'Sexta antes do feriado de 7 de setembro (domingo)' },
];

businessDayExamples.forEach((example) => {
  const nextDay = getNextBusinessDay(example.date);
  console.log(`${example.date} (${example.description}) → Próximo dia útil: ${nextDay}`);
});

// 4. Comparar feriados entre anos
console.log('\n=== Comparação de Carnaval entre Anos ===');
const years = [2024, 2025, 2026, 2027, 2028];
const holidaysForYears = getBankHolidays(years);

years.forEach((year) => {
  const carnivalDates = holidaysForYears
    .filter((h) => h.name === 'Carnaval' && h.date.startsWith(String(year)))
    .map((h) => h.date);

  console.log(`${year}: ${carnivalDates.join(' e ')}`);
});

// 5. Contar dias úteis em um mês
function countBusinessDays(year: number, month: number): number {
  const lastDay = new Date(year, month, 0).getDate();
  let count = 0;

  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month - 1, day);
    if (isBusinessDay(date)) {
      count++;
    }
  }

  return count;
}

console.log('\n=== Dias Úteis por Mês em 2025 ===');
const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

for (let month = 1; month <= 12; month++) {
  const businessDays = countBusinessDays(2025, month);
  console.log(`${monthNames[month - 1]}: ${businessDays} dias úteis`);
}

// 6. Verificar se uma data é dia útil
console.log('\n=== Verificação de Dia Útil ===');
const datesToVerify = [
  '2025-07-08', // Terça-feira
  '2025-07-12', // Sábado
  '2025-01-01', // Feriado
];

datesToVerify.forEach((date) => {
  console.log(`${date}: ${isBusinessDay(date) ? 'É dia útil' : 'Não é dia útil'}`);
});

// 7. Verificar feriados que caem em fins de semana
console.log('\n=== Feriados em Fins de Semana (2025) ===');
holidays2025.forEach((holiday) => {
  const [year, month, day] = holiday.date.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    const weekday = dayOfWeek === 0 ? 'Domingo' : 'Sábado';
    console.log(`${holiday.date} (${weekday}) - ${holiday.name}`);
  }
});

// 8. Listar feriados de múltiplos anos
console.log('\n=== Feriados de 2028 e 2029 ===');
const holidays2028_2029 = getBankHolidays([2028, '2029']);

holidays2028_2029.forEach((holiday) => {
  console.log(`${holiday.date} - ${holiday.name}`);
});

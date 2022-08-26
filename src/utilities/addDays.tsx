export function addDays(date: Date, days: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
export function addWeeks(date: Date, weeks: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + 7 * weeks);
  return result;
}
export function addMonths(date: Date, months: number) {
  let result = new Date(date);
  console.log(result.getDate());

  result.setMonth(result.getMonth() + months);
  console.log(result);

  return result;
}
export function addYears(date: Date, years: number) {
  let result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

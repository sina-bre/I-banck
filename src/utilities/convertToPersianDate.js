export const convertToPersianDate = (input) => {
  const gregorianYear = parseInt(input.substring(0, 4));
  const gregorianMonth = parseInt(input.substring(4, 6));
  const gregorianDay = parseInt(input.substring(6, 8));

  const persianYear = gregorianYear - 621;
  const persianMonth = gregorianMonth <= 2 ? gregorianMonth + 10 : gregorianMonth - 2;
  const persianDay = gregorianDay;

  return `${persianYear}/${persianMonth
    .toString()
    .padStart(2, '0')}/${persianDay.toString().padStart(2, '0')}`;
};

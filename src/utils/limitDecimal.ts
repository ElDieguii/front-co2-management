export function limitDecimal(num: number) {
  let numString = num.toString();
  let decimal = (numString.split('.')[1] || []).length;
  if (decimal > 4) {
    return parseFloat(num.toFixed(2));
  } else if (decimal === 1) {
    return parseFloat(num.toFixed(1));
  } else {
    return num;
  }
}

export const getCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  return currentYear.toString();
};

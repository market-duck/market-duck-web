export const thousandComma = (number: number | string) => {
  const num = number.toString().split('.');
  return num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (num[1] ? `.${num[1]}` : '');
};

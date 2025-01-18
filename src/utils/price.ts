export const thousandComma = (value: number | string) => {
  // caution: undefined | null | false =>  prints 0
  const number = typeof value === 'string' ? Number(value.replace(/,/g, '')) : value;
  console.log({ number });
  if (Number.isNaN(number) || number % 1 !== 0) {
    throw new Error('You should send integer or positive string');
  }
  return number.toLocaleString('ko-KR');
};

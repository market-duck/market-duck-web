export const thousandComma = (value: number | string, showPriceSign?: boolean) => {
  // caution: undefined | null | false =>  prints 0
  const number = typeof value === 'string' ? Number(value.replace(/[₩,]/g, '')) : value;
  if (Number.isNaN(number) || number % 1 !== 0) {
    throw new Error('You should send integer or positive string');
  }
  return `${showPriceSign ? '₩ ' : ''}${number.toLocaleString('ko-KR')}`;
};

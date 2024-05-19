import { SelectValueWrap } from '@market-duck/components/Select/SelectStyles';

export const SingleValueInput = ({ value }: { value: string }) => {
  return <SelectValueWrap>{value}</SelectValueWrap>;
};

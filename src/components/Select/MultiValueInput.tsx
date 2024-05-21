import { SelectValueWrap } from '@market-duck/components/Select/SelectStyles';
import { Tag } from '../Tag/Tag';

export const MultiValueInput = ({ value }: { value: string[] }) => {
  return (
    <SelectValueWrap>
      {value.map((item) => {
        return <Tag key={item} text={item} />;
      })}
    </SelectValueWrap>
  );
};

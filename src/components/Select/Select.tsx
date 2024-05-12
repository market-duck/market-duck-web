import { ContainerWrap, UpperArea, LowerArea, OptionWrap } from '@market-duck/components/Select/SelectStyles';
import { Tag } from '@market-duck/components/Tag/Tag';

const SingleInput = ({ value }: { value: string }) => {
  return <div></div>;
};

const MultiInput = ({ value }: { value: string[] }) => {
  return (
    <div>
      {value.map((item) => {
        return <Tag key={item} text={item} />;
      })}
    </div>
  );
};

/**
 *
 * @description
 * Select 컴포넌트의 컨테이너
 * Label, SelectInput, SelectOptions를 필요에 따라 지정해 사용할 수 있습니다.
 *
 */
const SelectContainer = ({
  selectType,
  label,
  disabled = false,
  singleValue,
  multiValue,
}: {
  selectType: 'single' | 'multi';
  singleValue?: string;
  multiValue?: string[];
  label?: string;
  disabled?: boolean;
}) => {
  return (
    <ContainerWrap>
      <UpperArea>
        {label && <p>label</p>}
        {selectType === 'single' && <SingleInput value={singleValue || ''} />}
        {selectType === 'multi' && <MultiInput value={multiValue || []} />}
      </UpperArea>
      <LowerArea></LowerArea>
    </ContainerWrap>
  );
};

/**
 *
 * @description
 * Select 컴포넌트의 개별 옵션입니다. (*꼭 컨테이너 내부에서 사용해야 합니다*)
 * 해당 옵션들의 집합인 리스트를 만들어 컨테이너 내부에서 사용할 수 있습니다.
 */
const SelectOption = () => {
  return <OptionWrap></OptionWrap>;
};

export const Select = {
  Container: SelectContainer,
  Option: SelectOption,
};

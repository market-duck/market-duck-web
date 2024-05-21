import { Row } from '@market-duck/components/Flex/Flex';
import { ContainerWrap, UpperArea, LowerArea, OptionWrap } from '@market-duck/components/Select/SelectStyles';
import { Tag } from '@market-duck/components/Tag/Tag';
import { ReactNode, useState } from 'react';

const Input = ({
  placeholder,
  value,
  selectType,
}: {
  placeholder: string;
  value: string[];
  selectType: 'single' | 'multi';
}) => {
  return (
    <div className="input-wrap">
      {value.length === 0 && placeholder}
      {selectType === 'single' ? (
        value[0]
      ) : (
        <Row gap="XXS">
          {value.map((item) => {
            return <Tag key={item} text={item} />;
          })}
        </Row>
      )}
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
  placeholder,
  value,
  children,
}: {
  selectType: 'single' | 'multi';
  value: string[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  children?: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ContainerWrap>
      <UpperArea
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {label && <p>label</p>}
        <Input placeholder={placeholder || ''} selectType={selectType} value={value} />
      </UpperArea>
      {isOpen && <LowerArea>{children}</LowerArea>}
    </ContainerWrap>
  );
};

/**
 *
 * @description
 * Select 컴포넌트의 개별 옵션입니다. (*꼭 컨테이너 내부에서 사용해야 합니다*)
 * 해당 옵션들의 집합인 리스트를 만들어 컨테이너 내부에서 사용할 수 있습니다.
 */
const SelectOption = ({ label, value, onClick }: { label: string; value: string; onClick: () => void }) => {
  return <OptionWrap onClick={onClick}>{label}</OptionWrap>;
};

export const Select = {
  Container: SelectContainer,
  Option: SelectOption,
};

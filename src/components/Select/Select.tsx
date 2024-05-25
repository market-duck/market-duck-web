import { Row } from '@market-duck/components/Flex/Flex';
import {
  ContainerWrap,
  SelectInputWrap,
  UpperArea,
  LowerArea,
  OptionWrap,
} from '@market-duck/components/Select/SelectStyles';
import { Tag } from '@market-duck/components/Tag/Tag';
import { ReactNode, useState } from 'react';

const SelectInput = ({
  placeholder,
  value,
  selectType,
  isDisabled,
  isFocused,
  isError,
  deleteAllHandler,
}: {
  placeholder: string;
  value: string[];
  selectType: 'single' | 'multi';
  isDisabled: boolean;
  isFocused: boolean;
  isError: boolean;
  deleteAllHandler: () => void;
}) => {
  return (
    <SelectInputWrap className="input-wrap" $focus={isFocused} $error={isError} $disabled={isDisabled}>
      {value.length === 0 && placeholder}
      {selectType === 'single' ? (
        value[0]
      ) : (
        <div className="multi-input">
          <Row gap="XXS">
            {value.map((item) => {
              return <Tag color="secondary" showCloseIcon={true} key={item} text={item} />;
            })}
          </Row>
          {/* TODO:: icon으로 변경하기 */}
          {!!value.length && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteAllHandler();
              }}
            >
              X
            </div>
          )}
        </div>
      )}
    </SelectInputWrap>
  );
};

/**
 *
 * @description
 * Label, SelectType을 필요에 따라 지정해 사용할 수 있습니다.
 *
 */
export const Select = ({
  selectType,
  label,

  placeholder,
  value,
  onChangeValue,

  optionList,
  isDisabled = false,
  isError = false,
}: {
  selectType: 'single' | 'multi';
  value: string[];
  onChangeValue: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
  optionList: Array<{ label: string; value: string }>;
  isDisabled?: boolean;
  isError?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onBlur = () => {
    setIsOpen(false);
  };

  const onChange = (selectedValue: string) => {
    if (selectType === 'multi') {
      if (!value.includes(selectedValue)) {
        onChangeValue([...value, selectedValue]);
      }
    } else {
      onChangeValue([selectedValue]);
    }
    setIsOpen(false);
  };

  const deleteAllHandler = () => {
    setIsOpen(false);
    onChangeValue([]);
  };

  return (
    <ContainerWrap onBlur={onBlur} tabIndex={0}>
      <UpperArea
        onClick={(e) => {
          e.stopPropagation();
          if (isDisabled) return;
          setIsOpen((prev) => !prev);
        }}
      >
        {label && <p>label</p>}
        <SelectInput
          isFocused={isOpen}
          isError={isError}
          isDisabled={isDisabled}
          placeholder={placeholder || ''}
          selectType={selectType}
          value={value}
          deleteAllHandler={deleteAllHandler}
        />
      </UpperArea>
      {isOpen && (
        <LowerArea>
          {optionList.map((item) => {
            return (
              <SelectOption
                key={item.value}
                onClick={() => {
                  onChange(item.value);
                }}
              >
                {item.label}
              </SelectOption>
            );
          })}
        </LowerArea>
      )}
    </ContainerWrap>
  );
};

/**
 *
 * @description
 * Select 컴포넌트의 개별 옵션입니다.
 */
const SelectOption = ({ onClick, children }: { onClick: () => void; children: ReactNode }) => {
  //onClick이 trigger 되었을 때에 isOpen이 close 되어야 함

  return <OptionWrap onClick={onClick}>{children}</OptionWrap>;
};

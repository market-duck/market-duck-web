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
import * as FillIcon from '@heroicons/react/24/solid';
import styled from 'styled-components';

const DeleteIcon = styled(FillIcon.XCircleIcon)`
  position: absolute;
  right: 0.4rem;
  width: 1.5rem;
  height: 1.5rem;
`;

const ArrowDownIcon = styled(FillIcon.ChevronDownIcon)`
  position: absolute;
  right: 0.4rem;
  width: 1.5rem;
  height: 1.5rem;
`;

const SelectInput = ({
  optionList,
  placeholder,
  value,
  selectType,
  isDisabled,
  isFocused,
  isError,
  deleteOneHandler,
  deleteAllHandler,
}: {
  optionList: Array<{ label: string; value: string }>;
  placeholder: string;
  value: number[];
  selectType: 'single' | 'multi';
  isDisabled: boolean;
  isFocused: boolean;
  isError: boolean;
  deleteOneHandler: (deleteItemValue: number) => void;
  deleteAllHandler: () => void;
}) => {
  return (
    <SelectInputWrap className="input-wrap" $focus={isFocused} $error={isError} $disabled={isDisabled}>
      {value.length === 0 && placeholder}
      {selectType === 'single' ? (
        optionList[value[0]].label
      ) : (
        <div className="multi-input">
          <Row gap="XXS">
            {value.map((item) => {
              return (
                <Tag
                  color="secondary"
                  showDeleteIcon={true}
                  onDelete={() => {
                    deleteOneHandler(item);
                  }}
                  key={item}
                  text={optionList[item].label}
                />
              );
            })}
          </Row>
        </div>
      )}
      {selectType === 'multi' && value.length ? (
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            deleteAllHandler();
          }}
        />
      ) : (
        <ArrowDownIcon />
      )}
    </SelectInputWrap>
  );
};

/**
 *
 * @description
 * Label, SelectType을 필요에 따라 지정해 사용할 수 있습니다.
 * @requires selectType
 * @requires value
 * @requires onChangeValue
 * @requires optionList
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
  value: number[]; //index를 저장한다
  onChangeValue: (selected: number[]) => void;
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

  const onChange = (selectedValue: number) => {
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

  const deleteOneHandler = (deleteItem: number) => {
    const deletedValues = value.filter((item) => item !== deleteItem);
    onChangeValue(deletedValues);
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
          optionList={optionList}
          isFocused={isOpen}
          isError={isError}
          isDisabled={isDisabled}
          placeholder={placeholder || ''}
          selectType={selectType}
          value={value}
          deleteOneHandler={deleteOneHandler}
          deleteAllHandler={deleteAllHandler}
        />
      </UpperArea>
      {isOpen && (
        <LowerArea>
          {optionList.map((item, index) => {
            return (
              <SelectOption
                key={item.value}
                onClick={() => {
                  onChange(index);
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

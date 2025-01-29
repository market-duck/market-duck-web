import * as FillIcon from '@heroicons/react/24/solid';
import { categoryAPI } from '@market-duck/apis/categoryAPI';
import { CategoryModel } from '@market-duck/apis/models/categoryModel';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Tag } from '@market-duck/components/Tag/Tag';
import { useHandleClickOutside } from '@market-duck/hooks/useHandleClickOutside';
import { CategoryType } from '@market-duck/types/category';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled, { css } from 'styled-components';

const Container = styled.div<{ $isError: boolean; $isFocus: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 42px;
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  ${(props) => {
    if (props.$isFocus)
      return css`
        border: 2px solid ${AppSemanticColor.BORDER_FOCUS_RING.hex};
      `;

    if (props.$isError)
      return css`
        background-color: ${AppSemanticColor.BG_DANGER_SUBTLE.hex};
        border-width: 2px;
        border-color: ${AppSemanticColor.TEXT_DANGER.hex};
      `;
  }}
  padding: ${AppSpcing.XS} ${AppSpcing.S};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  border-radius: ${AppRadii.M};
  white-space: nowrap;
  ${AppTypo.BODY_MD};
  cursor: pointer;

  .inputArea {
    border: 0;
    outline: 0;
    ${AppTypo.BODY_MD};
  }

  &.is-focus {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-width: 2px;
    border-color: ${AppSemanticColor.BORDER_FOCUS_RING.hex};
  }

  &.is-error {
    background-color: ${AppSemanticColor.BG_DANGER_SUBTLE.hex};
    border-width: 2px;
    border-color: ${AppSemanticColor.TEXT_DANGER.hex};
  }
`;

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

const DropdownWrap = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 160px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  left: 0;
  top: calc(100% + 8px);
  z-index: 1;
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  border-radius: ${AppRadii.M};

  > li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: ${AppSpcing.XS} ${AppSpcing.M};
    background-color: ${AppSemanticColor.BG_PRIMARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-radius: ${AppRadii.M};
    cursor: pointer;

    &:not(.empty):hover {
      background: ${AppSemanticColor.BG_SECONDARY.hex};
    }
  }
`;

interface SearchCategoryProps {
  selecteds: CategoryModel[];
  changeSelectedsHandler: (value: CategoryModel[]) => void;
  categoryType: CategoryType;
  isError: boolean;
}

export const SearchCategory = ({ selecteds, changeSelectedsHandler, categoryType, isError }: SearchCategoryProps) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { isOpen: isFocus, setIsOpen: setIsFocus, dropdownRef: focusRef } = useHandleClickOutside();
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: searchResults } = useQuery({
    queryKey: ['category', 'get', searchValue],
    queryFn: async () => {
      const data = await categoryAPI.getCategoryList({ categoryName: searchValue, categoryType, page: 0, size: 12 });
      return data;
    },
    enabled: !!searchValue,
  });

  useEffect(() => {
    if (isFocus) inputRef.current?.focus();
  }, [isFocus]);

  const getDebounce = useCallback(
    debounce((value: string) => {
      setSearchValue(value);
    }, 500),
    [],
  );

  const selectHandler = (selected: CategoryModel) => {
    const sameCategory = selecteds.filter((item) => item.categoryId === selected.categoryId);
    if (sameCategory.length) return;

    changeSelectedsHandler([...selecteds, selected]);
    setInputValue('');
    setSearchValue('');
  };

  const deleteHandler = (deleteItem: CategoryModel) => {
    const newSelecteds = selecteds.filter((item) => item.categoryId !== deleteItem.categoryId);

    changeSelectedsHandler(newSelecteds);
  };

  const deleteAllHandler = () => {
    changeSelectedsHandler([]);
    setInputValue('');
    setSearchValue('');
  };

  return (
    <Container
      ref={focusRef}
      onClick={(e) => {
        e.stopPropagation();
        setIsFocus(true);
      }}
      $isFocus={isFocus}
      $isError={isError}
    >
      <Column gap="XS">
        {!!selecteds.length && (
          <Row flexWrap="wrap" className="tags">
            {selecteds.map((item) => {
              return (
                <Tag
                  color="secondary"
                  key={item.categoryId}
                  text={item.categoryName}
                  showDeleteIcon={true}
                  onDelete={() => deleteHandler(item)}
                />
              );
            })}
          </Row>
        )}
        {isFocus && (
          <input
            className="inputArea"
            value={inputValue}
            ref={inputRef}
            onChange={(e) => {
              setInputValue(e.target.value);
              getDebounce(e.target.value);
            }}
          />
        )}
      </Column>
      <Column justify="center" alignItems="center">
        {selecteds.length || inputValue.length ? <DeleteIcon onClick={deleteAllHandler} /> : <ArrowDownIcon />}
      </Column>
      {searchResults && (
        <DropdownWrap>
          {searchResults.map((item: CategoryModel) => (
            <li key={item.categoryId} onClick={() => selectHandler(item)}>
              {item.categoryName}
            </li>
          ))}
          {!searchResults.length && <li className="empty">검색 결과가 없습니다.</li>}
        </DropdownWrap>
      )}
    </Container>
  );
};

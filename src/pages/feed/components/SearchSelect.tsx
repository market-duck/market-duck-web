import { useState } from 'react';
import { Search } from '@market-duck/components/Form/Search';
import styled from 'styled-components';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';

const ListWrap = styled.ul`
  margin-top: ${AppSpcing.XS};
`;

const ListItem = styled.li`
  padding: ${AppSpcing.XS};
  border-bottom: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
`;

export const SearchSelect = ({
  searchResultList,
  handleChange,
}: {
  searchResultList: Array<{ label: string; value: string }>;
  handleChange: (selectedValue: { label: string; value: string }) => void;
}) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div>
      <Search
        placeholder="검색 해보시죠. 아가씨."
        value={searchValue}
        changeHandler={(e) => {
          setSearchValue(e.target.value);
        }}
        deleteHandler={() => {
          setSearchValue('');
        }}
      />
      <ListWrap>
        {searchResultList.map((item) => {
          return (
            <ListItem
              key={item.value}
              onClick={() => {
                handleChange(item);
              }}
            >
              {item.value}
            </ListItem>
          );
        })}
      </ListWrap>
    </div>
  );
};

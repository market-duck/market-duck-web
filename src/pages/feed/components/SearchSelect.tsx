import { useState } from 'react';
import { Search } from '@market-duck/components/Form/Search';

export const SearchSelect = ({ searchResultList }: { searchResultList: Array<{ value: string }> }) => {
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
      <ul>
        {searchResultList.map((item) => {
          return <li key={item.value}>{item.value}</li>;
        })}
      </ul>
    </div>
  );
};

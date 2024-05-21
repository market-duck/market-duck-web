import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { AppColorStyle } from 'src/styles/tokens/AppColor';
import { AppResetStyle } from 'src/styles/tokens/Reset.style';
import { useState } from 'react';
import { Select } from '@market-duck/components/Select/Select';

function App() {
  const [value, setValue] = useState<string[]>([]);
  const optionList = [
    { label: '1번', value: '1' },
    { label: '2번', value: '2' },
    { label: '3번', value: '3' },
  ];
  return (
    <>
      <AppColorStyle />
      <AppResetStyle />
      {/* TODO:: Router */}
      <AppGutter>
        <Select.Container placeholder="placeholder 영역입니다" selectType="multi" value={value}>
          {optionList.map((item) => {
            return (
              <Select.Option
                onClick={() => {
                  if (!value.includes(item.value)) {
                    setValue([...value, item.value]);
                  }
                }}
                key={item.label}
                label={item.label}
                value={item.value}
              />
            );
          })}
        </Select.Container>
      </AppGutter>
    </>
  );
}

export default App;

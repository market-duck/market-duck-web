import { Button } from '@market-duck/components/Button/Button';
import { Toggle } from '@market-duck/components/Control/Toggle';
import { AppColorStyle } from 'src/styles/tokens/AppColor';
import { AppResetStyle } from 'src/styles/tokens/Reset.style';

function App() {
  return (
    <>
      <AppColorStyle />
      <AppResetStyle />
      {/* TODO:: Router */}
      <Toggle $size={16} checked={true} />
    </>
  );
}

export default App;

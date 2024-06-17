import { AppColorStyle } from 'src/styles/tokens/AppColor';
import { AppResetStyle } from 'src/styles/tokens/Reset.style';
import { appRouter } from './router/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { AppCommonStyle } from './styles/AppCommon.styles';

function App() {
  return (
    <>
      <AppColorStyle />
      <AppResetStyle />
      <AppCommonStyle />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

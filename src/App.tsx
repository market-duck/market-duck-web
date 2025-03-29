import { AppColorStyle } from 'src/styles/tokens/AppColor';
import { AppResetStyle } from 'src/styles/tokens/Reset.style';
import { appRouter } from './router/AppRouter';
import { RouterProvider } from 'react-router-dom';
import { AppCommonStyle } from './styles/AppCommon.styles';
import { CustomToastContainer } from './components/Toast/Toast';

function App() {
  return (
    <>
      <AppColorStyle />
      <AppResetStyle />
      <AppCommonStyle />
      <RouterProvider router={appRouter} />
      <CustomToastContainer position="top-right" autoClose={1000} limit={1} icon={false} hideProgressBar={true} />
    </>
  );
}

export default App;

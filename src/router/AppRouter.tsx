import { createBrowserRouter } from 'react-router-dom';
import { TestPage } from '@market-duck/pages/Test.page';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    Component: TestPage,
  },
]);

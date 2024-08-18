import { Alert } from '@market-duck/pages/alert/Alert.page';
import { Create } from '@market-duck/pages/feed/Create.page';
import { Edit } from '@market-duck/pages/feed/Edit.page';
import { Read } from '@market-duck/pages/feed/Read.page';
import { Home } from '@market-duck/pages/home/Home.page';
import { Login } from '@market-duck/pages/login/Login.page';
import { Mypage } from '@market-duck/pages/myPage/MyPage.page';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from 'src/layout/AppLayout';

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'alert',
        Component: Alert,
      },
      {
        path: 'mypage',
        Component: Mypage,
      },
      {
        path: 'feed',
        Component: Read,
        children: [
          {
            path: 'create',
            Component: Create,
          },
          {
            path: 'edit',
            Component: Edit,
          },
          // {
          //   path: '/show',
          //   Component: <></>,
          // },
        ],
      },
    ],
  },
]);

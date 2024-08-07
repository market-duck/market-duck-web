import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Home } from '@market-duck/pages/home/Home.page';
import { Read } from '@market-duck/pages/feed/Read.page';
import { AppLayout } from 'src/layout/AppLayout';
import { Alert } from '@market-duck/pages/alert/Alert.page';
import { Mypage } from '@market-duck/pages/myPage/MyPage.page';
import { Create } from '@market-duck/pages/feed/Create.page';
import { Edit } from '@market-duck/pages/feed/Edit.page';

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        Component: Home,
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
        Component: Outlet,
        children: [
          {
            path: 'read',
            Component: Read,
          },
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

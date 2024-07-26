import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Mypage } from '@market-duck/pages/myPage/MyPage.page';
import { Create } from '@market-duck/pages/feed/Create.page';
import { Alert } from '@market-duck/pages/alert/Alert.page';
import { Edit } from '@market-duck/pages/feed/Edit.page';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    Component: Outlet,
    children: [
      {
        path: '/alert',
        Component: Alert,
      },
      {
        path: '/mypage',
        Component: Mypage,
      },
      {
        path: '/feed',
        Component: Outlet,
        children: [
          {
            path: 'create',
            Component: Create,
          },
          {
            path: '/edit',
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

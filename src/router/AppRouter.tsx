import { Oauth } from '@market-duck/pages/Oauth.page';
import { Alert } from '@market-duck/pages/alert/Alert.page';
import { ContactList } from '@market-duck/pages/contact/Contact.page';
import { EditUserInfo } from '@market-duck/pages/editUserInfo/EditUserInfo.page';
import { Create } from '@market-duck/pages/feed/Create.page';
import { Edit } from '@market-duck/pages/feed/Edit.page';
import { Read } from '@market-duck/pages/feed/Read.page';
import { Home } from '@market-duck/pages/home/Home.page';
import { Login } from '@market-duck/pages/login/Login.page';
import { Mypage } from '@market-duck/pages/myPage/MyPage.page';
import { Onboard } from '@market-duck/pages/onboard/Onboard.page';
import { SignUp } from '@market-duck/pages/signUp/SignUp.page';
import { createBrowserRouter, Outlet } from 'react-router-dom';
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
        path: 'oauth',
        Component: Oauth,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'signUp',
        Component: SignUp,
      },
      {
        path: 'onboard',
        Component: Onboard,
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
        path: 'editUser',
        Component: EditUserInfo,
      },
      {
        path: 'feed',
        Component: Outlet,
        children: [
          { path: 'read', Component: Read },
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
      {
        path: 'contact',
        Component: Outlet,
        children: [{ path: 'list', Component: ContactList }],
      },
    ],
  },
]);

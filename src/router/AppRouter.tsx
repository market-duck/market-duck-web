import { NotFound } from '@market-duck/pages/NotFound.page';
import { Oauth } from '@market-duck/pages/Oauth.page';
import { Alert } from '@market-duck/pages/alert/Alert.page';
import { ContactList } from '@market-duck/pages/contact/ContactList.page';
import { ContactRead } from '@market-duck/pages/contact/ContactRead.page';
import { ContactCreate } from '@market-duck/pages/contact/ContectCreate.page';
import { EditUserInfo } from '@market-duck/pages/editUserInfo/EditUserInfo.page';
import { Create } from '@market-duck/pages/feed/Create.page';
import { Edit } from '@market-duck/pages/feed/Edit.page';
import { Read } from '@market-duck/pages/feed/Read.page';
import { Home } from '@market-duck/pages/home/Home.page';
import { Login } from '@market-duck/pages/login/Login.page';
import { Mypage } from '@market-duck/pages/myPage/MyPage.page';
import { NoticeDetail } from '@market-duck/pages/notice/NoticeDetail.page';
import { NoticeList } from '@market-duck/pages/notice/NoticeList.page';
import { SignUp } from '@market-duck/pages/signUp/SignUp.page';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import { AppLayout } from 'src/layout/AppLayout';

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
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
          {
            path: 'read/:feedId',
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
        children: [
          { path: 'list', Component: ContactList },
          { path: 'create', Component: ContactCreate },
          { path: 'read', Component: ContactRead },
        ],
      },
      {
        path: 'notice',
        Component: Outlet,
        children: [
          { path: 'list', Component: NoticeList },
          { path: 'detail', Component: NoticeDetail },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

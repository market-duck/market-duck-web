import { Outlet, useLocation } from 'react-router-dom';
import { NavigationBottom } from '@market-duck/components/Navigation/NavigationBottom';

export const AppLayout = () => {
  //TODO:: 임시로 이렇게 해두었지만...Public, PrivateRoute를 만드는 게 나을듯
  const accessToken = localStorage.getItem('accessToken');
  const location = useLocation();
  const isPublicPages =
    location.pathname === '/signUp' || location.pathname === '/onboard' || location.pathname === '/oauth';
  console.log(location.pathname);
  const isShowNavBottom = !!accessToken && !isPublicPages;

  return (
    <div>
      <Outlet />
      {isShowNavBottom && <NavigationBottom />}
    </div>
  );
};

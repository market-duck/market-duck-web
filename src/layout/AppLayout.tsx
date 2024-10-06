import { Outlet } from 'react-router-dom';
import { NavigationBottom } from '@market-duck/components/Navigation/NavigationBottom';

export const AppLayout = () => {
  return (
    <div>
      <Outlet />
      <NavigationBottom />
    </div>
  );
};

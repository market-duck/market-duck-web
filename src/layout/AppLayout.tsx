import { GlobalDialog } from '@market-duck/components/Dialog/GlobalDialog';
import { NavigationBottom } from '@market-duck/components/Navigation/NavigationBottom';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div>
      <Outlet />
      <NavigationBottom />
      <GlobalDialog />
    </div>
  );
};

import { userAPI } from '@market-duck/apis/userAPI';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { GlobalDialog } from '@market-duck/components/Dialog/GlobalDialog';
import { NavigationBottom } from '@market-duck/components/Navigation/NavigationBottom';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const AppLayout = () => {
  const [userInfo, setUserInfo] = useRecoilState(userDataAtom);
  const location = useLocation();

  useEffect(() => {
    if (userInfo) return;
    const savedUserId = localStorage.getItem('userId');
    if (!savedUserId) return;
    const getUser = async (userId: number) => {
      try {
        const result = await userAPI.getUserById({ userId });
        setUserInfo(result);
      } catch (err) {
        console.error(err);
      }
    };
    getUser(Number(savedUserId));
  }, []);

  // chat 경로에서는 NavigationBottom 숨기기
  const hideBottomNav = location.pathname.startsWith('/chat/room');

  return (
    <LayoutContainer>
      <Outlet />
      {!hideBottomNav && <NavigationBottom />}
      <GlobalDialog />
    </LayoutContainer>
  );
};

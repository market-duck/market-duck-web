import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { MenuList } from '@market-duck/pages/myPage/components/MenuList';
import { UserProfile } from '@market-duck/pages/myPage/components/UserProfile';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export const Mypage = () => {
  const userData = useRecoilValue(userDataAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      return navigate('/login');
    }
  }, []);

  if (!userData) return null;

  return (
    <>
      <NavigationTop title="내 정보" />
      <AppGutter>
        <UserProfile userInfo={userData} />
        <MenuList />
      </AppGutter>
    </>
  );
};

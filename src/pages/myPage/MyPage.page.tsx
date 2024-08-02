import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { MenuList } from '@market-duck/pages/myPage/components/MenuList';
import { UserProfile } from '@market-duck/pages/myPage/components/UserProfile';

export const Mypage = () => {
  const dummyData = {
    name: '단단무지',
    imgSrc: '',
    email: 'aaa@aaa.com',
    phoneNum: '010-1234-5678',
  };
  return (
    <AppGutter>
      <UserProfile userInfo={dummyData} />
      <MenuList />
    </AppGutter>
  );
};

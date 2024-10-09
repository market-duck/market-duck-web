import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
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
    <>
      <NavigationTop title="내 정보" />
      <AppGutter>
        <UserProfile userInfo={dummyData} />
        <MenuList />
      </AppGutter>
    </>
  );
};

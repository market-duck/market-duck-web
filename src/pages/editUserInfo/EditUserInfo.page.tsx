import { UserInfoForm } from '@market-duck/pages/myPage/components/UserInfoForm';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';

export const EditUserInfo = () => {
  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="회원 정보 수정" />
      <UserInfoForm page="editUser" />
    </>
  );
};

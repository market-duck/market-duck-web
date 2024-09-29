import { UserInfoForm } from '@market-duck/components/Form/UserInfoForm';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';

export const SignUp = () => {
  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="회원가입" />
      <UserInfoForm page="signUp" />
    </>
  );
};

import { UserInfoForm } from '@market-duck/components/Form/UserInfoForm';
import { UserPhoneNumberVerification } from '@market-duck/pages/myPage/components/UserPhoneNumberVerification';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import styled from 'styled-components';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';

const Container = styled(AppGutter)`
  height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
{
  /* TODO:: Contianer, PageHeading, Button 바깥으로 빼기 */
}
export const SignUp = () => {
  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="회원가입" />
      <Container>
        {/* <UserInfoForm page="signUp" /> */}
        <UserPhoneNumberVerification />
      </Container>
    </>
  );
};

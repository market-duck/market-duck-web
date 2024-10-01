import { UserInfoForm } from '@market-duck/components/Form/UserInfoForm';
import { UserPhoneNumberVerification } from '@market-duck/pages/myPage/components/UserPhoneNumberVerification';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [step, setStep] = useState<'phoneVerification' | 'userInfo'>('phoneVerification');
  const navigate = useNavigate();

  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="회원가입" />
      {step === 'phoneVerification' && (
        <UserPhoneNumberVerification
          page="signUp"
          step={step}
          onNext={() => {
            setStep('userInfo');
          }}
        />
      )}
      {step === 'userInfo' && (
        <UserInfoForm
          page="signUp"
          step={step}
          onNext={() => {
            navigate('/onboard');
          }}
        />
      )}
    </>
  );
};

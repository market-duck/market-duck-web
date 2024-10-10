import { UserInfoForm } from '@market-duck/pages/myPage/components/UserInfoForm';
import { UserPhoneNumberVerification } from '@market-duck/pages/myPage/components/UserPhoneNumberVerification';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [step, setStep] = useState<'phoneVerification' | 'userInfo'>('phoneVerification');
  const navigate = useNavigate();

  const backButtonHandler = () => {
    if (step === 'phoneVerification') {
      return;
    }

    if (step === 'userInfo') {
      setStep('phoneVerification');
    }
  };

  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="회원가입" onLeftClick={backButtonHandler} />
      {step === 'phoneVerification' && (
        <UserPhoneNumberVerification
          page="signUp"
          onNext={() => {
            setStep('userInfo');
          }}
        />
      )}
      {step === 'userInfo' && (
        <UserInfoForm
          page="signUp"
          onNext={() => {
            navigate('/onboard');
          }}
        />
      )}
    </>
  );
};

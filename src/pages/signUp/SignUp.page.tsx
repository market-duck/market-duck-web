import { UserInfoForm } from '@market-duck/pages/myPage/components/UserInfoForm';
import { UserPhoneNumberVerification } from '@market-duck/pages/myPage/components/UserPhoneNumberVerification';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectInterestTag } from '@market-duck/pages/myPage/components/SelectInterestTag';

export const SignUp = () => {
  const [step, setStep] = useState<'phoneVerification' | 'userInfo' | 'onBoard'>('phoneVerification');
  const navigate = useNavigate();

  const backButtonHandler = () => {
    if (step === 'phoneVerification') {
      return;
    }

    if (step === 'userInfo') {
      setStep('phoneVerification');
    }

    if (step === 'onBoard') {
      setStep('userInfo');
    }
  };

  return (
    <>
      <NavigationTop
        leftButtonIconType="basic"
        title={step === 'onBoard' ? '온보딩' : '회원가입'}
        onLeftClick={backButtonHandler}
      />
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
            setStep('onBoard');
          }}
        />
      )}
      {step === 'onBoard' && (
        <SelectInterestTag
          page="signUp"
          onNext={() => {
            navigate('/');
          }}
        />
      )}
    </>
  );
};

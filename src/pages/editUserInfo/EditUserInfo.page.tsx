import { UserInfoForm } from '@market-duck/pages/myPage/components/UserInfoForm';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPhoneNumberVerification } from '@market-duck/pages/myPage/components/UserPhoneNumberVerification';
import { SelectInterestTag } from '@market-duck/pages/myPage/components/SelectInterestTag';

//현재 작업한 프로세스
//1. 유저 정보 페이지로 진입
//2-1. 해당 페이지에서 휴대폰 번호 옆의 '수정'버튼을 눌러야만 핸드폰 인증 페이지로 진입가능
//2-2. 핸드폰 인증 페이지에서는 인증 완료 버튼 누를 시 유저 정보 페이지로 재진입 (이 경우 핸드폰 번호 정보 등의 변경사항이 반영되어 있어야 한다.)
//3. 2번 경로로 진입하지 않는 경우 유저 정보 페이지에서 수정 완료 시 온보딩 페이지로 진입
export const EditUserInfo = () => {
  const [step, setStep] = useState<'userInfo' | 'phoneVerification' | 'onBoard'>('userInfo');
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
      <NavigationTop leftButtonIconType="basic" title="회원가입" onLeftClick={backButtonHandler} />
      {step === 'userInfo' && (
        <UserInfoForm
          page="editUser"
          onNext={() => {
            setStep('onBoard');
          }}
        />
      )}
      {step === 'phoneVerification' && (
        <UserPhoneNumberVerification
          page="editUser"
          onNext={() => {
            setStep('userInfo');
          }}
        />
      )}
      {step === 'onBoard' && (
        <SelectInterestTag
          page="editUser"
          onNext={() => {
            navigate('/');
          }}
        />
      )}
    </>
  );
};

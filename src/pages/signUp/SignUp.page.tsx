import { userAPI } from '@market-duck/apis/userAPI';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useDialog } from '@market-duck/hooks/useDialog';
import { SelectInterestTag } from '@market-duck/pages/myPage/components/SelectInterestTag';
import { UserInfoForm } from '@market-duck/pages/myPage/components/UserInfoForm';
import { UserPhoneNumberVerification } from '@market-duck/pages/myPage/components/UserPhoneNumberVerification';
import { EditUserType } from '@market-duck/types/user';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Welcome } from '../myPage/components/Welcome';

export const SignUp = () => {
  const [step, setStep] = useState<'phoneVerification' | 'userInfo' | 'onBoard' | 'welcome'>('phoneVerification');
  const navigate = useNavigate();
  const [currentUserInfo, setCurrentUserInfo] = useRecoilState(userDataAtom);
  const { alert } = useDialog();

  const { mutateAsync } = useMutation({
    mutationKey: ['patch', 'user', currentUserInfo?.userId],
    mutationFn: async (data: EditUserType) => {
      if (!currentUserInfo?.userId) return;
      const res = await userAPI.editUserById({
        userId: currentUserInfo?.userId,
        userData: data,
      });
      return res;
    },
    onSuccess: (data) => {
      if (data) setCurrentUserInfo(data);
    },
    onError: (err) => {
      alert({ title: '전송 오류', desc: '데이터를 보내는 중 오류가 발생하였습니다.\n다시 시도해주세요.' });
    },
  });

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
          mutate={mutateAsync}
        />
      )}
      {step === 'onBoard' && (
        <SelectInterestTag
          page="signUp"
          onNext={() => {
            setStep('welcome');
          }}
          mutate={mutateAsync}
        />
      )}
      {step === 'welcome' && (
        <Welcome
          onNext={() => {
            navigate('/');
          }}
        />
      )}
    </>
  );
};

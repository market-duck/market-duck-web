import { Column } from '@market-duck/components/Flex/Flex';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { Input } from '@market-duck/components/Form/Input';
import { getPhoneNumberFormat } from '@market-duck/utils/format';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Button } from '@market-duck/components/Button/Button';
import { userAPI } from '@market-duck/apis/userAPI';
import styled from 'styled-components';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';

const InputButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  white-space: nowrap;
  gap: ${AppSpcing.M};

  :first-child {
    flex: 1;
  }

  :last-child {
    flex: 0.3;
  }
`;

interface VerifyData {
  phoneNum: string;
  verifyCode: string;
}

export const UserVerification = () => {
  const [data, setData] = useState<VerifyData>({
    phoneNum: '',
    verifyCode: '',
  });
  const [timer, setTimer] = useState(180); // 3분(180초)
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifySuccess, setIsVerifySuccess] = useState<boolean | null>(null);

  const verifyInputCaption = isTimerActive
    ? `${Math.floor(timer / 60)}: ${timer % 60}`
    : isVerifySuccess
      ? '인증이 완료되었습니다.'
      : errorMessage;

  const inputHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { id, value } = target;

    const onlyNumber = value.replace(/[^0-9]/g, '');

    setData((prev) => ({ ...prev, [id]: onlyNumber }));
  };

  const validation = (type: 'phoneNum' | 'nickName', value: string) => {
    if (type === 'phoneNum') {
      if (value === '') return;
      const phoneRule = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
      return !phoneRule.test(value) ? '휴대폰 번호가 제대로 입력되었는지 확인해주세요.' : '';
    }
  };

  //TODO:: throttle debounce?
  const handleSendVerifyCode = async () => {
    try {
      if (!validation('phoneNum', data.phoneNum)) {
      }
      await userAPI.sendPhoneNumVerifyNum({ phoneNumber: data.phoneNum });
      setIsCodeSent(true);
      setIsTimerActive(true);
      setTimer(180);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerifyCode = async () => {
    if (!data.verifyCode.length) {
      setErrorMessage('인증번호를 입력해주세요.');
      return;
    }

    try {
      const isValid = await userAPI.verifyPhoneNum({ phoneNumber: data.phoneNum, verifyNum: data.verifyCode });
      if (isValid) {
        setIsVerifySuccess(true);
        alert('인증에 성공했습니다!');
      } else {
        setErrorMessage('인증번호가 틀렸습니다.');
      }
    } catch (error) {
      setErrorMessage('인증에 실패했습니다.');
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setErrorMessage('시간이 초과되었습니다. 다시 시도해주세요.');
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  return (
    <Column gap="XL">
      <Column flex={0}>
        <PageHeading title="본인 인증" />
        <Typo tag="p" type="BODY_MD" className={AppSemanticColor.TEXT_TERTIARY.color}>
          보다 안전한 거래를 위해 본인 인증이 필요해요.
        </Typo>
      </Column>
      <Column gap="M" flex={0}>
        <InputButtonBox>
          <Input
            id="phoneNum"
            className="inputArea"
            label="휴대폰 번호"
            value={getPhoneNumberFormat(data?.phoneNum)}
            changeHandler={inputHandler}
            maxLength={13}
            isError={!!validation('phoneNum', data?.phoneNum)}
            caption={validation('phoneNum', data?.phoneNum)}
          />
          <Button className="inputButton" size="small" row variant="secondary" onClick={handleSendVerifyCode}>
            인증번호 발송
          </Button>
        </InputButtonBox>
        <InputButtonBox>
          <Input
            id="verificationNum"
            className="inputArea"
            label="인증번호"
            value={data?.verifyCode}
            changeHandler={inputHandler}
            isError={isCodeSent && isVerifySuccess !== null && !isVerifySuccess}
            caption={isCodeSent ? verifyInputCaption : ''}
          />
          <Button className="inputButton" size="small" row variant="secondary" onClick={handleVerifyCode}>
            인증하기
          </Button>
        </InputButtonBox>
      </Column>
    </Column>
  );
};

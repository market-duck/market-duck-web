import { Column } from '@market-duck/components/Flex/Flex';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { Input } from '@market-duck/components/Form/Input';
import { getPhoneNumberFormat } from '@market-duck/utils/format';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { Button } from '@market-duck/components/Button/Button';
import { userAPI } from '@market-duck/apis/userAPI';
import styled from 'styled-components';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { useInterval } from '@market-duck/hooks/useInterval';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';

const Container = styled(AppGutter)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  white-space: nowrap;
  gap: ${AppSpcing.M};

  > .inputArea {
    flex: 1;
  }

  > .inputButton {
    flex: 0.3;
    min-width: 6.75rem;
  }
`;

const TypoAlignCenter = styled(Typo)`
  text-align: center;
`;

interface UserPhoneNumberVerificationProps {
  page: 'signUp' | 'editUser';
  onNext: () => void;
}

interface VerifyData {
  phoneNum: string;
  verifyCode: string;
}

export const UserPhoneNumberVerification = ({ page, onNext }: UserPhoneNumberVerificationProps) => {
  const [data, setData] = useState<VerifyData>({
    phoneNum: '',
    verifyCode: '',
  });
  const [timer, setTimer] = useState(180); // 3분(180초)
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifySuccess, setIsVerifySuccess] = useState<boolean | null>(null);

  //인증번호 인풋 캡션
  const verifyInputCaption = isTimerActive
    ? `${Math.floor(timer / 60)}: ${timer % 60}`
    : isVerifySuccess
      ? '인증이 완료되었습니다.'
      : errorMessage;

  //input handler
  const inputHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { id, value } = target;

    const onlyNumber = value.replace(/[^0-9]/g, '');

    setData((prev) => ({ ...prev, [id]: onlyNumber }));
  };

  //핸드폰 번호
  const checkIsPhoneNumValid = (value: string) => {
    if (value === '') return false;
    const phoneRule = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
    return !phoneRule.test(value);
  };

  //인증번호 전송
  const handleSendVerifyCode = async () => {
    try {
      if (!checkIsPhoneNumValid(data.phoneNum)) {
      }
      const isSuccess = await userAPI.sendPhoneNumVerifyNum({ phoneNumber: data.phoneNum });

      if (isSuccess) {
        setIsCodeSent(true);
        setIsTimerActive(true);
        setTimer(180);
        setPhoneError('');
      }
    } catch (error) {
      setPhoneError('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  //인증번호 체크
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

  const submitHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(e.currentTarget.id);

    //본인 인증 완료 후 호출
    onNext();
  };

  useInterval(() => {
    if (isTimerActive) {
      setTimer((prev) => prev - 1);
    }
  }, 1000);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerActive(false);
      setErrorMessage(isVerifySuccess ? '' : '시간이 초과되었습니다. 다시 시도해주세요.');
    }
  }, [timer]);

  return (
    <Container>
      <Column gap="XL">
        <Column flex={0}>
          <PageHeading title="본인 인증" />
          <Typo tag="p" type="BODY_MD" className={AppSemanticColor.TEXT_TERTIARY.color}>
            {page === 'signUp'
              ? '보다 안전한 거래를 위해 본인 인증이 필요해요.'
              : '본인 인증을 통해 휴대폰 번호를 수정할 수 있습니다.'}
          </Typo>
        </Column>
        <Column gap="M" flex={0}>
          <InputButtonBox>
            <Input
              id="phoneNum"
              className="inputArea"
              label="휴대폰 번호"
              value={getPhoneNumberFormat(data.phoneNum)}
              changeHandler={inputHandler}
              maxLength={13}
              isError={!data.phoneNum.length || !checkIsPhoneNumValid(data.phoneNum)}
              caption={phoneError}
            />
            <Button
              disabled={isTimerActive}
              className="inputButton"
              size="small"
              row
              variant="secondary"
              onClick={handleSendVerifyCode}
            >
              {isCodeSent ? '인증번호 재발송' : '인증번호 발송'}
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
            <Button
              disabled={!isTimerActive || !isCodeSent}
              className="inputButton"
              size="small"
              row
              variant="secondary"
              onClick={handleVerifyCode}
            >
              인증하기
            </Button>
          </InputButtonBox>
        </Column>
      </Column>
      <Column gap="XS" flex={0}>
        <Button disabled={!isVerifySuccess} onClick={submitHandler}>
          {page === 'signUp' ? '다음으로' : '수정하기'}
        </Button>
        {page === 'signUp' && (
          <Column justify="center" flex={1}>
            <Button onClick={submitHandler} variant="text">
              건너뛰기
            </Button>
            <TypoAlignCenter tag="p" type="BODY_SM" className={AppSemanticColor.TEXT_TERTIARY.color}>
              본인 인증을 생략하면 서비스 이용에 제한이 있어요.
            </TypoAlignCenter>
          </Column>
        )}
      </Column>
    </Container>
  );
};

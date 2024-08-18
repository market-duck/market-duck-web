import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { Input } from '@market-duck/components/Form/Input';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';

const Container = styled(AppGutter)`
  height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface SubmitUserData {
  email: string;
  phoneNum: string;
  nickName: string;
  photo: File | undefined | null;
}

export const SignUp = () => {
  const [data, setData] = useState<SubmitUserData>({
    email: '',
    phoneNum: '',
    nickName: '',
    photo: null,
  });

  const inputHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { id, value } = target;
    console.log(id);
    if (id === 'phoneNum') {
      const onlyNumber = value.replace(/[^0-9]/g, '');
      setData((prev) => ({ ...prev, phoneNum: onlyNumber }));
      return;
    }
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const parsingPhoneNumber = (num: string) => {
    return num
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(-{1,2})$/g, '');
  };

  const validation = (type: 'phoneNum' | 'nickName', value: string) => {
    if (type === 'nickName') {
      const length = value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1').length;
      return length >= 13 ? '닉네임은 한글 6자, 영어 12자 이하여야 합니다.' : '';
    } else if (type === 'phoneNum') {
      if (value === '') return;
      const phoneRule = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
      return !phoneRule.test(value) ? '휴대폰 번호가 제대로 입력되었는지 확인해주세요.' : '';
    }
  };

  // TODO: 서버에 요청 보내기 전 validation 로직 추가 필요

  const submitHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log(e.currentTarget.id);
  };

  return (
    <>
      <NavigationTop leftButtonIconType="basic" title="회원가입" />
      <Container>
        <Column gap="XL" flex={0}>
          <PageHeading title="회원가입" />
          <Column gap="M" flex={0}>
            <Input id="email" label="이메일주소" value={data?.email} changeHandler={inputHandler} />
            <Input
              id="phoneNum"
              label="연락처"
              value={parsingPhoneNumber(data?.phoneNum)}
              changeHandler={inputHandler}
              maxLength={13}
              isError={!!validation('phoneNum', data?.phoneNum)}
              caption={validation('phoneNum', data?.phoneNum)}
            />
            <Input
              id="nickName"
              label="닉네임"
              value={data?.nickName}
              changeHandler={inputHandler}
              isError={!!validation('nickName', data?.nickName)}
              caption={validation('nickName', data?.nickName)}
            />
          </Column>
        </Column>
        <Button onClick={submitHandler}>회원가입</Button>
      </Container>
    </>
  );
};

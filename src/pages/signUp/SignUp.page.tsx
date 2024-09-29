import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column } from '@market-duck/components/Flex/Flex';
import { ImagesInput } from '@market-duck/components/Form/ImageInput';
import { Input } from '@market-duck/components/Form/Input';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
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
  const { imgFiles, imgSrcs, imageHandler } = useImageInput();

  useEffect(() => {
    setData((prev) => ({ ...prev, photo: imgFiles[0] }));
  }, [imgFiles]);

  const inputHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { id, value } = target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const validation = (type: 'nickName', value: string) => {
    if (type === 'nickName') {
      const length = value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1').length;
      return length >= 13 ? '닉네임은 한글 6자, 영어 12자 이하여야 합니다.' : '';
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
          <PageHeading title="회원정보 입력" />
          <Column gap="M" flex={0}>
            <Input
              id="nickName"
              label="닉네임"
              value={data?.nickName}
              changeHandler={inputHandler}
              isError={!!validation('nickName', data?.nickName)}
              caption={validation('nickName', data?.nickName)}
            />
            <ImagesInput title="프로필 사진" size="lg" length={1} imageHandler={imageHandler} imgSrcs={imgSrcs} />
          </Column>
        </Column>
        <Button onClick={submitHandler}>회원가입</Button>
      </Container>
    </>
  );
};

import Apple from '@market-duck/assets/icons/apple.svg?react';
import Google from '@market-duck/assets/icons/google.svg?react';
import Kakao from '@market-duck/assets/icons/kakao.svg?react';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { ImagesInput } from '@market-duck/components/Form/ImageInput';
import { Input } from '@market-duck/components/Form/Input';
import { PageHeading } from '@market-duck/components/PageHeading/PageHeading';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { UserLoginProviderType } from '@market-duck/types/user';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const Container = styled(AppGutter)`
  height: calc(100dvh - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .emailLabel {
    margin-bottom: ${AppSpcing.XXS};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    font-weight: 600;
    ${AppTypo.CAPTION_MD};
  }
`;

interface UserInfoFormProps {
  page: 'signUp' | 'editUser';
  onNext: () => void;
}

interface SubmitUserData {
  email: string;
  phoneNum: string;
  nickName: string;
  photo: File | undefined | null;
}

export const UserInfoForm = ({ page, onNext }: UserInfoFormProps) => {
  const currentUserInfo = useRecoilValue(userDataAtom);
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

    //api 요청 완료 후 호출
    onNext();
  };

  const createProviderIcon = (provider: UserLoginProviderType) => {
    switch (provider) {
      case 'GOOGLE':
        return <Google width={16} />;
      case 'KAKAO':
        return <Kakao width={16} />;
      case 'APPLE':
        return <Apple width={16} />;
    }
  };

  return (
    <Container>
      <Column gap="XL" flex={0}>
        {currentUserInfo && page === 'editUser' && (
          <Column gap="XXS">
            <span className="emailLabel">계정</span>
            <Row gap="XS">
              {createProviderIcon(currentUserInfo?.loginProvider)}
              <Typo type="BODY_MD" tag="p" className={AppSemanticColor.TEXT_SECONDARY.color}>
                {currentUserInfo?.username}
              </Typo>
            </Row>
          </Column>
        )}
        <PageHeading title={`회원 정보 ${page === 'signUp' ? '입력' : '수정'}`} />
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
      <Column gap="XS" flex={0}>
        <Button onClick={submitHandler}>{page === 'signUp' ? '다음으로' : '수정 완료'}</Button>
        {page === 'signUp' && (
          <Button onClick={submitHandler} variant="text">
            건너뛰기
          </Button>
        )}
      </Column>
    </Container>
  );
};

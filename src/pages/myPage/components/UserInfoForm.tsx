import { UserModel } from '@market-duck/apis/models/userModel';
import { userAPI } from '@market-duck/apis/userAPI';
import Apple from '@market-duck/assets/icons/apple.svg?react';
import Google from '@market-duck/assets/icons/google.svg?react';
import Kakao from '@market-duck/assets/icons/kakao.svg?react';
import { userDataAtom } from '@market-duck/atoms/user.atom';
import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { ImagesInput } from '@market-duck/components/Form/ImageInput';
import { Input } from '@market-duck/components/Form/Input';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useImageInput } from '@market-duck/hooks/useImageInput';
import { EditUserType, UserLoginProviderType } from '@market-duck/types/user';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { ChangeEventHandler, MouseEventHandler, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
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
  mutate: UseMutateAsyncFunction<UserModel | undefined, Error, EditUserType, unknown>;
}

interface SubmitUserData {
  email?: string;
  phoneNumber?: string;
  nickname?: string;
  photo?: File | undefined | null;
}

export const UserInfoForm = ({ page, onNext, mutate }: UserInfoFormProps) => {
  const [currentUserInfo, setCurrentUserInfo] = useRecoilState(userDataAtom);
  const [data, setData] = useState<SubmitUserData>(() => {
    if (currentUserInfo?.nickname) {
      return {
        nickname: currentUserInfo.nickname,
      };
    }
    return {};
  });
  const { images, deleteIdx, imageHandler, deleteHandler, serverImageHandler } = useImageInput();

  useEffect(() => {
    setData((prev) => ({ ...prev, photo: images[0]?.file }));
  }, [images]);

  const inputHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { id, value } = target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const validation = (type: 'nickname', value: string) => {
    if (type === 'nickname') {
      const length = value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, '$&$1').length;
      return length >= 13 ? '닉네임은 한글 6자, 영어 12자 이하여야 합니다.' : '';
    }
  };

  //delete Profile은 삭제 버튼 누르는 시점에 api 요청 한다
  const deleteProfileImageHandler = async (idx: number) => {
    if (currentUserInfo?.userId) {
      const newUserData = await userAPI.deleteProfileImage({ userId: currentUserInfo?.userId });
      deleteHandler(idx);

      setCurrentUserInfo(newUserData);
    }
  };

  const submitHandler: MouseEventHandler<HTMLButtonElement> = async () => {
    const { nickname, phoneNumber, photo } = data;

    if (!currentUserInfo?.userId) {
      return console.error('유저 아이디 정보가 없음');
    }

    if (nickname || phoneNumber) {
      await mutate({ nickname, phoneNumber });
    }

    if (photo) {
      const newUserData = await userAPI.uploadProfileImage({ userId: currentUserInfo.userId, image: photo });
      setCurrentUserInfo(newUserData);
    }

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

  useEffect(() => {
    if (currentUserInfo?.profileImageUrl) {
      serverImageHandler([currentUserInfo.profileImageUrl]);
    }
  }, []);

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
        <Column gap="M" flex={0}>
          {page === 'editUser' && (
            <Column gap="M" flex={0}>
              <Column alignItems="start" className={AppSemanticColor.TEXT_SECONDARY.color}>
                <Typo tag="p" type="CAPTION_MD" weight={600}>
                  휴대폰 번호
                </Typo>
                <Row alignItems="center" gap="S">
                  <Typo tag="p" type="BODY_MD" weight={500}>
                    {currentUserInfo?.phoneNumber}
                  </Typo>
                  <Button size="small" onClick={() => onNext()}>
                    수정
                  </Button>
                </Row>
              </Column>
            </Column>
          )}
          <Input
            id="nickname"
            label="닉네임"
            value={data?.nickname || ''}
            changeHandler={inputHandler}
            isError={!!validation('nickname', data?.nickname || '')}
            caption={validation('nickname', data?.nickname || '')}
          />
          <ImagesInput
            title="프로필 사진"
            size="lg"
            length={1}
            imageHandler={imageHandler}
            images={images}
            deleteHandler={deleteProfileImageHandler}
          />
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

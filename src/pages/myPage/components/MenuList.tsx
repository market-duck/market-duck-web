import * as FillIcon from '@heroicons/react/24/solid';
import { TextButton } from '@market-duck/components/Button/TextButton';
import { Dialog, DialogHandle } from '@market-duck/components/Dialog/Dialog';
import { Column } from '@market-duck/components/Flex/Flex';
import { ListItem } from '@market-duck/components/List/ListItem';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

const SectionWrap = styled(Column)`
  margin-bottom: 1.5rem;
`;

const ArrowRightIcon = styled(FillIcon.ChevronRightIcon)`
  width: 1.25rem;
  height: 1.25rem;
`;

export const MenuList = () => {
  const navigate = useNavigate();
  const dialogRef = useRef<DialogHandle>(null);

  const userInfoMenuList = [
    {
      name: '회원 정보 수정',
      action: () => navigate('/editUser'),
    },
    {
      name: '내가 작성한 피드',
      action: () => {},
    },
    {
      name: '내가 찜한 피드',
      action: () => {},
    },
    {
      name: '설정',
      action: () => {},
    },
    {
      name: '로그아웃',
      action: () => {},
    },
  ];

  const userSupportMenuList = [
    {
      name: '1:1 문의',
      action: () => navigate('/contact/list'),
    },
    {
      name: '서비스 소개',
      action: () => {},
    },
    {
      name: '이용 방법',
      action: () => {},
    },
    {
      name: '공지사항',
      action: () => navigate('/notice/list'),
    },
  ];

  return (
    <Column>
      <SectionWrap>
        <Typo tag="span" type="BODY_SM" className={AppSemanticColor.TEXT_TERTIARY.color}>
          고객 정보
        </Typo>
        <div>
          {userInfoMenuList.map((item) => {
            return <ListItem key={item.name} left={item.name} right={<ArrowRightIcon />} onClick={item.action} />;
          })}
        </div>
      </SectionWrap>

      <SectionWrap>
        <Typo tag="span" type="BODY_SM" className={AppSemanticColor.TEXT_TERTIARY.color}>
          고객 지원
        </Typo>
        <div>
          {userSupportMenuList.map((item) => {
            return <ListItem key={item.name} left={item.name} right={<ArrowRightIcon />} onClick={item.action} />;
          })}
        </div>
      </SectionWrap>

      <SectionWrap alignItems="start">
        <TextButton
          variant="secondary"
          onClick={() => {
            if (dialogRef.current) {
              dialogRef.current.open();
            }
          }}
        >
          <Typo tag="span" type="BODY_SM" weight={500}>
            회원 탈퇴
          </Typo>
        </TextButton>
      </SectionWrap>
      <Dialog
        title="정말로 마켓덕을 떠나시겠어요?"
        desc="탈퇴하시면 회원님의 모든 정보와 활동이 삭제됩니다.<br/>삭제된 정보는 복구 불가능합니다."
        ref={dialogRef}
        confirmBtnHandler={() => {
          console.log('탈퇴할거지롱!');
        }}
        customConfirmBtnText="탈퇴"
      />
    </Column>
  );
};

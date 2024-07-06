import { ListItem } from '@market-duck/components/List/ListItem';
import * as FillIcon from '@heroicons/react/24/solid';
import { createElement } from 'react';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';
import { Column } from '@market-duck/components/Flex/Flex';

const userInfoMenuList = [
  {
    name: '회원 정보 수정',
    action: () => {},
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
    action: () => {},
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
    action: () => {},
  },
];

const SectionWrap = styled(Column)`
  margin-bottom: 1.5rem;
`;

const ArrowRightIcon = styled(FillIcon.ChevronRightIcon)`
  width: 1.25rem;
  height: 1.25rem;
`;

export const MenuList = () => {
  return (
    <Column>
      <SectionWrap>
        <Typo type="BODY_SM" className={AppSemanticColor.TEXT_TERTIARY.color}>
          고객 정보
        </Typo>
        <div>
          {userInfoMenuList.map((item) => {
            return <ListItem left={item.name} right={<ArrowRightIcon />} onClick={item.action} />;
          })}
        </div>
      </SectionWrap>

      <SectionWrap>
        <Typo type="BODY_SM" className={AppSemanticColor.TEXT_TERTIARY.color}>
          고객 지원
        </Typo>
        <div>
          {userSupportMenuList.map((item) => {
            return <ListItem left={item.name} right={<ArrowRightIcon />} onClick={item.action} />;
          })}
        </div>
      </SectionWrap>
    </Column>
  );
};

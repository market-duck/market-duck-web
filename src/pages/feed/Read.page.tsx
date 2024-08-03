import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Button } from '@market-duck/components/Button/Button';
import { Row } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { FeedContent } from '@market-duck/pages/feed/components/FeedContent';
import { MouseEvent } from 'react';
import { AppColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Wrap = styled(AppGutter)`
  position: relative;
  display: flex;
  flex-direction: column;
  .btnContainer {
    position: sticky;
    width: 100%;
    left: 0;
    bottom: 60px;
    padding: ${AppSpcing.XS} 0;
    background-color: ${AppColor.WHITE.hex};
  }
`;

export const Read = () => {
  // TODO: 클라이언트에서 가지고 있는 유저 정보(id)와 게시글의 userId를 비교해 내 글일때 핸들링 필요(버튼 핸들러 및 드롭다운 등)
  // const isMyFeed: boolean = true;
  const isMyFeed: boolean = false;

  const btnHandler = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    const { id } = currentTarget;
    if (isMyFeed) {
      if (id === 'primary') {
        console.log('수정');
      } else if (id === 'secondary') {
        console.log('삭제');
      }
    } else {
      if (id === 'primary') {
        console.log('채팅');
      } else if (id === 'secondary') {
        console.log('찜');
      }
    }
  };

  return (
    <>
      <NavigationTop title="피드" />
      <Wrap>
        <FeedContent />
        <Row className="btnContainer" gap="XS">
          <Button id="secondary" size="medium" variant="secondary" row onClick={btnHandler}>
            {isMyFeed ? '삭제' : '찜'}
          </Button>
          <Button id="primary" size="medium" variant="primary" row onClick={btnHandler}>
            {isMyFeed ? '수정' : '채팅'}
          </Button>
        </Row>
      </Wrap>
    </>
  );
};

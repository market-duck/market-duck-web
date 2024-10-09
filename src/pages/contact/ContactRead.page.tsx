import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Tag } from '@market-duck/components/Tag/Tag';
import { Typo } from '@market-duck/components/Typo/Typo';
import { FeedImageSlider } from '@market-duck/pages/feed/components/FeedImageSlider';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

const Wrap = styled(AppGutter)`
  position: relative;
  display: flex;
  flex-direction: column;
  .desc {
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    white-space: pre-wrap;
  }
`;

const dummy = {
  category: '피드',
  title: '피드 작성 중 오류',
  content: '피드 작성 중 오류가 생깁니다\n확인 부탁드려요',
  images: ['https://placehold.co/500x400', 'https://placehold.co/300x400'],
  createdAt: new Date(),
};

// TODO: API 연결 필요
export const ContactRead = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contactId: number = location.state.id;

  return (
    <>
      <NavigationTop leftButtonIconType="back" title="1:1 문의내역" onLeftClick={() => navigate('/contact/list')} />
      <Wrap>
        <Column className="contents" gap="XXS">
          <Typo tag="p" className={AppSemanticColor.TEXT_TERTIARY.color} type="CAPTION_SM" align="right">
            작성일: {dayjs(dummy.createdAt).format('YYYY-MM-DD')}
          </Typo>
          <Row className="tagContainer" gap="XS">
            <Tag color="secondary" text="피드" />
          </Row>
          <Column className="descContainer" gap="XXS">
            <Typo tag="p" className="title" type="BODY_LG">
              {dummy.title}
            </Typo>
            <Typo tag="p" className="desc" type="BODY_MD">
              {dummy.content}
            </Typo>
          </Column>
          <FeedImageSlider imgSrcs={dummy.images} />
        </Column>
      </Wrap>
    </>
  );
};

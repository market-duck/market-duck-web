import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useLocation } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const NoticeContentWrap = styled(Column)`
  margin-top: ${AppSpacing.XXS};
`;
const NoticeDateArea = styled(Row)`
  width: 100%;
  margin-top: ${AppSpacing.XXS};
`;

//TODO:: 공지사항 리스트 API

const dummyDetail = {
  title: '마켓덕 서비스 소개',
  date: '2024-09-27',
  content:
    '마켓덕이란 💨<br/>오타쿠들을 위한 중고거래 서비스입니다.<br/><br/>좋아하는 굿즈를 사고 팔고, 새로운 팬들과 소통하며 더 많은 즐거움을 누려보세요.<br/><br/>희귀한 피규어, 한정판 DVD, 굿즈까지 원하는 모든 아이템을 손쉽게 거래할 수 있는 곳입니다.<br/><br/>지금 가입하고 나만의 굿즈 컬렉션을 완성해보세요!',
};

export const NoticeDetail = () => {
  const location = useLocation();
  const noticeId: number = location.state.id;

  const setLineChangeContent = (data: string) => {
    if (!data) {
      return [];
    }
    const replaceContent = data.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
    return replaceContent.split('\n');
  };

  const noticeContentList = setLineChangeContent(dummyDetail.content);

  return (
    <>
      <NavigationTop title="공지사항" leftButtonIconType="back" />
      <AppGutter>
        <Column alignItems="start" justify="center">
          <NoticeDateArea justify="end" alignItems="end" flex={0}>
            <Typo type="CAPTION_SM" weight={500} tag="p" className={AppSemanticColor.TEXT_TERTIARY.color}>
              {dummyDetail.date}
            </Typo>
          </NoticeDateArea>
          <Typo type="BODY_LG" weight={500} tag="p" className={AppSemanticColor.TEXT_PRIMARY.color}>
            {dummyDetail.title}
          </Typo>
          <NoticeContentWrap>
            {noticeContentList.map((line, index) => {
              const isEmpty = line === '\r';
              return isEmpty ? (
                <div key={`empty_${index}`} style={{ margin: '16px 0' }} />
              ) : (
                <Typo
                  key={`${line}_${index}`}
                  type="BODY_MD"
                  weight={500}
                  tag="p"
                  className={AppSemanticColor.TEXT_SECONDARY.color}
                >
                  {line}
                </Typo>
              );
            })}
          </NoticeContentWrap>
        </Column>
      </AppGutter>
    </>
  );
};

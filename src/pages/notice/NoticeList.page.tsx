import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { ListItem } from '@market-duck/components/List/ListItem';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NoticeListWrap = styled(AppGutter)`
  display: flex;
  flex-direction: column;
`;

const dummy = [
  { title: '[공지] 이용약관 변경 안내', id: '12313930a' },
  { title: 'v1.21업데이트 내용', id: '12313930b' },
  { title: '마켓덕 서비스 소개', id: '12313930c' },
  { title: '금일 새벽에 있었던 푸시 전송 오류에 대해 말씀드립니다', id: '12313930d' },
];

export const NoticeList = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavigationTop title="공지사항" leftButtonIconType="back" />
      <NoticeListWrap>
        {dummy.map(({ title, id }) => (
          <ListItem
            key={id}
            left={title}
            onClick={() => {
              //혹은 queryparam으로 넘기거나...
              navigate(`/notice/detail`, { state: { id } });
            }}
          />
        ))}
      </NoticeListWrap>
    </>
  );
};

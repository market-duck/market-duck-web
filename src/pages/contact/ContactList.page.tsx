import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { ListItem } from '@market-duck/components/List/ListItem';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrap = styled(AppGutter)`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const dummy = [
  { id: 0, title: '피드 작성 중 오류' },
  { id: 1, title: '내가 작성한 피드 문의' },
  { id: 2, title: 'UI 제안' },
  { id: 3, title: '피드 작성 중 오류' },
  { id: 4, title: '내가 작성한 피드 문의' },
  { id: 5, title: 'UI 제안' },
];

// TODO: API 연결 및 하위 페이지 이동 연결 필요
export const ContactList = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavigationTop
        leftButtonIconType="back"
        title="1:1 문의내역"
        onLeftClick={() => navigate('/myPage')}
        rightButton={'문의하기'}
        onRightClick={() => navigate('/contact/create')}
      />
      <Wrap>
        {dummy.map(({ title, id }) => (
          <ListItem
            key={id}
            left={title}
            onClick={() => {
              navigate(`/contact/read`, { state: { id } });
            }}
          />
        ))}
      </Wrap>
    </>
  );
};

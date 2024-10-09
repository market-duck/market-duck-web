import { AppGutter } from '@market-duck/components/AppGutter/AppGutter';
import { ListItem } from '@market-duck/components/List/ListItem';
import { NavigationTop } from '@market-duck/components/Navigation/NavigationTop';
import { useNavigate } from 'react-router-dom';
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

const dummy = ['피드 작성 중 오류', '내가 작성한 피드 문의', 'UI 제안'];

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
        {dummy.map((title) => (
          <ListItem key={title} left={title} />
        ))}
      </Wrap>
    </>
  );
};

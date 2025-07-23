import { BaseUserModel } from '@market-duck/apis/models/userModel';
import { Divider } from '@market-duck/components/Divider/Divider';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Avatar } from '@market-duck/components/Image/Avatar';
import { Typo } from '@market-duck/components/Typo/Typo';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const Container = styled(Column)`
  .user {
    padding: ${AppSpacing.M} 0;
  }
`;

export const FeedUser = ({ user }: { user: BaseUserModel }) => {
  return (
    <Container>
      <Divider />
      <Row alignItems="center" gap="M" className="user">
        <Avatar size="md" imgSrc={user.profileImageUrl} />
        <Typo tag="p" weight={600} type="BODY_MD">
          <div>{user.nickname}</div>
        </Typo>
      </Row>
      <Divider />
    </Container>
  );
};

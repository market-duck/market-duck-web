import { Badge } from '@market-duck/components/Badge/Badge';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { ListItem } from '@market-duck/components/List/ListItem';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useNavigate } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import styled from 'styled-components';

interface ChatListItemProps {
  imgUrl: string;
  id: number;
  name: string;
  lastMessage: string;
  noReadCount: number;
  lastViewDate: string;
}

const ChatImg = styled.img`
  border-radius: 8px;
  width: 3rem;
  height: 3rem;
`;

const Left = ({ imgUrl, name, lastMessage }: Pick<ChatListItemProps, 'imgUrl' | 'lastMessage' | 'name'>) => {
  return (
    <Row gap="XS">
      <ChatImg src={imgUrl} />
      <Column gap="XXXS" justify="center">
        <Typo tag="p" type="BODY_SM" weight={600} className={AppSemanticColor.TEXT_PRIMARY.color}>
          {name}
        </Typo>
        <Typo tag="p" type="BODY_SM" weight={500} className={AppSemanticColor.TEXT_TERTIARY.color}>
          {lastMessage}
        </Typo>
      </Column>
    </Row>
  );
};

const Right = ({ noReadCount, lastViewDate }: Pick<ChatListItemProps, 'noReadCount' | 'lastViewDate'>) => {
  return (
    <Column gap="XXS" alignItems="end" justify="end">
      {noReadCount > 0 && (
        <Badge size="md" variant="danger">
          {String(noReadCount)}
        </Badge>
      )}
      <Typo tag="p" type="CAPTION_MD" weight={500} className={AppSemanticColor.TEXT_TERTIARY.color}>
        {lastViewDate}
      </Typo>
    </Column>
  );
};

export const ChatListItem = ({ imgUrl, id, name, lastMessage, noReadCount, lastViewDate }: ChatListItemProps) => {
  const navigate = useNavigate();
  return (
    <ListItem
      key={id}
      align="end"
      left={<Left imgUrl={imgUrl} name={name} lastMessage={lastMessage} />}
      right={<Right noReadCount={noReadCount} lastViewDate={lastViewDate} />}
      onClick={() => {
        navigate('/chat/room', { state: { roomId: id } });
      }}
    />
  );
};

import styled from 'styled-components';
import { Column, alignItemsStart, justifyCenter } from '@market-duck/components/Flex/Flex';
import { Badge } from '@market-duck/components/Badge/Badge';
import { ListItem } from '@market-duck/components/List/ListItem';

const AlertListWrap = styled(Column)``;

const AlertListContent = ({ content, timeText }: { content: string; timeText: string }) => {
  return (
    <Column alignItems={alignItemsStart} justify={justifyCenter}>
      <p>{content}</p>
      <p>{timeText}</p>
    </Column>
  );
};

const AlertBadge = ({ count }: { count: number }) => {
  return <Badge variant="danger" size="lg" children={`${count}`} />;
};

//TODO::API 데이터 작업 후 수정 예정
interface AlertData {
  type: string;
  count: number;
  keyword: string;
  time: string;
}

export const AlertList = ({ alertList }: { alertList: Array<AlertData> }) => {
  //TODO:: service 등으로 빼거나, 데이터 단에서 포맷팅 하도록 리팩토링하기
  const getAlertTypeToDescription = (type: string, keyword: string) => {
    switch (type) {
      case 'chat':
        return `${keyword} 글에 채팅을 요청했어요.`;
      case 'newFeed':
        return `${keyword}에 새로운 피드가 등록되었어요.`;
      default:
        return '디폴트 워딩';
    }
  };

  return (
    <AlertListWrap>
      {alertList.map((item) => {
        return (
          <ListItem
            left={
              <AlertListContent content={getAlertTypeToDescription(item.type, item.keyword)} timeText={item.time} />
            }
            right={<AlertBadge count={item.count} />}
          />
        );
      })}
    </AlertListWrap>
  );
};

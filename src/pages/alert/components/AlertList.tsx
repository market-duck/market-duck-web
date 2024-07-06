import styled from 'styled-components';
import { Column, Row, alignItemsStart, justifyCenter } from '@market-duck/components/Flex/Flex';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { Badge } from '@market-duck/components/Badge/Badge';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';

const AlertListWrap = styled(Column)``;

const AlertListItem = styled(Row)`
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  padding: ${AppSpcing.XS};
`;

//TODO::API 데이터 작업 후 수정 예정
interface AlertData {
  type: string;
  count: number;
  keyword: string;
  time: string;
}

export const AlertList = ({ alertList }: { alertList: Array<AlertData> }) => {
  //TODO:: service 등으로 빼거나, 데이터 단에서 포맷팅 하도록 리팩토링하기
  const getAlertTypeToDescription = (type: string) => {
    switch (type) {
      case 'chat':
        return '글에 채팅을 요청했어요.';
      case 'newFeed':
        return '에 새로운 피드가 등록되었어요.';
    }
  };

  return (
    <AlertListWrap>
      {alertList.map((item) => {
        return (
          <AlertListItem>
            <Column alignItems={alignItemsStart} justify={justifyCenter}>
              <p>
                {item.keyword}
                {getAlertTypeToDescription(item.type)}
              </p>
            </Column>
            <Badge variant="danger" size="lg" children={`${item.count}`} />
          </AlertListItem>
        );
      })}
    </AlertListWrap>
  );
};

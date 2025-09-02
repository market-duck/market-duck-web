import { XMarkIcon } from '@heroicons/react/24/outline';
import { Column, Row } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { useDialog } from '@market-duck/hooks/useDialog';
import { Link } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const AlertListWrap = styled(Column)`
  flex: 1;
  overflow-y: auto;
  gap: ${AppSpacing.S};
`;

const AlertListItem = styled(Row)`
  padding: ${AppSpacing.XS};
  .link {
    flex: 1;
  }

  .delete-btn {
    width: 1rem;
    height: 1rem;
    color: ${AppSemanticColor.TEXT_TERTIARY.hex};
    .icon {
      width: 1rem;
      height: 1rem;
      color: ${AppSemanticColor.TEXT_TERTIARY.hex};
    }
  }
`;

const AlertListContent = ({
  content,
  timeText,
  isRead,
  to,
}: {
  content: string;
  timeText: string;
  isRead: boolean;
  to: string;
}) => {
  const { confirm } = useDialog();

  const handleDelete = async () => {
    try {
      const result = await confirm({
        title: '알림을 삭제할까요?',
        desc: '삭제한 알림은 복구할 수 없습니다.',
        positiveBtnText: '삭제',
        positiveBtnVariant: 'danger',
      });
      if (result) {
        console.log('delete');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AlertListItem justify="between" alignItems="start" gap="XS">
      <Link to={to} className="link">
        <Column gap="XXS">
          <Typo
            tag="p"
            type="BODY_MD"
            className={!isRead ? AppSemanticColor.TEXT_PRIMARY.color : AppSemanticColor.TEXT_TERTIARY.color}
          >
            {content}
          </Typo>
          <Typo
            tag="p"
            type="CAPTION_MD"
            className={!isRead ? AppSemanticColor.TEXT_SECONDARY.color : AppSemanticColor.TEXT_TERTIARY.color}
          >
            {timeText}
          </Typo>
        </Column>
      </Link>
      <button onClick={handleDelete} className="delete-btn">
        <XMarkIcon className="icon" />
      </button>
    </AlertListItem>
  );
};

//TODO::API 데이터 작업 후 수정 예정
interface AlertData {
  id: string;
  type: string;
  isRead: boolean;
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
          <AlertListContent
            key={item.id}
            content={getAlertTypeToDescription(item.type, item.keyword)}
            timeText={item.time}
            isRead={item.isRead}
            to="/"
          />
        );
      })}
    </AlertListWrap>
  );
};

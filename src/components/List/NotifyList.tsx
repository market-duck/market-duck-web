import { alignItemsStart, Column } from '@market-duck/components/Flex/Flex';
import { Typo } from '@market-duck/components/Typo/Typo';
import { getTimeDiff } from '@market-duck/utils/date';
import { HTMLAttributes } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const StyledNotifyList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

interface NotifyListProps extends HTMLAttributes<HTMLUListElement> {
  area?: 'left' | 'right' | 'none';
  data: { content: string; createdAt: Date; imgSrc: string }[]; // TODO : 알림 데이터 형식 정해지면 type으로 바꿀 것
}

export const NotifyList = ({ data, area }: NotifyListProps) => {
  // TODO : key를 데이터 id로 바꿀 것

  return (
    <StyledNotifyList>
      {data.map((notify) => (
        <NotifyListItem data={notify} area={area} key={notify.imgSrc} />
      ))}{' '}
    </StyledNotifyList>
  );
};

const StyledNotifyListItem = styled.li`
  border-bottom: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};

  &:last-of-type {
    border: none;
  }

  & .btn {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    gap: ${AppSpcing.XS};
    padding: ${AppSpcing.XS};
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_HOVER.hex};
    }
    &:active {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_PRESS.hex};
    }
  }

  & .area {
    width: 40px;
    height: 40px;
    border-radius: ${AppRadii.M};
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

interface NotifyListItemProps extends HTMLAttributes<HTMLButtonElement> {
  area?: 'left' | 'right' | 'none';
  data: { content: string; createdAt: Date; imgSrc: string }; // TODO : 알림 데이터 형식 정해지면 type으로 바꿀 것
}

export const NotifyListItem = ({ area = 'left', data, onClick }: NotifyListItemProps) => {
  const Area = () => {
    return (
      <div className="area">
        <img src={data?.imgSrc} alt={data.content} />
      </div>
    );
  };

  return (
    <StyledNotifyListItem>
      <button className="btn" onClick={onClick}>
        {area === 'left' && <Area />}
        <Column className="contents" alignItems={alignItemsStart}>
          <Typo type="BODY_MD" className={AppSemanticColor.TEXT_PRIMARY.color}>
            {data?.content}
          </Typo>
          <Typo type="CAPTION_MD" className={AppSemanticColor.TEXT_TERTIARY.color}>
            {getTimeDiff(data?.createdAt)}
          </Typo>
        </Column>
        {area === 'right' && <Area />}
      </button>
    </StyledNotifyListItem>
  );
};

import styled from 'styled-components';
import { Row } from '../Flex/Flex';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { useState } from 'react';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';

interface TabItem {
  id: string;
  name: string;
}

const ItemWrap = styled.div.attrs<{ $isSelected: boolean }>(({ $isSelected }) => {
  return {
    className: `${$isSelected ? 'is-selected' : ''}`,
  };
})`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  padding: ${AppSpcing.S} ${AppSpcing.XS};
  color: ${AppSemanticColor.TEXT_SECONDARY.hex};

  &.is-selected {
    color: ${AppSemanticColor.TEXT_PRIMARY.hex};
    border-color: ${AppSemanticColor.BORDER_INTERACTIVE_SECONDARY.hex};
  }
`;

const TabWrap = styled(Row)`
  width: 100%;
`;

const TabItem = ({ tabName, isSelected, onClick }: { tabName: string; isSelected: boolean; onClick: () => void }) => {
  return (
    <ItemWrap onClick={onClick} $isSelected={isSelected}>
      {tabName}
    </ItemWrap>
  );
};

export const Tab = ({
  tabList,
  selectedTab,
  setSelectedTab,
}: {
  tabList: Array<TabItem>;
  selectedTab: string; //tabId 저장
  setSelectedTab: (tabId: string) => void;
}) => {
  return (
    <TabWrap>
      {tabList.map((item) => {
        return (
          <TabItem
            key={item.id}
            tabName={item.name}
            isSelected={item.id === selectedTab}
            onClick={() => {
              setSelectedTab(item.id);
            }}
          />
        );
      })}
    </TabWrap>
  );
};

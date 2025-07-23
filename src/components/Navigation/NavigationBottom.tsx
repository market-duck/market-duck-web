import * as FilledIcon from '@heroicons/react/24/solid';
import { NavigationMenuEnum, useNavigationMenu } from '@market-duck/atoms/NavigationMenu.atom';
import { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const navigationMenuList: {
  id: NavigationMenuEnum;
  menuName: string;
  icon: keyof typeof FilledIcon;
}[] = [
  {
    id: NavigationMenuEnum.home,
    menuName: '홈',
    icon: 'HomeIcon',
  },
  {
    id: NavigationMenuEnum.search,
    menuName: '검색',
    icon: 'MagnifyingGlassIcon',
  },
  {
    id: NavigationMenuEnum.create,
    menuName: '작성',
    icon: 'PlusCircleIcon',
  },
  {
    id: NavigationMenuEnum.chat,
    menuName: '채팅',
    icon: 'ChatBubbleOvalLeftEllipsisIcon',
  },
  {
    id: NavigationMenuEnum.myPage,
    menuName: '내정보',
    icon: 'UserCircleIcon',
  },
];

const MenuWrap = styled.button.attrs<{ $isSelected: boolean }>(({ $isSelected }) => {
  return {
    className: `${$isSelected && 'is-selected'}`,
  };
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(${AppSpacing.XXS} + 2px);
  flex: 1;
  padding: ${AppSpacing.S} 0;
  cursor: pointer;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  color: ${AppSemanticColor.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${AppTypo.BODY_SM};

  > .icon {
    width: 1.5rem;
    height: 1.5rem;
    color: ${AppSemanticColor.ICON_TERTIARY.hex};
  }
  &.is-selected {
    background-color: ${AppSemanticColor.BG_PRIMARY.hex};
    color: ${AppSemanticColor.TEXT_PRIMARY.hex};
    > .icon {
      color: ${AppSemanticColor.ICON_PRIMARY.hex};
    }
  }
`;

const MenuItem = ({
  isSelected,
  menuName,
  icon,
  onClick,
}: {
  isSelected: boolean;
  menuName: string;
  icon: keyof typeof FilledIcon;
  onClick: () => void;
}) => {
  return (
    <MenuWrap $isSelected={isSelected} onClick={onClick}>
      <span className="icon">{createElement(FilledIcon[icon])}</span>
      <span>{menuName}</span>
    </MenuWrap>
  );
};

const NavigationBottomWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  padding: 0 calc(${AppSpacing.XXS} + 2px);
`;

export const NavigationBottom = () => {
  const { getCurrentMenu, changeMenu } = useNavigationMenu();
  const navigate = useNavigate();

  return (
    <NavigationBottomWrap>
      {navigationMenuList.map((item) => {
        return (
          <MenuItem
            key={item.id}
            isSelected={item.id === getCurrentMenu()}
            onClick={() => {
              changeMenu(item.id);
              navigate(item.id);
            }}
            menuName={item.menuName}
            icon={item.icon as keyof typeof FilledIcon}
          />
        );
      })}
    </NavigationBottomWrap>
  );
};

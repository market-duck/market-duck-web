import styled from 'styled-components';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import * as OutlineIcon from '@heroicons/react/24/outline';
import { NavigationMenuEnum, useNavigationMenu } from '@market-duck/atoms/NavigationMenu.atom';
import { createElement } from 'react';
import { AppTypo } from 'src/styles/tokens/AppTypo';

const navigationMenuList = [
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
    id: NavigationMenuEnum.write,
    menuName: '작성',
    icon: 'PlusIcon',
  },
  {
    id: NavigationMenuEnum.chat,
    menuName: '채팅',
    icon: 'ChatBubbleLeftRightIcon',
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
  gap: ${AppSpcing.XXS};
  flex: 1;
  padding: ${AppSpcing.XS} 0 ${AppSpcing.XXS};
  cursor: pointer;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  font-weight: 500;
  ${AppTypo.BODY_SM};

  &.is-selected {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY.hex};
  }

  > .icon {
    width: 1.5rem;
    height: 1.5rem;
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
  icon: keyof typeof OutlineIcon;
  onClick: () => void;
}) => {
  return (
    <MenuWrap $isSelected={isSelected} onClick={onClick}>
      <span className="icon">{createElement(OutlineIcon[icon])}</span>
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
  border-top: 1px inset ${AppSemanticColor.BORDER_TERTIARY.hex};
`;

export const NavigationBottom = () => {
  const { getCurrentMenu, changeMenu } = useNavigationMenu();

  return (
    <NavigationBottomWrap>
      {navigationMenuList.map((item) => {
        return (
          <MenuItem
            key={item.id}
            isSelected={item.id === getCurrentMenu()}
            onClick={() => {
              changeMenu(item.id);
            }}
            menuName={item.menuName}
            icon={item.icon as keyof typeof OutlineIcon}
          />
        );
      })}
    </NavigationBottomWrap>
  );
};

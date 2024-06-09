import { ReactNode, createElement } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';
import * as OutlineIcon from '@heroicons/react/24/outline';
import * as FillIcon from '@heroicons/react/24/solid';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';

const NavigationTopWrap = styled.div`
  width: 100%;
  padding: ${AppSpcing.S} ${AppSpcing.M};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  ${AppTypo.BODY_MD}
`;

const NavigationTopButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
`;

export const NavigationTop = ({
  title,
  rightButton,
  leftButton,
  onLeftClick,
  onRightClick,
  leftButtonIconType = 'back',
  alarmButtonIconType = 'outline',
}: {
  title: string;
  rightButton?: ReactNode;
  leftButton?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  leftButtonIconType?: 'basic' | 'back';
  alarmButtonIconType?: 'fill' | 'outline';
}) => {
  //TODO:: logoSvg완성 시 추후에 leftButtonIconType basic인 경우 logosvg 렌더하도록 처리 필요
  const leftIcon = OutlineIcon.ChevronLeftIcon;
  const bellIcon = alarmButtonIconType === 'fill' ? FillIcon.BellIcon : OutlineIcon.BellIcon;
  const leftComponent = leftButton || createElement(leftIcon);
  const rightComponent = rightButton || createElement(bellIcon);

  const leftClickAction = () => {
    //TODO:: 추후 더 자세한 처리 필요
    if (onLeftClick) {
      return onLeftClick();
    }
    if (leftButtonIconType === 'back') {
      // TODO:: back action
    }

    return;
  };

  const rightClickAction = () => {
    //TODO:: 추후 더 자세한 처리 필요
    if (onRightClick) {
      return onRightClick();
    } else {
      //TODO:: alarm page로 이동
    }
  };

  return (
    <NavigationTopWrap>
      <NavigationTopButton onClick={leftClickAction}>{leftComponent}</NavigationTopButton>
      <span>{title}</span>
      <NavigationTopButton onClick={rightClickAction}>{rightComponent}</NavigationTopButton>
    </NavigationTopWrap>
  );
};

import * as OutlineIcon from '@heroicons/react/24/outline';
import * as FillIcon from '@heroicons/react/24/solid';
import { TextButton } from '@market-duck/components/Button/TextButton';
import { ReactNode, createElement } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const NavigationTopWrap = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  padding: ${AppSpcing.S} ${AppSpcing.M};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  ${AppTypo.BODY_MD}

  .title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const NavigationTopButton = styled.button`
  min-width: 1.5rem;
  min-height: 1.5rem;
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
      <span className="title">{title}</span>
      {onRightClick ? (
        typeof rightButton === 'string' ? (
          <TextButton variant="primary" onClick={rightClickAction}>
            {rightButton}
          </TextButton>
        ) : (
          <NavigationTopButton onClick={rightClickAction}>{rightComponent}</NavigationTopButton>
        )
      ) : (
        <div></div>
      )}
    </NavigationTopWrap>
  );
};

import * as OutlineIcon from '@heroicons/react/24/outline';
import * as FillIcon from '@heroicons/react/24/solid';
import SymbolIcon from '@market-duck/assets/images/symbol.svg?react';
import { TextButton } from '@market-duck/components/Button/TextButton';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
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
  leftButtonIconType = 'basic',
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
  const { ChevronLeftIcon, BellIcon: OutlineBellIcon } = OutlineIcon;
  const { BellIcon: FillBellIcon } = FillIcon;
  const BellIcon = alarmButtonIconType === 'fill' ? FillBellIcon : OutlineBellIcon;
  // const LeftComponent = SymbolIcon || leftButton || createElement(LeftIcon);
  const LeftComponent = leftButtonIconType === 'basic' ? <SymbolIcon /> : <ChevronLeftIcon />;
  const RightComponent = rightButton || <BellIcon />;
  const navigate = useNavigate();

  const leftClickAction = () => {
    //TODO:: 추후 더 자세한 처리 필요
    if (onLeftClick) {
      return onLeftClick();
    }
    if (leftButtonIconType === 'back') {
      navigate(-1);
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
      <NavigationTopButton onClick={leftClickAction}>{LeftComponent}</NavigationTopButton>
      <span className="title">{title}</span>
      {onRightClick ? (
        typeof rightButton === 'string' ? (
          <TextButton variant="primary" onClick={rightClickAction}>
            {rightButton}
          </TextButton>
        ) : (
          <NavigationTopButton onClick={rightClickAction}>{RightComponent}</NavigationTopButton>
        )
      ) : (
        <div></div>
      )}
    </NavigationTopWrap>
  );
};

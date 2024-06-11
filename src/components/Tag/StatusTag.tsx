import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

export type StatusTagColorType = 'neutral' | 'green' | 'red' | 'blue' | 'yellow';

const Wrap = styled.div.attrs<{ $color?: StatusTagColorType; className?: string }>(
  ({ $color = 'primary', className = '' }) => {
    return {
      className: `color-${$color} ${className}`,
    };
  },
)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: ${AppRadii.M};
  font-weight: 500;
  padding: ${AppSpcing.XXXS} ${AppSpcing.XXS};
  ${AppTypo.CAPTION_SM}

  &.color-neutral {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  }

  &.color-green {
    background-color: ${AppSemanticColor.BG_SUCCESS_SUBTLE.hex};
    color: ${AppSemanticColor.TEXT_INTERACTIVE_PRIMARY.hex};
  }

  &.color-red {
    background-color: ${AppSemanticColor.BG_DANGER_SUBTLE.hex};
    color: ${AppSemanticColor.TEXT_DANGER.hex};
  }

  &.color-blue {
    background-color: ${AppSemanticColor.BG_INFO_SUBTLE.hex};
    color: ${AppSemanticColor.TEXT_INFO.hex};
  }

  &.color-yellow {
    background-color: ${AppSemanticColor.BG_WARNING.hex};
    color: ${AppSemanticColor.TEXT_PRIMARY.hex};
  }
`;

export const StatusTag = ({
  text,
  color = 'neutral',
  className,
}: {
  text: string;
  color?: StatusTagColorType;
  className?: string;
}) => {
  return (
    <Wrap $color={color} className={className}>
      <span>{text}</span>
    </Wrap>
  );
};

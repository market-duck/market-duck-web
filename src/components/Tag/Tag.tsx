import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

type TagColorType = 'primary' | 'secondary' | 'info' | 'error' | 'caution';

const Wrap = styled.div.attrs<{ $color?: TagColorType; $rightIcon: boolean }>(
  ({ $color = 'primary', $rightIcon = true }) => {
    return {
      className: `color-${$color} ${$rightIcon ? 'right-icon' : ''}`,
    };
  },
)`
  border-radius: ${AppRadii.M};
  font-weight: 500;
  ${AppTypo.CAPTION_MD}
  padding: ${AppSpcing.XXS} ${AppSpcing.XS};

  .color-primary {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY.hex};
    color: ${AppSemanticColor.TEXT_INVERSE.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY_HOVER.hex};
    }
  }

  .color-secondary {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_PRIMARY.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_HOVER.hex};
    }
  }

  .color-info {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_INFO.hex};
    color: ${AppSemanticColor.TEXT_INFO.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_INFO_HOVER.hex};
    }
  }

  .color-error {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_DANGER.hex};
    color: ${AppSemanticColor.TEXT_DANGER.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_DANGER_HOVER.hex};
    }
  }

  .color-caution {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_WARNING.hex};
    color: ${AppSemanticColor.TEXT_WARNING.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_WARNING_HOVER.hex};
    }
  }

  .right-icon {
    ${AppTypo.CAPTION_MD}
    padding: ${AppSpcing.XXXS} ${AppSpcing.XXS};
  }

  > span + span {
    margin-left: ${AppSpcing.XXS};
  }
`;

export const Tag = ({
  showCloseIcon = true,
  text,
  color = 'primary',
}: {
  showCloseIcon?: boolean;
  text: string;
  color?: TagColorType;
}) => {
  return (
    <Wrap $color={color} $rightIcon={showCloseIcon}>
      <span>{text}</span>
      {/* TODO:: svg로 변경하기 + onCloseAction 넣기 */}
      <span>X</span>
    </Wrap>
  );
};

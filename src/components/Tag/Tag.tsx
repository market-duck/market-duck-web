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
    background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY};
    color: ${AppSemanticColor.TEXT_INVERSE};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY_HOVER};
    }
  }

  .color-secondary {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY};
    color: ${AppSemanticColor.TEXT_PRIMARY};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_HOVER};
    }
  }

  .color-info {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_INFO};
    color: ${AppSemanticColor.TEXT_INFO};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_INFO_HOVER};
    }
  }

  .color-error {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_DANGER};
    color: ${AppSemanticColor.TEXT_DANGER};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_DANGER_HOVER};
    }
  }

  .color-caution {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_WARNING};
    color: ${AppSemanticColor.TEXT_WARNING};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_WARNING_HOVER};
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

import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';
import * as FillIcon from '@heroicons/react/16/solid';

export type TagColorType = 'primary' | 'secondary' | 'info' | 'error' | 'caution';

const Wrap = styled.div.attrs<{ $color?: TagColorType; $rightIcon: boolean; className?: string }>(
  ({ $color = 'primary', $rightIcon = true, className = '' }) => {
    return {
      className: `color-${$color} ${$rightIcon ? 'right-icon' : ''} ${className}`,
    };
  },
)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  border-radius: ${AppRadii.M};
  font-weight: 500;
  padding: ${AppSpcing.XXS} ${AppSpcing.XS};
  ${AppTypo.CAPTION_MD}

  &.color-primary {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY.hex};
    color: ${AppSemanticColor.TEXT_INVERSE.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_PRIMARY_HOVER.hex};
    }
  }

  &.color-secondary {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_PRIMARY.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_HOVER.hex};
    }
  }

  &.color-info {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_INFO.hex};
    color: ${AppSemanticColor.TEXT_INFO.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_INFO_HOVER.hex};
    }
  }

  &.color-error {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_DANGER.hex};
    color: ${AppSemanticColor.TEXT_DANGER.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_DANGER_HOVER.hex};
    }
  }

  &.color-caution {
    background-color: ${AppSemanticColor.BG_INTERACTIVE_WARNING.hex};
    color: ${AppSemanticColor.TEXT_WARNING.hex};
    &:hover {
      background-color: ${AppSemanticColor.BG_INTERACTIVE_WARNING_HOVER.hex};
    }
  }

  &.right-icon {
    ${AppTypo.CAPTION_MD}
    padding: ${AppSpcing.XXS} ${AppSpcing.XS};
  }

  > span + span {
    margin-left: ${AppSpcing.XXS};
  }
`;

const DeleteIcon = styled(FillIcon.XCircleIcon)`
  width: 1rem;
  height: 1rem;
`;

export const Tag = ({
  showDeleteIcon = false,
  text,
  color = 'primary',
  onDelete,
  className,
}: {
  showDeleteIcon?: boolean;
  text: string;
  color?: TagColorType;
  onDelete?: () => void;
  className?: string;
}) => {
  return (
    <Wrap $color={color} $rightIcon={showDeleteIcon} className={className}>
      <span>{text}</span>
      {showDeleteIcon && (
        <DeleteIcon
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) {
              onDelete();
            }
          }}
        />
      )}
    </Wrap>
  );
};

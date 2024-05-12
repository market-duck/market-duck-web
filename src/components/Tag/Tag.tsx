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
  ${AppTypo.CAPTION_SM}
  padding: ${AppSpcing.XXS} ${AppSpcing.XS};

  .color-primary {
  }

  .color-secondary {
  }

  .color-info {
  }

  .color-error {
  }

  .color-caution {
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
      <span>X</span>
    </Wrap>
  );
};

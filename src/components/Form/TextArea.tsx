import { useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const TextAreaWrap = styled.div`
  width: 100%;

  > .textarea-label {
    margin-bottom: ${AppSpacing.XXS};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    font-weight: 600;
    ${AppTypo.CAPTION_MD};
  }
`;

const TextAreaContent = styled.textarea.attrs<{ $focus: boolean; $error?: boolean; $disabled?: boolean }>(
  ({ $focus, $error, $disabled }) => {
    return {
      className: `${$focus ? 'is-focus' : ''} ${$error ? 'is-error' : ''} ${$disabled ? 'is-disabled' : ''}`,
    };
  },
)`
  width: 100%;
  height: 12.25rem;
  border-radius: ${AppRadii.M};
  padding: ${AppSpacing.XS} ${AppSpacing.S};
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  outline: none;

  &:hover {
    background-color: ${AppSemanticColor.BG_PRIMARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    box-shadow: 0 0 0 2px ${AppSemanticColor.BORDER_SECONDARY.hex} inset;
  }

  &.is-focus {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    box-shadow: 0 0 0 2px ${AppSemanticColor.BORDER_FOCUS_RING.hex} inset;
  }

  &.is-error {
    background-color: ${AppSemanticColor.BG_PRIMARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    box-shadow: 0 0 0 2px ${AppSemanticColor.BORDER_FOCUS_RING.hex} inset;
  }

  &.is-disabled {
    background-color: ${AppSemanticColor.BG_DISABLED.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    box-shadow: 0 0 0 2px ${AppSemanticColor.BORDER_FOCUS_RING.hex} inset;
  }
`;

const Caption = styled.p.attrs<{ $error?: boolean; $disabled?: boolean }>(({ $error, $disabled }) => {
  return {
    className: `${$error ? 'is-error' : ''} ${$disabled ? 'is-disabled' : ''}`,
  };
})`
  color: ${AppSemanticColor.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${AppTypo.CAPTION_MD};
`;

export const TextArea = ({
  value,
  changeHandler,
  placeholder,
  maxLength,

  isDisabled,
  isError,

  label,
  caption,

  className,
}: {
  value: string;
  placeholder?: string;
  maxLength?: number;
  changeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  caption?: string;
  className: string;
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onFocus = () => {
    setIsFocus(true);
  };
  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <TextAreaWrap>
      {label && <p className="textarea-label">{label}</p>}
      <TextAreaContent
        className={className}
        $focus={isFocus}
        $error={isError}
        $disabled={isDisabled}
        disabled={isDisabled}
        value={value}
        onChange={changeHandler}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {caption && <Caption>{caption}</Caption>}
    </TextAreaWrap>
  );
};

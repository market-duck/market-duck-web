import { useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const TextAreaWrap = styled.div`
  width: 100%;

  > .textarea-label {
    margin-bottom: ${AppSpcing.XXS};
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
  padding: ${AppSpcing.XS} ${AppSpcing.S};
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};

  &:hover {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-color: ${AppSemanticColor.BORDER_SECONDARY.hex};
  }

  &.is-focus {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-width: 2px;
    border-color: ${AppSemanticColor.BORDER_FOCUS_RING.hex};
  }

  &.is-error {
    background-color: ${AppSemanticColor.BG_DANGER_SUBTLE.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-width: 2px;
    border-color: ${AppSemanticColor.TEXT_DANGER.hex};
  }

  &.is-disabled {
    background-color: ${AppSemanticColor.BG_DISABLED.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    border-color: ${AppSemanticColor.BORDER_TERTIARY.hex};
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
}: {
  value: string;
  placeholder?: string;
  maxLength?: number;
  changeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  caption?: string;
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

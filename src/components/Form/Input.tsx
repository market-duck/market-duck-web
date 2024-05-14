import { ReactNode, useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const InputWrap = styled.div`
  width: 100%;

  > .input-label {
    margin-bottom: ${AppSpcing.XXS};
    color: ${AppSemanticColor.TEXT_SECONDARY};
    font-weight: 600;
    ${AppTypo.CAPTION_MD};
  }
`;

const InputContent = styled.div.attrs<{ $focus: boolean; $error?: boolean; $disabled?: boolean }>(
  ({ $focus, $error, $disabled }) => {
    return {
      className: `${$focus ? 'is-focus' : ''} ${$error ? 'is-error' : ''} ${$disabled ? 'is-disabled' : ''}`,
    };
  },
)`
  display: flex;
  width: 100%;
  height: 2rem;
  border-radius: ${AppRadii.M};
  padding: ${AppSpcing.XXS};
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY}; //TODO:: border tertiary
  background-color: ${AppSemanticColor.BG_PRIMARY};
  color: ${AppSemanticColor.TEXT_TERTIARY};
  font-weight: 500;
  ${AppTypo.BODY_MD};

  > input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    flex: auto;
    min-width: 0;
    background-color: transparent;
  }

  &:hover {
    background-color: ${AppSemanticColor.BG_SECONDARY};
    color: ${AppSemanticColor.TEXT_SECONDARY};
    border-color: ${AppSemanticColor.BORDER_SECONDARY};
  }

  &.is-focus {
    background-color: ${AppSemanticColor.BG_SECONDARY};
    color: ${AppSemanticColor.TEXT_SECONDARY};
    border-color: ${AppSemanticColor.BORDER_FOCUS_RING};
  }

  &.is-error {
    background-color: ${AppSemanticColor.BG_DANGER_SUBTLE};
    color: ${AppSemanticColor.TEXT_SECONDARY};
    border-color: ${AppSemanticColor.TEXT_DANGER};
  }

  &.is-disabled {
    background-color: ${AppSemanticColor.BG_DISABLED};
    color: ${AppSemanticColor.TEXT_SECONDARY};
    border-color: ${AppSemanticColor.BORDER_TERTIARY};
  }
`;

const Caption = styled.p.attrs<{ $error?: boolean; $disabled?: boolean }>(({ $error, $disabled }) => {
  return {
    className: `${$error ? 'is-error' : ''} ${$disabled ? 'is-disabled' : ''}`,
  };
})`
  color: ${AppSemanticColor.TEXT_TERTIARY};
  font-weight: 500;
  ${AppTypo.CAPTION_MD};
`;

export const Input = ({
  value,
  maxLength,
  changeHandler,
  placeholder,

  isDisabled,
  isError,

  label,
  prefix = null,
  suffix = null,
  caption,
}: {
  value: string;
  placeholder?: string;
  maxLength?: number;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isError?: boolean;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
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
    <InputWrap>
      {label && <p className="input-label">{label}</p>}
      <InputContent $focus={isFocus} $error={isError} $disabled={isDisabled}>
        {prefix}
        <input
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value}
          onChange={changeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {suffix}
      </InputContent>
      {caption && (
        <Caption $disabled={isDisabled} $error={isError}>
          {caption}
        </Caption>
      )}
    </InputWrap>
  );
};

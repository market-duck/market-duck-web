import { ReactNode, useState } from 'react';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

//TODO:: Color Token 완료되면 background-color, color, shadow 등 추가하기

const InputWrap = styled.div.attrs<{ $focus: boolean; $error?: boolean; $disabled?: boolean }>(
  ({ $focus, $error, $disabled }) => {
    return {
      className: `${$focus ? 'is-focus' : ''} ${$error ? 'is-error' : ''} ${$disabled ? 'is-diabeld' : ''}`,
    };
  },
)`
  width: 100%;
  border-radius: ${AppRadii.M};
  padding: ${AppSpcing.XXS};
  border: 1px solid gray; //TODO:: border tertiary

  &:hover {
  }

  &.is-focus {
  }

  &.is-error {
  }

  &.is-disabled {
  }
`;

const InputContent = styled.div`
  width: 100%;
`;

export const Input = ({
  value,
  changeHandler,

  isDisabled,
  isError,

  label,
  prefix = null,
  suffix = null,
  caption,
}: {
  value: string;
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
    <InputWrap $focus={isFocus} $error={isError} $disabled={isDisabled}>
      {label && <p>{label}</p>}
      <InputContent>
        {prefix}
        <input disabled={isDisabled} value={value} onChange={changeHandler} onFocus={onFocus} onBlur={onBlur} />
        {suffix}
      </InputContent>
      {caption && <p>{caption}</p>}
    </InputWrap>
  );
};

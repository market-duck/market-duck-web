import { ReactNode, useState } from 'react';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import styled from 'styled-components';

const TextAreaWrap = styled.div``;

const TextAreaContent = styled.textarea.attrs<{ $focus: boolean; $error?: boolean; $disabled?: boolean }>(
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

export const TextArea = ({
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
  changeHandler: React.ChangeEventHandler<HTMLTextAreaElement>;
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
    <TextAreaWrap>
      {label && <p>{label}</p>}
      <TextAreaContent
        $focus={isFocus}
        $error={isError}
        $disabled={isDisabled}
        value={value}
        onChange={changeHandler}
      />
      {caption && <p>{caption}</p>}
    </TextAreaWrap>
  );
};

import { Thumbnail } from '@market-duck/components/Image/Thumbnail';
import { ImageItem } from '@market-duck/types/image';
import { ChangeEventHandler, InputHTMLAttributes, ReactNode, useRef, useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled from 'styled-components';

const InputWrap = styled.div`
  width: 100%;

  > .inputLabel {
    margin-bottom: ${AppSpcing.XXS};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
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
  gap: ${AppSpcing.XXS};
  width: 100%;
  border-radius: ${AppRadii.M};
  padding: ${AppSpcing.XS} ${AppSpcing.S};
  border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
  background-color: ${AppSemanticColor.BG_PRIMARY.hex};
  color: ${AppSemanticColor.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${AppTypo.BODY_MD};

  > input {
    width: 100%;
    height: 24px;
    border: none;
    outline: none;
    flex: auto;
    min-width: 0;
    background-color: transparent;
  }

  &:hover {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    box-shadow: 0 0 0 2px ${AppSemanticColor.BORDER_SECONDARY.hex} inset;
  }

  &.is-focus {
    background-color: ${AppSemanticColor.BG_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    box-shadow: 0 0 0 2px ${AppSemanticColor.BORDER_FOCUS_RING.hex} inset;
  }

  &.is-error {
    background-color: ${AppSemanticColor.BG_DANGER_SUBTLE.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    box-shadow: 0 0 0 2px ${AppSemanticColor.BORDER_FOCUS_RING.hex} inset;
  }

  &.is-disabled {
    background-color: ${AppSemanticColor.BG_DISABLED.hex};
    color: ${AppSemanticColor.TEXT_SECONDARY.hex};
    box-shadow: 0 0 0 2px ${AppSemanticColor.BORDER_FOCUS_RING.hex} inset;
  }
`;

const Caption = styled.p.attrs<{ $error?: boolean; $disabled?: boolean; $info?: boolean }>(
  ({ $error, $disabled, $info }) => {
    return {
      className: `${$error ? 'is-error' : ''} ${$disabled ? 'is-disabled' : ''} ${$info ? 'is-info' : ''}`,
    };
  },
)`
  color: ${AppSemanticColor.TEXT_TERTIARY.hex};
  font-weight: 500;
  ${AppTypo.CAPTION_MD};

  &.is-info {
    color: ${AppSemanticColor.TEXT_INFO.hex};
  }
`;

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'prefix' | 'suffix' | 'value' | 'type' | 'style' | 'maxLength'
> & {
  value: string;
  placeholder?: string;
  maxLength?: number;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  isError?: boolean;
  isInfo?: boolean;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  caption?: string;
  type?: 'password' | 'search' | 'text';
};

/**
 * @requires value
 * @requires changeHandler
 */

export const Input = ({
  value,
  type,
  maxLength,
  changeHandler,
  placeholder,

  isDisabled,
  isError,
  isInfo,

  label,
  prefix = null,
  suffix = null,
  caption,
  ...props
}: InputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onFocus = () => {
    setIsFocus(true);
  };
  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <InputWrap>
      {label && <p className="inputLabel">{label}</p>}
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
          type={type}
          {...props}
        />
        {suffix}
      </InputContent>
      {caption && (
        <Caption className="inputCaption" $disabled={isDisabled} $error={isError} $info={isInfo}>
          {caption}
        </Caption>
      )}
    </InputWrap>
  );
};

const InputWithImageContent = styled(InputContent)`
  flex-direction: column;
  > textarea {
    width: 100%;
    overflow: hidden;
    border: none;
    outline: none;
    flex: auto;
    min-width: 0;
    background-color: transparent;
    resize: none;
  }
  > .imagesContainer {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    gap: ${AppSpcing.XXS};
  }
`;

type InputWithImageProps = Omit<
  InputHTMLAttributes<HTMLTextAreaElement>,
  'prefix' | 'suffix' | 'value' | 'type' | 'style' | 'maxLength'
> & {
  value: string;
  placeholder?: string;
  changeHandler: ChangeEventHandler<HTMLTextAreaElement>;
  images: ImageItem[];
  deleteHandler: (idx: number) => void;
  isDisabled?: boolean;
};

export const InputWithImage = ({
  value,
  changeHandler,
  placeholder,
  images,
  deleteHandler,
  isDisabled,
  ...props
}: InputWithImageProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const onFocus = () => {
    setIsFocus(true);
  };
  const onBlur = () => {
    setIsFocus(false);
  };

  const autoHeight = () => {
    const textarea = ref?.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const containerClickHandler = () => {
    const textarea = ref?.current;
    if (!textarea) return;
    textarea.focus();
  };

  return (
    <InputWrap>
      <InputWithImageContent $focus={isFocus} $error={false} $disabled={isDisabled} onClick={containerClickHandler}>
        {!!images.length && (
          <ul className="imagesContainer">
            {images.map((image, idx) => (
              <li
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Thumbnail imgSrc={image.src} size="lg" deleteHandler={() => deleteHandler(idx)} />
              </li>
            ))}
          </ul>
        )}
        <textarea
          ref={ref}
          placeholder={placeholder}
          disabled={isDisabled}
          rows={1}
          value={value}
          onInput={autoHeight}
          onChange={changeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
      </InputWithImageContent>
    </InputWrap>
  );
};

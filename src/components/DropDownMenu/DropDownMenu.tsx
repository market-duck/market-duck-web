import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { ButtonClickHandler } from '@market-duck/types/handler';
import { Dispatch, HTMLAttributes, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppElevation } from 'src/styles/tokens/AppElevation';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpcing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled, { css } from 'styled-components';

const Wrap = styled.div<{ $isDotMenu?: boolean; $disabled: boolean | undefined }>`
  display: inline-flex;
  position: relative;
  ${AppTypo.BODY_SM}
  font-weight: 500;
  .itemContainer {
    display: flex;
    flex-direction: column;
    gap: ${AppSpcing.XS};
    position: absolute;
    z-index: 1;
    ${({ $isDotMenu }) => ($isDotMenu ? `right: 0` : `left: 0`)};
    top: calc(32px + ${AppSpcing.XS});
    min-width: 96px;
    padding: ${AppSpcing.XS} ${AppSpcing.XXS};
    ${AppElevation.SHADOW4}
    border-radius: ${AppRadii.M};
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY.hex};
    color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY_PRESS.hex};
    animation: fadeWithSlideDown 0.2s ease-out forwards;
  }
  .selectedItem {
    min-width: ${({ $isDotMenu }) => ($isDotMenu ? 'auto' : '96px')};
    display: flex;
    justify-content: space-between;
    gap: ${AppSpcing.XXS};
    padding: ${({ $isDotMenu }) => ($isDotMenu ? `${AppSpcing.XXS}` : `${AppSpcing.XS} ${AppSpcing.XXS}`)};
    background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY.hex};
    border-radius: ${AppRadii.M};
    font-weight: 500;
    color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY.hex};
    ${({ $disabled }) =>
      $disabled &&
      css`
        cursor: default;
      `};
    &:hover {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY_HOVER.hex};
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_HOVER.hex};
    }
    &:active {
      color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY_PRESS.hex};
      background-color: ${AppSemanticColor.BG_INTERACTIVE_SECONDARY_PRESS.hex};
    }
    &:disabled {
      color: ${AppSemanticColor.TEXT_DISABLED.hex};
      background-color: ${AppSemanticColor.BG_DISABLED.hex};
    }
  }

  @keyframes fadeWithSlideDown {
    0% {
      transform: translateY(-5%);
      opacity: 0;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
    }
  }
`;

interface MenuItemType {
  id: string;
  name: string;
  handler: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
}

interface DropDownMenuProps extends HTMLAttributes<HTMLUListElement> {
  items: MenuItemType[];
  isDotMenu?: boolean;
  selectedIndex?: number;
  setSelectedIndex?: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
}

export const DropDownMenu = ({ items, selectedIndex, setSelectedIndex, isDotMenu, disabled }: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const reorderedItems =
    !isDotMenu && selectedIndex !== undefined
      ? [items[selectedIndex], ...items.filter((_, idx) => idx !== selectedIndex)]
      : items;

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDownRef, setIsOpen]);

  const itemHandler = (e: MouseEvent<HTMLButtonElement>, idx: number) => {
    if (!isDotMenu && setSelectedIndex) {
      setSelectedIndex(idx);
    }
    items[idx].handler(e, idx);
    setIsOpen((prev) => !prev);
  };

  const openHandler: ButtonClickHandler = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <Wrap ref={dropDownRef} $isDotMenu={isDotMenu} $disabled={disabled}>
      <button className="selectedItem" onClick={openHandler} disabled={disabled}>
        {isDotMenu ? (
          <EllipsisHorizontalIcon width={16} />
        ) : (
          <>
            <span>{items[selectedIndex ?? 0].name}</span>
            {!disabled && <ChevronDownIcon width={16} />}
          </>
        )}
      </button>
      {isOpen && (
        <ul className="itemContainer">
          {reorderedItems.map((item) => (
            <li key={item.id}>
              <button id={item.id} onClick={(e) => itemHandler(e, items.indexOf(item))}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Wrap>
  );
};

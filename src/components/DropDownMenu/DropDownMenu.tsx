import { ChevronDownIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { ButtonClickHandler } from '@market-duck/types/handler';
import { Dispatch, HTMLAttributes, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppElevation } from 'src/styles/tokens/AppElevation';
import { AppRadii } from 'src/styles/tokens/AppRadii';
import { AppSpacing } from 'src/styles/tokens/AppSpacing';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import styled, { css } from 'styled-components';

const Wrap = styled.div<{ $isDotMenu?: boolean; $disabled: boolean | undefined; $isTransparent: boolean | undefined }>`
  display: inline-flex;
  position: relative;
  ${AppTypo.BODY_SM}
  font-weight: 500;

  .selectedItem {
    display: flex;
    justify-content: space-between;
    gap: ${AppSpacing.XXS};
    padding: ${({ $isDotMenu }) => ($isDotMenu ? `${AppSpacing.XXS}` : `${AppSpacing.XXS} ${AppSpacing.XS}`)};
    background-color: ${({ $isTransparent }) => ($isTransparent ? `transparent` : AppSemanticColor.BG_PRIMARY.hex)};
    border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
    border-radius: ${AppRadii.M};
    font-size: ${AppTypo.BODY_SM};
    font-weight: 500;
    color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY.hex};
    ${({ $disabled }) =>
      $disabled &&
      css`
        cursor: default;
      `};
  }

  .itemContainer {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    /* ${({ $isDotMenu }) => ($isDotMenu ? `right: 0` : `left: 0`)}; */
    top: calc(32px + ${AppSpacing.XS});
    right: 0;
    min-width: 96px;
    padding: ${AppSpacing.XXS} 0;
    ${AppElevation.SHADOW4}
    border-radius: ${AppRadii.M};
    background-color: ${AppSemanticColor.BG_PRIMARY.hex};
    border: 1px solid ${AppSemanticColor.BORDER_TERTIARY.hex};
    color: ${AppSemanticColor.TEXT_INTERACTIVE_SECONDARY.hex};
    animation: fadeWithSlideDown 0.2s ease-out forwards;
    .item {
      width: 100%;
      font-size: ${AppTypo.BODY_SM};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${AppSpacing.XXS} ${AppSpacing.XS};
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
  isTransparent?: boolean;
}

export const DropDownMenu = ({
  items,
  selectedIndex,
  setSelectedIndex,
  isDotMenu,
  disabled,
  isTransparent,
}: DropDownMenuProps) => {
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
    if (!isDotMenu && setSelectedIndex) setSelectedIndex(idx);
    items[idx].handler(e, idx);
    setIsOpen((prev) => !prev);
  };

  const openHandler: ButtonClickHandler = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <Wrap ref={dropDownRef} $isDotMenu={isDotMenu} $disabled={disabled} $isTransparent={isTransparent}>
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
              <button className="item" id={item.id} onClick={(e) => itemHandler(e, items.indexOf(item))}>
                {item.name} {selectedIndex === items.indexOf(item) && <CheckIcon width={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Wrap>
  );
};

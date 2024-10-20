import { dialogAtom } from '@market-duck/atoms/dialog.atom';
import { buttonVariantType } from '@market-duck/components/Button/Button';
import { DialogType } from '@market-duck/types/dialog';
import { ButtonClickHandler } from '@market-duck/types/handler';
import { ReactNode } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';

export const useDialog = () => {
  const setDialogs = useSetRecoilState(dialogAtom);
  const reset = useResetRecoilState(dialogAtom);

  const alert = ({ title, desc }: { title: string; desc: string }) => {
    const id = v4();
    setDialogs((prev) => [...prev, { id, type: DialogType.ALERT, title, desc }]);
    return id;
  };

  const confirm = ({
    title,
    desc,
    positiveBtnText,
    positiveBtnVariant,
  }: {
    title: string;
    desc: string;
    positiveBtnText?: string;
    positiveBtnVariant?: buttonVariantType;
  }): Promise<boolean> => {
    const id = v4();
    const promise = new Promise<boolean>((resolve) => {
      const confirm: ButtonClickHandler = () => {
        resolve(true);
        close(id);
      };

      setDialogs((prev) => [
        ...prev,
        {
          id,
          type: DialogType.CONFIRM,
          title,
          desc,
          positiveBtnText,
          positiveBtnVariant,
          confirm,
        },
      ]);
    });

    return promise;
  };

  const bottomSheet = ({
    title,
    desc,
    buttonTitle,
    hasButton,
    children,
  }: {
    title: string;
    desc: string;
    buttonTitle?: string;
    hasButton?: boolean;
    children?: ReactNode;
  }) => {
    const id = v4();
    setDialogs((prev) => [
      ...prev,
      { id, type: DialogType.BOTTOM_SHEET, title, desc, buttonTitle, hasButton, children },
    ]);
    return id;
  };

  const close = (id?: string) => {
    if (id) setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
    else setDialogs((prev) => prev.slice(0, -1));
  };

  return { confirm, alert, bottomSheet, close, closeAll: reset };
};

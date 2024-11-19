import { dialogAtom } from '@market-duck/atoms/dialog.atom';
import { buttonVariantType } from '@market-duck/components/Button/Button';
import { DialogType } from '@market-duck/types/dialog';
import { ButtonClickHandler } from '@market-duck/types/handler';
import { ReactNode } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { v4 } from 'uuid';

/**
 * ### useDialog
 * - 전역 다이얼로그를 관리하는 커스텀 훅입니다.
 * - 알림, 확인, 바텀시트 모달을 생성하고 제어하는 함수들을 제공합니다.
 * @author nine
 */
export const useDialog = () => {
  const setDialogs = useSetRecoilState(dialogAtom);
  const reset = useResetRecoilState(dialogAtom);

  /**
   * ### alert
   * - 알림(Alert) 다이얼로그를 엽니다.
  
   * @returns {string} - 생성된 알림 다이얼로그의 고유 ID를 반환합니다.
   * @example 
   * ```tsx
   *const id = alert({ title: "알림"; desc: "알려드렸습니다~" })
   * ```
   */
  const alert = ({ title, desc }: { title: string; desc: string }): string => {
    const id = v4();
    setDialogs((prev) => [...prev, { id, type: DialogType.ALERT, title, desc }]);
    return id;
  };

  /**
   * ### confirm
   * - 확인(Confirm) 다이얼로그를 열고, 사용자의 선택에 따라 결과를 반환하는 Promise를 반환합니다.
   *
   * @returns {Promise<boolean>} - 사용자가 확인 버튼을 클릭하면 true, 취소 버튼을 클릭하면 false를 반환하는 Promise를 반환합니다.
   * @example
   * ```tsx
   *const result = await confirm({ title: "확인"; desc: "확인시켜드렸습니다~" })
   *if(result) console.log("확인하셨습니다~")
   * ```
   */
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

  /**
   * ### bottomSheet
   *-  바텀시트(BottomSheet) 다이얼로그를 엽니다.
   * @returns {string} - 생성된 바텀시트 다이얼로그의 고유 ID를 반환합니다.
   * @example
   * ```tsx
   *const id = bottomSheet({ title: "알림"; desc: "알려드렸습니다~" })
   * ```
   */
  const bottomSheet = ({
    title,
    desc,
    buttonTitle,
    hasButton,
    customContent,
  }: {
    title?: string;
    desc?: string;
    buttonTitle?: string;
    hasButton?: boolean;
    customContent?: ReactNode;
  }) => {
    const id = v4();
    setDialogs((prev) => [
      ...prev,
      { id, type: DialogType.BOTTOM_SHEET, title, desc, buttonTitle, hasButton, customContent },
    ]);
    return id;
  };

  /**
   * ### close
   * - 특정 ID에 해당하는 다이얼로그를 닫습니다. ID를 전달하지 않으면 가장 최근의 다이얼로그를 닫습니다.
   *
   * @param {string} id - 닫을 다이얼로그의 ID입니다. 생략하면 가장 최근의 다이얼로그가 닫힙니다.
   */
  const close = (id?: string) => {
    if (id) setDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
    else setDialogs((prev) => prev.slice(0, -1));
  };

  return { confirm, alert, bottomSheet, close, closeAll: reset };
};

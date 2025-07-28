import { dialogAtom } from '@market-duck/atoms/dialog.atom';
import { BottomSheet } from '@market-duck/components/Dialog/BottomSheet';
import { Dialog } from '@market-duck/components/Dialog/Dialog';
import { DialogType } from '@market-duck/types/dialog';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';

export const GlobalDialog = () => {
  const dialogs = useRecoilValue(dialogAtom);
  const root = document.getElementById('dialogRoot');

  if (!root) return;
  else
    return createPortal(
      <>
        {dialogs.map((dialog) => {
          switch (dialog.type) {
            case DialogType.ALERT:
              return <Dialog id={dialog.id} key={dialog.id} title={dialog.title} desc={dialog.desc} />;
            case DialogType.CONFIRM:
              return (
                <Dialog
                  id={dialog.id}
                  key={dialog.id}
                  title={dialog.title}
                  desc={dialog.desc}
                  confirmBtnVariant={dialog.positiveBtnVariant}
                  customConfirmBtnText={dialog.positiveBtnText}
                  confirm={dialog.confirm}
                  cancel={dialog.cancel}
                />
              );
            case DialogType.BOTTOM_SHEET:
              return (
                <BottomSheet
                  id={dialog.id}
                  key={dialog.id}
                  title={dialog.title}
                  desc={dialog.desc}
                  buttonList={dialog.buttonList}
                  customContent={dialog.customContent}
                  preventBackDropClickClose={dialog.preventBackDropClickClose}
                />
              );
            case DialogType.MODAL:
              return (
                <Dialog
                  id={dialog.id}
                  key={dialog.id}
                  slotComponent={dialog.slotComponent}
                  buttonList={dialog.buttonList}
                />
              );
            default:
              return;
          }
        })}
      </>,
      root,
    );
};

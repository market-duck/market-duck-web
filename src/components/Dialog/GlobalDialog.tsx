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
                />
              );
            case DialogType.BOTTOM_SHEET:
              return (
                <BottomSheet
                  id={dialog.id}
                  key={dialog.id}
                  title={dialog.title}
                  desc={dialog.desc}
                  buttonTitle={dialog.buttonTitle}
                  hasButton={dialog.hasButton}
                  customContent={dialog.customContent}
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

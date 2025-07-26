import { ButtonVariantType } from '@market-duck/components/Button/Button';
import { ButtonListItem } from '@market-duck/components/Dialog/BottomSheet';
import { ReactNode } from 'react';

export enum DialogType {
  CONFIRM = 'CONFIRM',
  ALERT = 'ALERT',
  BOTTOM_SHEET = 'BOTTOM_SHEET',
}

interface BaseDialog {
  id: string;
  title: string;
  desc: string;
}

interface BottomSheet extends Pick<BaseDialog, 'id'> {
  type: DialogType.BOTTOM_SHEET;
  title?: string;
  desc?: string;
  buttonList: ButtonListItem[];
  preventBackDropClickClose?: boolean;
  customContent?: ReactNode;
}

interface AlertDialog extends BaseDialog {
  type: DialogType.ALERT;
  // alertType: 'ALERT' | 'WARNING';
}

interface ConfirmDialog extends BaseDialog {
  type: DialogType.CONFIRM;
  positiveBtnText?: string;
  positiveBtnVariant?: ButtonVariantType;
  confirm: () => void;
  cancel: () => void;
}

export type Dialog = AlertDialog | ConfirmDialog | BottomSheet;

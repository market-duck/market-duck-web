import { ButtonVariantType } from '@market-duck/components/Button/Button';
import { ButtonListItemType } from '@market-duck/components/Dialog/Dialog';
import { ReactNode } from 'react';

export enum DialogType {
  CONFIRM = 'CONFIRM',
  ALERT = 'ALERT',
  MODAL = 'MODAL',
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
  buttonList: ButtonListItemType[];
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

interface Modal extends Pick<BaseDialog, 'id'> {
  type: DialogType.MODAL;
  buttonList: ButtonListItemType[];
  preventBackDropClickClose?: boolean;
  slotComponent: ReactNode;
}

export type Dialog = AlertDialog | ConfirmDialog | BottomSheet | Modal;

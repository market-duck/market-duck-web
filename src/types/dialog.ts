import { buttonVariantType } from '@market-duck/components/Button/Button';
import { ButtonClickHandler } from '@market-duck/types/handler';
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
  buttonTitle?: string;
  hasButton?: boolean;
  customContent?: ReactNode;
}

interface AlertDialog extends BaseDialog {
  type: DialogType.ALERT;
  // alertType: 'ALERT' | 'WARNING';
}

interface ConfirmDialog extends BaseDialog {
  type: DialogType.CONFIRM;
  positiveBtnText?: string;
  positiveBtnVariant?: buttonVariantType;
  confirm: ButtonClickHandler;
}

export type Dialog = AlertDialog | ConfirmDialog | BottomSheet;

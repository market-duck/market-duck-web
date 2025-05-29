import { ToastContainer } from 'react-toastify';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppElevation } from 'src/styles/tokens/AppElevation';
import styled from 'styled-components';
import { Row } from '../Flex/Flex';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Typo } from '../Typo/Typo';

/**
 * Toast type (추후 추가 가능)
 */
export const ToastType = {
  Default: 'default',
};

type ToastType = typeof ToastType;
type ToastTypeValue = ToastType[keyof typeof ToastType];

export interface ToastProps {
  title: string;
  desc: string;
  type: ToastTypeValue;
}

export const CustomToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: ${AppSemanticColor.BG_PRIMARY.hex};
    border-radius: 8px;
    ${AppElevation.SHADOW2};
    animation-duration: 1s;
  }

  --toastify-toast-padding: 16px;
`;

const ToastMsgWrap = styled(Row)`
  width: 100%;

  .closeIcon {
    cursor: pointer;
  }
`;

export const ToastMsg = ({ closeToast, title, desc, type }: ToastProps & { closeToast: () => void }) => {
  //TODO:: 추후 toast type에 따른 변경 있을 시 type에 따른 디자인 변경 등 가능

  return (
    <ToastMsgWrap justify="between" alignItems="start">
      <div>
        <Typo tag="p" type="BODY_LG">
          {title}
        </Typo>
        <Typo tag="p" type="BODY_SM">
          {desc}
        </Typo>
      </div>
      <XMarkIcon className="closeIcon" width={24} fill={AppSemanticColor.ICON_PRIMARY.hex} onClick={closeToast} />
    </ToastMsgWrap>
  );
};

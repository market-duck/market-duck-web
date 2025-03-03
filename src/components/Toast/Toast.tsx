import { toast, ToastContainer } from 'react-toastify';
import { AppSemanticColor } from 'src/styles/tokens/AppColor';
import { AppElevation } from 'src/styles/tokens/AppElevation';
import styled from 'styled-components';
import { Row } from '../Flex/Flex';
import { AppTypo } from 'src/styles/tokens/AppTypo';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Typo } from '../Typo/Typo';

/**
 * @usage 원하는 곳에서 Toast 컴포넌트 호출 및 사용
 *   const toast = () => Toast({ title: '토스트 테스트', desc: 'desc', type: ToastType.Default });
 */

/**
 * Toast type (추후 추가 가능)
 */
export const ToastType = {
  Default: 'default',
};

type ToastType = typeof ToastType;
type ToastTypeValue = ToastType[keyof typeof ToastType];

interface ToastProps {
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

const Msg = ({ closeToast, title, desc }: Omit<ToastProps, 'type'> & { closeToast: () => void }) => {
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

export const Toast = ({ title, desc, type }: ToastProps) => {
  switch (type) {
    case ToastType.Default:
      return toast(({ closeToast }) => <Msg closeToast={closeToast} title={title} desc={desc} />, {
        closeButton: false,
      });
  }
};

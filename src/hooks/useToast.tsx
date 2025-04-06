import { ToastProps, ToastType, ToastMsg } from '@market-duck/components/Toast/Toast';
import { toast } from 'react-toastify';

/**
 * @usage 원하는 곳에서 useToast 훅 호출 및 사용
 *   const toast = () => useToast({ title: '토스트 테스트', desc: 'desc', type: ToastType.Default });
 */

export const useToast = ({ title, desc, type }: ToastProps) => {
  switch (type) {
    case ToastType.Default:
      return toast(({ closeToast }) => <ToastMsg closeToast={closeToast} title={title} desc={desc} />, {
        closeButton: false,
      });
  }
};

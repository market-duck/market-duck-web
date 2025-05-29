import { ToastProps, ToastMsg } from '@market-duck/components/Toast/Toast';
import { toast } from 'react-toastify';

/**
 * @usage 원하는 곳에서 useToast 훅 호출 및 사용
 *   const toastOpen = useToast({ title: '토스트 테스트', desc: 'desc', type: ToastType.Default });
 * => toastOpen({title:'토스트 제목', desc:'토스트 내용', type: ToastType.Default})
 */

export const useToast = () => {
  return ({ title, desc, type }: ToastProps) =>
    toast(({ closeToast }) => <ToastMsg type={type} closeToast={closeToast} title={title} desc={desc} />, {
      closeButton: false,
    });
};

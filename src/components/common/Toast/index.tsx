import { useEffect } from 'react';

import { ReactComponent as CloseButton } from '@assets/cancel-x.svg';
import { ReactComponent as SuccessSign } from '@assets/common/toast/check-circle.svg';
import { useToastActions, useToastState } from '@libs/store/toast/toast';

import {
  ToastAutoCloseProcessBar,
  ToastBody,
  ToastCloseButton,
  ToastMessageBox,
  ToastWrapper,
} from './Toast.styles';

const Toast = () => {
  const { isOpen } = useToastState();
  const { closeToast } = useToastActions();

  useEffect(() => {
    if (!isOpen) return undefined;
    const autoCloseToast = setTimeout(() => closeToast(), 3000);
    return () => clearTimeout(autoCloseToast);
  }, [isOpen]);

  return (
    <ToastWrapper $isopen={isOpen}>
      <ToastBody>
        <ToastMessageBox>
          <SuccessSign width={24} height={24} />
          <span>성공적으로 완료되었습니다!</span>
        </ToastMessageBox>
        <ToastCloseButton onClick={closeToast}>
          <CloseButton width={24} height={24} />
        </ToastCloseButton>
      </ToastBody>
      <ToastAutoCloseProcessBar></ToastAutoCloseProcessBar>
    </ToastWrapper>
  );
};

export default Toast;

import { useEffect } from 'react';

import { ReactComponent as CloseButton } from '@assets/cancel-x.svg';
import { ReactComponent as ErrorSign } from '@assets/common/toast/alert-triangle.svg';
import { ReactComponent as SuccessSign } from '@assets/common/toast/check-circle.svg';
import { useToastActions, useToastState } from '@libs/store/toast/toast';

import {
  ToastAutoCloseProcessBar,
  ToastBody,
  ToastCloseButton,
  ToastMessageBox,
  ToastWrapper,
} from './Toast.styles';

const ToastSign = () => {
  const { messageType } = useToastState();
  if (messageType === 'success') return <SuccessSign width={24} height={24} />;
  return <ErrorSign width={24} height={24} />;
};

const Toast = () => {
  const { isOpen, message, messageType } = useToastState();
  const { clearToastMessage } = useToastActions();

  useEffect(() => {
    if (!isOpen) return undefined;
    const autoCloseToast = setTimeout(() => clearToastMessage(), 3000);
    return () => clearTimeout(autoCloseToast);
  }, [isOpen]);

  return (
    <ToastWrapper $isopen={isOpen}>
      <ToastBody>
        <ToastMessageBox>
          <ToastSign />
          <span>{message}</span>
        </ToastMessageBox>
        <ToastCloseButton onClick={clearToastMessage}>
          <CloseButton width={24} height={24} />
        </ToastCloseButton>
      </ToastBody>
      <ToastAutoCloseProcessBar
        $messagetype={messageType}
      ></ToastAutoCloseProcessBar>
    </ToastWrapper>
  );
};

export default Toast;

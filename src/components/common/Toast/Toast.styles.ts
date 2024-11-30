import { keyframes, styled } from 'styled-components';
import { vars } from 'token';

const ToastTurnOnAnimation = keyframes`
  0% {
    opacity: 0.2;
  }
  10% {
    opacity: 1;
  }
`;

export const ToastWrapper = styled.aside<{ $isopen: boolean }>`
  width: 346px;
  height: 53px;
  background-color: ${vars.sementic.color.white};
  border-radius: 8px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);
  display: ${(props) => (props.$isopen ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  position: fixed;
  right: 150px;
  top: 50px;
  z-index: 50;
  animation: ${ToastTurnOnAnimation} 3s linear alternate;
`;

export const ToastBody = styled.div`
  width: 346px;
  height: 47px;
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ToastMessageBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  span {
    ${vars.sementic.typography.paragraph};
  }
`;

export const ToastCloseButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ToastFillAutoCloseProcessBarAnimation = keyframes`
  0% {
    width: 2px;
  }
  100% {
    width: 100%;
  }
`;

export const ToastAutoCloseProcessBar = styled.div`
  width: 100%;
  height: 7px;
  background-color: ${vars.sementic.color.green};
  border-radius: 0 0 4px 4px;
  animation: ${ToastFillAutoCloseProcessBarAnimation} 3s linear;
`;

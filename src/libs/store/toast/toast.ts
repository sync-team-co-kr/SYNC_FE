import { create } from 'zustand';

type toastMessageType = 'success' | 'error';

interface ToastState {
  isOpen: boolean;
  message: string;
  messageType: toastMessageType;
}

interface ToastActions {
  actions: {
    setToastMessage: (message: string, messageType: toastMessageType) => void;
    clearToastMessage: () => void;
  };
}

const initialState: ToastState = {
  isOpen: false,
  message: '',
  messageType: 'success',
};

const useToastStore = create<ToastState & ToastActions>((set) => ({
  ...initialState,
  actions: {
    setToastMessage: (message, messageType) =>
      set(() => ({
        isOpen: true,
        message,
        messageType,
      })),
    clearToastMessage: () =>
      set(() => ({
        isOpen: false,
        message: '',
        messageType: 'success',
      })),
  },
}));

export const useToastState = () => useToastStore((state) => state);

export const useToastActions = () => useToastStore().actions;

export default useToastStore;

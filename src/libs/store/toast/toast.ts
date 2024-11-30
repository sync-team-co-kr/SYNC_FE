import { create } from 'zustand';

interface ToastState {
  isOpen: boolean;
}

interface ToastActions {
  actions: {
    openToast: () => void;
    closeToast: () => void;
  };
}

const initialState: ToastState = {
  isOpen: false,
};

const useToastStore = create<ToastState & ToastActions>((set) => ({
  ...initialState,
  actions: {
    openToast: () => set(() => ({ isOpen: true })),
    closeToast: () => set(() => ({ isOpen: false })),
  },
}));

export const useToastState = () => useToastStore((state) => state);

export const useToastActions = () => useToastStore().actions;

export default useToastStore;

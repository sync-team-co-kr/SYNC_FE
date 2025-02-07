import { ElementType } from 'react';

import { create } from 'zustand';

interface ModalState {
  title: string;
  isModalOpen: boolean;
  ModalComponent: ElementType | null; // 수정된 부분
  openModal: (component: ElementType, title: string) => void; // 수정된 부분
  closeModal: () => void;
}

const modalStore = create<ModalState>((set) => ({
  title: '',
  isModalOpen: false,
  ModalComponent: null,
  openModal: (component, title) =>
    set(() => ({
      isModalOpen: true,
      ModalComponent: component,
      title,
    })),
  closeModal: () =>
    set(() => ({
      isModalOpen: false,
      ModalComponent: null,
    })),
}));

export default modalStore;

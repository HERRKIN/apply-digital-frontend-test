import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalState {
  isOpen: boolean;
  content: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const useModal = create<ModalState>()(
  devtools((set) => ({
    isOpen: false,
    content: null,
    openModal: (content: React.ReactNode) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),
  }))
);

export { useModal };

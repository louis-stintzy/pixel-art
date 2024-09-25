import { StateCreator } from 'zustand';

export interface ModalSlice {
  isCroppingModalOpen: boolean;
  isDescriptionModalOpen: boolean;
  setIsCroppingModalOpen: (isOpen: boolean) => void;
  setIsDescriptionModalOpen: (isOpen: boolean) => void;
}

const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  isCroppingModalOpen: false,
  isDescriptionModalOpen: false,
  setIsCroppingModalOpen: (isOpen) => set({ isCroppingModalOpen: isOpen }),
  setIsDescriptionModalOpen: (isOpen) =>
    set({ isDescriptionModalOpen: isOpen }),
});

export default createModalSlice;

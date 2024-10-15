import { StateCreator } from 'zustand';

export interface ModalSlice {
  isCroppingModalOpen: boolean;
  isDescriptionModalOpen: boolean;
  isPreviewModalOpen: boolean;
  setIsCroppingModalOpen: (isOpen: boolean) => void;
  setIsDescriptionModalOpen: (isOpen: boolean) => void;
  setIsPreviewModalOpen: (isOpen: boolean) => void;
}

const createModalSlice: StateCreator<ModalSlice> = (set) => ({
  isCroppingModalOpen: false,
  isDescriptionModalOpen: false,
  isPreviewModalOpen: false,
  setIsCroppingModalOpen: (isOpen) => set({ isCroppingModalOpen: isOpen }),
  setIsDescriptionModalOpen: (isOpen) =>
    set({ isDescriptionModalOpen: isOpen }),
  setIsPreviewModalOpen: (isOpen) => set({ isPreviewModalOpen: isOpen }),
});

export default createModalSlice;

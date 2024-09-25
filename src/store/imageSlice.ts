import { StateCreator } from 'zustand';

export interface ImageSlice {
  isCroppingModalOpen: boolean;
  fileUrl: string | undefined;
  imageUrl: string | undefined;
  setIsCroppingModalOpen: (isOpen: boolean) => void;
  setFileUrl: (fileUrl: string | undefined) => void;
  setImageUrl: (imageUrl: string | undefined) => void;
}

const createImageSlice: StateCreator<ImageSlice> = (set) => ({
  isCroppingModalOpen: false,
  fileUrl: undefined,
  imageUrl: undefined,
  setIsCroppingModalOpen: (isOpen) => set({ isCroppingModalOpen: isOpen }),
  setFileUrl: (fileUrl) => set({ fileUrl }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
});

export default createImageSlice;

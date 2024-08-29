import { StateCreator } from 'zustand';

export interface ImageSlice {
  croppingModalIsOpen: boolean;
  fileUrl: string | undefined;
  imageUrl: string | undefined;
  setCroppingModalIsOpen: (croppingModalIsOpen: boolean) => void;
  setFileUrl: (fileUrl: string | undefined) => void;
  setImageUrl: (imageUrl: string | undefined) => void;
}

const createImageSlice: StateCreator<ImageSlice> = (set) => ({
  croppingModalIsOpen: false,
  fileUrl: undefined,
  imageUrl: undefined,
  setCroppingModalIsOpen: (croppingModalIsOpen) => set({ croppingModalIsOpen }),
  setFileUrl: (fileUrl) => set({ fileUrl }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
});

export default createImageSlice;

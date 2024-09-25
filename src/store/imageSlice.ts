import { StateCreator } from 'zustand';

export interface ImageSlice {
  fileUrl: string | undefined;
  imageUrl: string | undefined;
  setFileUrl: (fileUrl: string | undefined) => void;
  setImageUrl: (imageUrl: string | undefined) => void;
}

const createImageSlice: StateCreator<ImageSlice> = (set) => ({
  fileUrl: undefined,
  imageUrl: undefined,
  setFileUrl: (fileUrl) => set({ fileUrl }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
});

export default createImageSlice;

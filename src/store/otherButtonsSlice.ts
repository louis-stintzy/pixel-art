import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  isDescriptionModalOpen: boolean;
  pixelArtDescription: string;
  setIsDescriptionModalOpen: (isOpen: boolean) => void;
  setPixelArtDescription: (pixelartDescription: string) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  isDescriptionModalOpen: false,
  pixelArtDescription: '',
  setIsDescriptionModalOpen: (isOpen) =>
    set({ isDescriptionModalOpen: isOpen }),
  setPixelArtDescription: (pixelArtDescription) => set({ pixelArtDescription }),
});

export default createOtherButtonsSlice;

import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  pixelArtDescription: string;
  setPixelArtDescription: (pixelartDescription: string) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  pixelArtDescription: '',
  setPixelArtDescription: (pixelArtDescription) => set({ pixelArtDescription }),
});

export default createOtherButtonsSlice;

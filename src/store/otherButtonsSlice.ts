import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  descriptionModalIsOpen: boolean;
  pixelArtDescription: string;
  setDescriptionModalIsOpen: (descriptionModalIsOpen: boolean) => void;
  setPixelArtDescription: (pixelartDescription: string) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  descriptionModalIsOpen: false,
  pixelArtDescription: '',
  setDescriptionModalIsOpen: (descriptionModalIsOpen) =>
    set({ descriptionModalIsOpen }),
  setPixelArtDescription: (pixelArtDescription) => set({ pixelArtDescription }),
});

export default createOtherButtonsSlice;

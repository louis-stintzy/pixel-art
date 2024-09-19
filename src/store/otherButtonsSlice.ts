import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  contactToastVisible: boolean;
  descriptionModalIsOpen: boolean;
  pixelArtDescription: string;
  setContactToastVisible: (contactToastVisible: boolean) => void;
  setDescriptionModalIsOpen: (descriptionModalIsOpen: boolean) => void;
  setPixelArtDescription: (pixelartDescription: string) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  contactToastVisible: false,
  descriptionModalIsOpen: false,
  pixelArtDescription: '',
  setContactToastVisible: (contactToastVisible) => set({ contactToastVisible }),
  setDescriptionModalIsOpen: (descriptionModalIsOpen) =>
    set({ descriptionModalIsOpen }),
  setPixelArtDescription: (pixelArtDescription) => set({ pixelArtDescription }),
});

export default createOtherButtonsSlice;

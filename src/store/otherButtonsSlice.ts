import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  contactToastVisible: boolean;
  descriptionModalIsOpen: boolean;
  pixelArtDescription: string;
  savingToastVisible: {
    success: boolean;
    error: boolean;
  };
  setContactToastVisible: (contactToastVisible: boolean) => void;
  setDescriptionModalIsOpen: (descriptionModalIsOpen: boolean) => void;
  setPixelArtDescription: (pixelartDescription: string) => void;
  setSavingToastVisible: (savingToastVisible: {
    success: boolean;
    error: boolean;
  }) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  contactToastVisible: false,
  descriptionModalIsOpen: false,
  pixelArtDescription: '',
  savingToastVisible: {
    success: false,
    error: false,
  },
  setContactToastVisible: (contactToastVisible) => set({ contactToastVisible }),
  setDescriptionModalIsOpen: (descriptionModalIsOpen) =>
    set({ descriptionModalIsOpen }),
  setPixelArtDescription: (pixelArtDescription) => set({ pixelArtDescription }),
  setSavingToastVisible: (savingToastVisible) => set({ savingToastVisible }),
});

export default createOtherButtonsSlice;

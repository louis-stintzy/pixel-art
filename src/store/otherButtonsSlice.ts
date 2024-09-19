import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  contactToastVisible: boolean;
  setContactToastVisible: (contactToastVisible: boolean) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  contactToastVisible: false,
  setContactToastVisible: (contactToastVisible) => set({ contactToastVisible }),
});

export default createOtherButtonsSlice;

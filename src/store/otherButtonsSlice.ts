import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  descriptionFields: {
    name: string;
    description: string;
  };
  setDescriptionFields: (field: 'name' | 'description', value: string) => void;
  resetDescriptionFields: () => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  descriptionFields: {
    name: '',
    description: '',
  },
  setDescriptionFields: (field, value) =>
    set((state) => ({
      descriptionFields: { ...state.descriptionFields, [field]: value },
    })),
  resetDescriptionFields: () =>
    set({ descriptionFields: { name: '', description: '' } }),
});

export default createOtherButtonsSlice;

import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  descriptionFields: {
    name: string;
    description: string;
  };
  previewUrl: string;
  setDescriptionFields: (field: 'name' | 'description', value: string) => void;
  resetDescriptionFields: () => void;
  setPreviewUrl: (url: string) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  descriptionFields: {
    name: '',
    description: '',
  },
  previewUrl: '',
  setDescriptionFields: (field, value) =>
    set((state) => ({
      descriptionFields: { ...state.descriptionFields, [field]: value },
    })),
  resetDescriptionFields: () =>
    set({ descriptionFields: { name: '', description: '' } }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
});

export default createOtherButtonsSlice;

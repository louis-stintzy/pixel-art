import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  clickedButton: 'save' | 'publish' | null;
  descriptionFields: {
    name: string;
    description: string;
  };
  previewUrl: string;
  setClickedButton: (button: 'save' | 'publish' | null) => void;
  setDescriptionFields: (field: 'name' | 'description', value: string) => void;
  resetDescriptionFields: () => void;
  setPreviewUrl: (url: string) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  clickedButton: null,
  descriptionFields: {
    name: '',
    description: '',
  },
  previewUrl: '',
  setClickedButton: (button) => set({ clickedButton: button }),
  setDescriptionFields: (field, value) =>
    set((state) => ({
      descriptionFields: { ...state.descriptionFields, [field]: value },
    })),
  resetDescriptionFields: () =>
    set({ descriptionFields: { name: '', description: '' } }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
});

export default createOtherButtonsSlice;

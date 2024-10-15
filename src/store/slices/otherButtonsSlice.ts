import { StateCreator } from 'zustand';

export interface OtherButtonsSlice {
  clickedButton: 'save' | 'publish' | null;
  descriptionFields: {
    name: string;
    description: string;
  };
  gridOptionSelected: 'none' | 'pixel' | 'full';
  previewUrl: string;
  setClickedButton: (button: 'save' | 'publish' | null) => void;
  setDescriptionFields: (field: 'name' | 'description', value: string) => void;
  resetDescriptionFields: () => void;
  setGridOptionSelected: (gridOption: 'none' | 'pixel' | 'full') => void;
  setPreviewUrl: (url: string) => void;
}

const createOtherButtonsSlice: StateCreator<OtherButtonsSlice> = (set) => ({
  clickedButton: null,
  descriptionFields: {
    name: '',
    description: '',
  },
  gridOptionSelected: 'full',
  previewUrl: '',
  setClickedButton: (button) => set({ clickedButton: button }),
  setDescriptionFields: (field, value) =>
    set((state) => ({
      descriptionFields: { ...state.descriptionFields, [field]: value },
    })),
  resetDescriptionFields: () =>
    set({ descriptionFields: { name: '', description: '' } }),
  setGridOptionSelected: (gridOption) =>
    set({ gridOptionSelected: gridOption }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
});

export default createOtherButtonsSlice;

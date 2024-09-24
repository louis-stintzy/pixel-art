import { StateCreator } from 'zustand';

export interface ToastSlice {
  isColorReplacementToastVisible: boolean;
  isClearCanvasToastVisible: boolean;
  isContactToastVisible: boolean;
  isSavingToastVisible: {
    success: boolean;
    error: boolean;
  };
  setIsColorReplacementToastVisible: (
    colorReplacementToastVisible: boolean
  ) => void;
  setIsClearCanvasToastVisible: (isVisible: boolean) => void;
  setIsContactToastVisible: (isVisible: boolean) => void;
  setIsSavingToastVisible: (isVisible: {
    success: boolean;
    error: boolean;
  }) => void;
  closeAllToasts: () => void;
}

const createToastSlice: StateCreator<ToastSlice> = (set) => ({
  isColorReplacementToastVisible: false,
  isClearCanvasToastVisible: false,
  isContactToastVisible: false,
  isSavingToastVisible: {
    success: false,
    error: false,
  },
  setIsColorReplacementToastVisible: (isVisible) =>
    set({ isColorReplacementToastVisible: isVisible }),
  setIsClearCanvasToastVisible: (isVisible) =>
    set({ isClearCanvasToastVisible: isVisible }),
  setIsContactToastVisible: (isVisible) =>
    set({ isContactToastVisible: isVisible }),
  setIsSavingToastVisible: (isVisible) =>
    set({ isSavingToastVisible: isVisible }),
  closeAllToasts: () =>
    set({
      isColorReplacementToastVisible: false,
      isClearCanvasToastVisible: false,
      isContactToastVisible: false,
      isSavingToastVisible: {
        success: false,
        error: false,
      },
    }),
});

export default createToastSlice;

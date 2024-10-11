import { StateCreator } from 'zustand';

export interface ToastSlice {
  isColorReplacementToastVisible: boolean;
  isClearCanvasToastVisible: boolean;
  isContactToastVisible: boolean;
  isSavingPublishingPreviewingToastVisible: {
    success: boolean;
    error: boolean;
    message: string;
  };
  setIsColorReplacementToastVisible: (isVisible: boolean) => void;
  setIsClearCanvasToastVisible: (isVisible: boolean) => void;
  setIsContactToastVisible: (isVisible: boolean) => void;
  setIsSavingPublishingPreviewingToastVisible: (isVisible: {
    success: boolean;
    error: boolean;
    message: string;
  }) => void;
  closeAllToasts: () => void;
}

const createToastSlice: StateCreator<ToastSlice> = (set) => ({
  isColorReplacementToastVisible: false,
  isClearCanvasToastVisible: false,
  isContactToastVisible: false,
  isSavingPublishingPreviewingToastVisible: {
    success: false,
    error: false,
    message: '',
  },
  setIsColorReplacementToastVisible: (isVisible) =>
    set({ isColorReplacementToastVisible: isVisible }),
  setIsClearCanvasToastVisible: (isVisible) =>
    set({ isClearCanvasToastVisible: isVisible }),
  setIsContactToastVisible: (isVisible) =>
    set({ isContactToastVisible: isVisible }),
  setIsSavingPublishingPreviewingToastVisible: (isVisible) =>
    set({ isSavingPublishingPreviewingToastVisible: isVisible }),
  closeAllToasts: () =>
    set({
      isColorReplacementToastVisible: false,
      isClearCanvasToastVisible: false,
      isContactToastVisible: false,
      isSavingPublishingPreviewingToastVisible: {
        success: false,
        error: false,
        message: '',
      },
    }),
});

export default createToastSlice;

import useStore from './store';

// ----- Toasts Visibility -----
export const useIsColorReplacementToastVisible = () =>
  useStore((state) => state.isColorReplacementToastVisible);
export const useIsClearCanvasToastVisible = () =>
  useStore((state) => state.isClearCanvasToastVisible);
export const useIsContactToastVisible = () =>
  useStore((state) => state.isContactToastVisible);
export const useIsSavingToastVisible = () =>
  useStore((state) => state.isSavingToastVisible);

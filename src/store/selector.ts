import useStore from './store';

// ----- Toasts Visibility -----
export const useIsColorReplacementToastVisible = () =>
  useStore((state) => state.isColorReplacementToastVisible);
export const useIsClearCanvasToastVisible = () =>
  useStore((state) => state.isClearCanvasToastVisible);
export const useIsSavingToastVisible = () =>
  useStore((state) => state.isSavingToastVisible);
export const useIsContactToastVisible = () =>
  useStore((state) => state.isContactToastVisible);

// ----- Modals Opening -----
export const useIsCroppingModalOpen = () =>
  useStore((state) => state.isCroppingModalOpen);

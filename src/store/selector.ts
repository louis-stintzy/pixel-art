import useStore from './store';

// ----- User Data (hooks) -----
export const useUser = () => useStore((state) => state.user);
export const useIsLogged = () => useStore((state) => state.isLogged);

// ----- User Data (non-hooks) -----
export const getUser = () => useStore.getState().user;
export const getIsLogged = () => useStore.getState().isLogged;

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
export const useIsDescriptionModalOpen = () =>
  useStore((state) => state.isDescriptionModalOpen);

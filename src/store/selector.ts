import useStore from './store';

// ----- User Data (hooks) -----
export const useUser = () => useStore((state) => state.user);
export const useIsLogged = () => useStore((state) => state.isLogged);

// ----- User Data (non-hooks) -----
export const getUser = () => useStore.getState().user;
export const getIsLogged = () => useStore.getState().isLogged;

// ----- Grid Data (hooks) -----
export const useUserDragsGrid = () => useStore((state) => state.userDragsGrid);
export const useAspectRatio = () => useStore((state) => state.aspectRatio);
export const useFormat = () => useStore((state) => state.format);
export const useGridSize = () => useStore((state) => state.gridSize);
export const useGridColor = () => useStore((state) => state.gridColor);
export const usePixelColor = (pixelId: string) =>
  useStore((state) => state.pixelColors[pixelId]);

// ----- Grid Data (non-hooks) -----
export const getGridSize = () => useStore.getState().gridSize;
export const getGridColor = () => useStore.getState().gridColor;
export const getPixelColors = () => useStore.getState().pixelColors;

// ----- Palette & Color Data (hooks) -----
export const useSelectedPalette = () =>
  useStore((state) => state.selectedPalette);
export const useSelectedColor = () => useStore((state) => state.selectedColor);
export const useRecentColors = () => useStore((state) => state.recentColors);
export const useFavoriteColors = () =>
  useStore((state) => state.favoriteColors);

// ----- Image Urls (hooks)-----
export const useFileUrl = () => useStore((state) => state.fileUrl);
export const useImageUrl = () => useStore((state) => state.imageUrl);

// ----- Image Urls (non-hooks) -----
export const getFileUrl = () => useStore.getState().fileUrl;
export const getImageUrl = () => useStore.getState().imageUrl;

// ----- Action Buttons (hooks) -----
export const useIsReadyToDraw = () => useStore((state) => state.isReadyToDraw);
export const useIsEraser = () => useStore((state) => state.isEraser);
export const useIsBigTool = () => useStore((state) => state.isBigTool);
export const useIsSelectingColorToChange = () =>
  useStore((state) => state.colorReplacement.isSelectingColor);
export const useIsImageHidden = () => useStore((state) => state.isImageHidden);
export const useSavedPixelColorsBeforeColorReplacement = () =>
  useStore((state) => state.colorReplacement.savedPixelColors);
export const useIsColorReplacementLoading = () =>
  useStore((state) => state.colorReplacement.isLoading);

// ----- Action Buttons (non-hooks) -----
export const getIsReadyToDraw = () => useStore.getState().isReadyToDraw;
export const getIsEraser = () => useStore.getState().isEraser;
export const getIsBigTool = () => useStore.getState().isBigTool;
export const getIsSelectingColorToChange = () =>
  useStore.getState().colorReplacement.isSelectingColor;
export const getIsImageHidden = () => useStore.getState().isImageHidden;

// ----- Other Buttons (hooks) -----
export const usePixelArtName = () =>
  useStore((state) => state.descriptionFields.name);
export const usePixelArtDescription = () =>
  useStore((state) => state.descriptionFields.description);
export const usePreviewUrl = () => useStore((state) => state.previewUrl);

// ----- Other Buttons (non-hooks) -----
export const getDescriptionFields = () => useStore.getState().descriptionFields;

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
export const useIsPreviewModalOpen = () =>
  useStore((state) => state.isPreviewModalOpen);

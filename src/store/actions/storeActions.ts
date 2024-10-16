import { Color, PaletteNameCamelCase } from '../../@types/colorPalette';
import useStore from '../store';

// ----- Palette & Color Data -----
export const setSelectedPalette = (palette: PaletteNameCamelCase) =>
  useStore.getState().setSelectedPalette(palette);
export const setSelectedColor = (selectedColor: Color) =>
  useStore.getState().setSelectedColor(selectedColor);
export const setFavoriteColors = (updatedFavoriteColors: Color[]) =>
  useStore.getState().setFavoriteColors(updatedFavoriteColors);
export const addRecentColor = (color: Color) =>
  useStore.getState().addRecentColor(color);
export const addFavoriteColor = (color: Color) =>
  useStore.getState().addFavoriteColor(color);
export const removeFavoriteColor = (color: Color) =>
  useStore.getState().removeFavoriteColor(color);

// ----- Image Urls -----
export const setFileUrl = (fileUrl: string | undefined) =>
  useStore.getState().setFileUrl(fileUrl);
export const setImageUrl = (imageUrl: string | undefined) =>
  useStore.getState().setImageUrl(imageUrl);

// ----- Action Buttons -----
export const setIsReadyToDraw = (isReady: boolean) =>
  useStore.getState().setIsReadyToDraw(isReady);
export const setIsEraser = (isEraser: boolean) =>
  useStore.getState().setIsEraser(isEraser);
export const setIsBigTool = (isBigTool: boolean) =>
  useStore.getState().setIsBigTool(isBigTool);
export const setColorReplacement = (newState: {
  isSelectingColor?: boolean;
  savedPixelColors?: Record<string, string> | undefined;
  isLoading?: boolean;
}) => useStore.getState().setColorReplacement(newState);
export const setIsImageHidden = (isHidden: boolean) =>
  useStore.getState().setIsImageHidden(isHidden);

// ----- Other Buttons -----
export const setClickedButton = (button: 'save' | 'publish' | null) =>
  useStore.getState().setClickedButton(button);
export const setDescriptionFields = (
  field: 'name' | 'description',
  value: string
) => useStore.getState().setDescriptionFields(field, value);
export const resetDescriptionFields = () =>
  useStore.getState().resetDescriptionFields();
export const setGridOptionSelected = (gridOption: 'none' | 'pixel' | 'full') =>
  useStore.getState().setGridOptionSelected(gridOption);
export const setPreviewUrl = (url: string) =>
  useStore.getState().setPreviewUrl(url);

// ----- Toasts Visibility -----
export const setIsColorReplacementToastVisible = (isVisible: boolean) =>
  useStore.getState().setIsColorReplacementToastVisible(isVisible);
export const setIsClearCanvasToastVisible = (isVisible: boolean) =>
  useStore.getState().setIsClearCanvasToastVisible(isVisible);
export const setIsContactToastVisible = (isVisible: boolean) =>
  useStore.getState().setIsContactToastVisible(isVisible);
export const setIsSavingPublishingPreviewingToastVisible = (isVisible: {
  success: boolean;
  error: boolean;
  message: string;
}) =>
  useStore.getState().setIsSavingPublishingPreviewingToastVisible(isVisible);
export const closeAllToasts = () => useStore.getState().closeAllToasts();

// ----- Modals Opening -----
export const setIsCroppingModalOpen = (isOpen: boolean) =>
  useStore.getState().setIsCroppingModalOpen(isOpen);
export const setIsDescriptionModalOpen = (isOpen: boolean) =>
  useStore.getState().setIsDescriptionModalOpen(isOpen);
export const setIsPreviewModalOpen = (isOpen: boolean) =>
  useStore.getState().setIsPreviewModalOpen(isOpen);

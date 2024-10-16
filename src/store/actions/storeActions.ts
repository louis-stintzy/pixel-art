import { AspectRatio, Format } from '../../@types/aspectRatio';
import { Color, PaletteNameCamelCase } from '../../@types/colorPalette';
import { UserSlice } from '../slices/userSlice';
import useStore from '../store';

// ----- User Data -----
export const setUser = (user: UserSlice['user']) =>
  useStore.getState().setUser(user);
export const setIsLogged = (isLogged: boolean) =>
  useStore.getState().setIsLogged(isLogged);

// ----- Grid Data -----
export const setUserDragsGrid = (userDragsGrid: boolean) =>
  useStore.getState().setUserDragsGrid(userDragsGrid);
export const setAspectRatio = (aspectRatio: AspectRatio) =>
  useStore.getState().setAspectRatio(aspectRatio);
export const setFormat = (format: Format) =>
  useStore.getState().setFormat(format);
export const setGridSize = (gridSize: {
  width: number;
  height: number;
  pixelSize: number;
}) => useStore.getState().setGridSize(gridSize);
export const setGridColor = (gridColor: { background: string; line: string }) =>
  useStore.getState().setGridColor(gridColor);
export const setPixelColors = (newPixelColors: Record<string, string>) =>
  useStore.getState().setPixelColors(newPixelColors);
export const setPixelColorsBackup = (newPixelColors: Record<string, string>) =>
  useStore.getState().setPixelColorsBackup(newPixelColors);
export const cleanPixelColors = () => useStore.getState().cleanPixelColors();
export const resetPixelColors = () => useStore.getState().resetPixelColors();

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

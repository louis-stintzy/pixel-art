import useStore from '../store';

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

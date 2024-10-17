import { create } from 'zustand';
import createUserSlice, { UserSlice } from './slices/userSlice';
import createGridSlice, { GridSlice } from './slices/gridSlice';
import createImageSlice, { ImageSlice } from './slices/imageSlice';
import createPaletteSlice, { PaletteSlice } from './slices/paletteSlice';
import createActionButtonsSlice, {
  ActionButtonsSlice,
} from './slices/actionButtonsSlice';
import createOtherButtonsSlice, {
  OtherButtonsSlice,
} from './slices/otherButtonsSlice';
import createModalSlice, { ModalSlice } from './slices/modalSlice';
import createToastSlice, { ToastSlice } from './slices/toastSlice';

type StoreState = UserSlice &
  GridSlice &
  ImageSlice &
  PaletteSlice &
  ActionButtonsSlice &
  OtherButtonsSlice &
  ModalSlice &
  ToastSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createGridSlice(...a),
  ...createImageSlice(...a),
  ...createPaletteSlice(...a),
  ...createActionButtonsSlice(...a),
  ...createOtherButtonsSlice(...a),
  ...createModalSlice(...a),
  ...createToastSlice(...a),
}));

export default useStore;

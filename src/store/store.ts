import { create } from 'zustand';
import createUserSlice, { UserSlice } from './userSlice';
import createGridSlice, { GridSlice } from './gridSlice';
import createImageSlice, { ImageSlice } from './imageSlice';
import createPaletteSlice, { PaletteSlice } from './paletteSlice';
import createActionButtonsSlice, {
  ActionButtonsSlice,
} from './actionButtonsSlice';
import createOtherButtonsSlice, {
  OtherButtonsSlice,
} from './otherButtonsSlice';
import createModalSlice, { ModalSlice } from './modalSlice';
import createToastSlice, { ToastSlice } from './toastSlice';

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

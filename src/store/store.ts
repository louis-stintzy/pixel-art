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

type StoreState = UserSlice &
  GridSlice &
  ImageSlice &
  PaletteSlice &
  ActionButtonsSlice &
  OtherButtonsSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createUserSlice(...a),
  ...createGridSlice(...a),
  ...createImageSlice(...a),
  ...createPaletteSlice(...a),
  ...createActionButtonsSlice(...a),
  ...createOtherButtonsSlice(...a),
}));

export default useStore;

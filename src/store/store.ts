import { create } from 'zustand';
import createGridSlice, { GridSlice } from './gridSlice';
import createImageSlice, { ImageSlice } from './imageSlice';
import createPaletteSlice, { PaletteSlice } from './paletteSlice';
import createActionButtonsSlice, {
  ActionButtonsSlice,
} from './actionButtonsSlice';
import createTimeoutSlice, { TimeoutSlice } from './timeoutSlice';

type StoreState = GridSlice &
  ImageSlice &
  PaletteSlice &
  ActionButtonsSlice &
  TimeoutSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createGridSlice(...a),
  ...createImageSlice(...a),
  ...createPaletteSlice(...a),
  ...createActionButtonsSlice(...a),
  ...createTimeoutSlice(...a),
}));

export default useStore;

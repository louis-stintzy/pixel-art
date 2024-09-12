import { create } from 'zustand';
import createGridSlice, { GridSlice } from './gridSlice';
import createImageSlice, { ImageSlice } from './imageSlice';
import createPaletteSlice, { PaletteSlice } from './paletteSlice';
import createActionButtonsSlice, {
  ActionButtonsSlice,
} from './actionButtonsSlice';

type StoreState = GridSlice & ImageSlice & PaletteSlice & ActionButtonsSlice;

const useStore = create<StoreState>()((...a) => ({
  ...createGridSlice(...a),
  ...createImageSlice(...a),
  ...createPaletteSlice(...a),
  ...createActionButtonsSlice(...a),
}));

export default useStore;

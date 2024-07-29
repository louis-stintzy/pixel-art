import { create } from 'zustand';
import colorPalettes, { PaletteName } from '../constants/colors';

type State = {
  userDragsGrid: boolean;
  gridSize: { width: number; height: number; pixelSize: number };
  imageUrl: string | null;
  selectedPalette: { name: PaletteName; colors: string[] };
  selectedColor: string;
  pixelColors: Record<string, string>; // Record<Keys, Type>, Constructs an object type whose property keys are Keys and whose property values are Type.
  setUserDragsGrid: (userDragsGrid: boolean) => void;
  setGridSize: (gridSize: {
    width: number;
    height: number;
    pixelSize: number;
  }) => void;
  setImageUrl: (imageUrl: string) => void;
  setSelectedPalette: (paletteName: PaletteName) => void;
  setSelectedColor: (selectedColor: string) => void;
  setPixelColors: (id: string, color: string) => void;
};

const useStore = create<State>()((set) => ({
  userDragsGrid: false,
  gridSize: { width: 8, height: 8, pixelSize: 70 },
  imageUrl: null,
  selectedPalette: {
    name: 'materialDesign' as PaletteName,
    colors: colorPalettes.materialDesign,
  },
  selectedColor: colorPalettes.materialDesign[0],
  pixelColors: {},
  setUserDragsGrid: (userDragsGrid) => set({ userDragsGrid }),
  setGridSize: (gridSize) => set({ gridSize }),
  setImageUrl: (imageUrl) => set({ imageUrl }),
  setSelectedPalette: (paletteName) =>
    set({
      selectedPalette: {
        name: paletteName,
        colors: colorPalettes[paletteName],
      },
      selectedColor: colorPalettes[paletteName][0],
    }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
  setPixelColors: (id, color) =>
    set((state) => ({
      pixelColors: { ...state.pixelColors, [id]: color },
    })),
}));

export default useStore;

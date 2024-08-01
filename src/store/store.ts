import { create } from 'zustand';
import colorPalettes, { PaletteName } from '../constants/colors';

type State = {
  // ----- Grid -----
  userDragsGrid: boolean;
  aspectRatio: number;
  gridSize: { width: number; height: number; pixelSize: number };
  setUserDragsGrid: (userDragsGrid: boolean) => void;
  setAspectRation: (aspectRatio: number) => void;
  setGridSize: (gridSize: {
    width: number;
    height: number;
    pixelSize: number;
  }) => void;

  // ----- Image -----
  croppingModalIsOpen: boolean;
  fileUrl: string | undefined;
  imageUrl: string | undefined;
  setCroppingModalIsOpen: (croppingModalIsOpen: boolean) => void;
  setFileUrl: (fileUrl: string | undefined) => void;
  setImageUrl: (imageUrl: string | undefined) => void;

  // ----- Palette & Color-----
  selectedPalette: { name: PaletteName; colors: string[] };
  selectedColor: string;
  pixelColors: Record<string, string>; // Record<Keys, Type>, Constructs an object type whose property keys are Keys and whose property values are Type.
  setSelectedPalette: (paletteName: PaletteName) => void;
  setSelectedColor: (selectedColor: string) => void;
  setPixelColors: (id: string, color: string) => void;
};

const useStore = create<State>()((set) => ({
  // ----- Grid -----
  userDragsGrid: false,
  aspectRatio: 4 / 3,
  gridSize: { width: 8, height: 8, pixelSize: 70 },
  setUserDragsGrid: (userDragsGrid) => set({ userDragsGrid }),
  setAspectRation: (aspectRatio) => set({ aspectRatio }),
  setGridSize: (gridSize) => set({ gridSize }),

  // ----- Image -----
  croppingModalIsOpen: false,
  fileUrl: undefined,
  imageUrl: undefined,
  setCroppingModalIsOpen: (croppingModalIsOpen) => set({ croppingModalIsOpen }),
  setFileUrl: (fileUrl) => set({ fileUrl }),
  setImageUrl: (imageUrl) => set({ imageUrl }),

  // ----- Palette & Color-----
  selectedPalette: {
    name: 'materialDesign' as PaletteName,
    colors: colorPalettes.materialDesign,
  },
  selectedColor: colorPalettes.materialDesign[0],
  pixelColors: {},
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

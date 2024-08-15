import { create } from 'zustand';
import colorPalettes, { PaletteName } from '../constants/colors';
import { resetAspectRatio } from '../constants/aspectRatio';
import { AspectRatio, Format } from '../@types/aspectRatio';

type State = {
  // ----- Grid -----
  userDragsGrid: boolean;
  aspectRatio: AspectRatio;
  format: Format;
  gridSize: { width: number; height: number; pixelSize: number };
  setUserDragsGrid: (userDragsGrid: boolean) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  setFormat: (format: Format) => void;
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

  // ----- Action Buttons -----
  isReadyToColor: boolean;
  setIsReadyToColor: (isReadyToColor: boolean) => void;
};

const useStore = create<State>()((set) => ({
  // ----- Grid -----
  userDragsGrid: false,
  aspectRatio: resetAspectRatio,
  format: resetAspectRatio.formats[0],
  gridSize: { width: 8, height: 8, pixelSize: 70 },
  setUserDragsGrid: (userDragsGrid) => set({ userDragsGrid }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  setFormat: (format) => set({ format }),
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

  // ----- Action Buttons -----
  isReadyToColor: false,
  setIsReadyToColor: (isReadyToColor) => set({ isReadyToColor }),
}));

export default useStore;

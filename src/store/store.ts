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
  setPixelColors: (newPixelColors: Record<string, string>) => void;

  // ----- Action Buttons -----
  isReadyToDraw: boolean;
  isEraser: boolean;
  isBigTool: boolean;
  colorReplacement: {
    isSelectingColor: boolean;
    targetColor: string | undefined;
    savedPixelColors: Record<string, string> | undefined;
    isLoading: boolean;
  };
  isImageHidden: boolean;
  setIsReadyToDraw: (isReadyToDraw: boolean) => void;
  setIsEraser: (isEraser: boolean) => void;
  setIsBigTool: (isBigTool: boolean) => void;
  setColorReplacement: (newState: {
    isSelectingColor?: boolean;
    targetColor?: string | undefined;
    savedPixelColors?: Record<string, string> | undefined;
    isLoading?: boolean;
  }) => void;
  setIsImageHidden: (isImageHidden: boolean) => void;
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
  setPixelColors: (newPixelColors: Record<string, string>) =>
    set((state) => ({
      pixelColors: { ...state.pixelColors, ...newPixelColors },
    })),

  // ----- Action Buttons -----
  isReadyToDraw: false,
  isEraser: false,
  isBigTool: false,
  colorReplacement: {
    isSelectingColor: false,
    targetColor: undefined,
    savedPixelColors: undefined,
    isLoading: false,
  },
  isImageHidden: false,
  setIsReadyToDraw: (isReadyToDraw) => set({ isReadyToDraw }),
  setIsEraser: (isEraser) => set({ isEraser }),
  setIsBigTool: (isBigTool) => set({ isBigTool }),
  setColorReplacement: (newState) =>
    set((state) => ({
      colorReplacement: {
        ...state.colorReplacement,
        ...newState,
      },
    })),
  setIsImageHidden: (isImageHidden) => set({ isImageHidden }),
}));

export default useStore;

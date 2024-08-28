import { create } from 'zustand';
import colorPalettes, {
  PaletteNameCamelCase,
  PaletteName,
} from '../constants/colors';
import { resetAspectRatio } from '../constants/aspectRatio';
import { AspectRatio, Format } from '../@types/aspectRatio';
import gridColor from '../constants/gridColor';

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
  selectedPalette: {
    name: PaletteName;
    colors: { name: string; code: string }[];
  };
  selectedColor: { name: string; code: string };
  pixelColors: Record<string, string>; // Record<Keys, Type>, Constructs an object type whose property keys are Keys and whose property values are Type.
  recentColors: { name: string; code: string }[];
  favoriteColors: { name: string; code: string }[];
  setSelectedPalette: (paletteName: PaletteNameCamelCase) => void;
  setSelectedColor: (selectedColor: { name: string; code: string }) => void;
  setPixelColors: (newPixelColors: Record<string, string>) => void;
  addRecentColor: (color: { name: string; code: string }) => void;
  addFavoriteColor: (color: { name: string; code: string }) => void;
  removeFavoriteColor: (color: { name: string; code: string }) => void;

  // ----- Action Buttons -----
  isReadyToDraw: boolean;
  isEraser: boolean;
  isBigTool: boolean;
  colorReplacement: {
    isSelectingColor: boolean;
    targetColor: string | undefined;
    savedPixelColors: Record<string, string> | undefined;
    isLoading: boolean;
    toastVisible: boolean;
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
    toastVisible?: boolean;
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
    colors: colorPalettes.materialDesign.colors,
  },
  selectedColor: colorPalettes.materialDesign.colors[0],
  pixelColors: {},
  recentColors: new Array(20).fill({
    name: 'Background',
    code: gridColor.background,
  }),
  favoriteColors: new Array(20).fill({
    name: 'Background',
    code: gridColor.background,
  }),
  setSelectedPalette: (paletteName) =>
    set({
      selectedPalette: {
        name: paletteName,
        colors: colorPalettes[paletteName].colors,
      },
      selectedColor: colorPalettes[paletteName].colors[0],
    }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
  setPixelColors: (newPixelColors: Record<string, string>) =>
    set((state) => ({
      pixelColors: { ...state.pixelColors, ...newPixelColors },
    })),
  addRecentColor: (color) =>
    set((state) => {
      const updatedRecentColors = [...state.recentColors]; // Copie du tableau
      const colorIndex = updatedRecentColors.findIndex(
        (c) => c.code === color.code
      ); // Recherche de la couleur dans le tableau
      if (colorIndex !== -1) {
        // Si la couleur est déjà dans le tableau, la supprimer
        updatedRecentColors.splice(colorIndex, 1);
      }
      updatedRecentColors.unshift(color); // Ajouter la couleur en premier
      return { recentColors: updatedRecentColors.slice(0, 20) }; // Limiter le tableau à 20 couleurs
    }),
  addFavoriteColor: (color) =>
    set((state) => {
      if (
        state.favoriteColors.length < 20 &&
        !state.favoriteColors.includes(color)
      ) {
        return { favoriteColors: [...state.favoriteColors, color] };
      }
      return state;
    }),
  removeFavoriteColor: (color) =>
    set((state) => ({
      favoriteColors: state.favoriteColors.filter((c) => c.code !== color.code),
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
    toastVisible: false,
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

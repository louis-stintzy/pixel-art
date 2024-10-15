import { StateCreator } from 'zustand';
import { AspectRatio, Format } from '../../@types/aspectRatio';
import { resetAspectRatio } from '../../constants/aspectRatio';

export interface GridSlice {
  userDragsGrid: boolean;
  aspectRatio: AspectRatio;
  format: Format;
  gridSize: { width: number; height: number; pixelSize: number };
  gridColor: {
    background: string;
    line: string;
  };
  pixelColors: Record<string, string>; // Record<Keys, Type>, Constructs an object type whose property keys are Keys and whose property values are Type.
  setUserDragsGrid: (userDragsGrid: boolean) => void;
  setAspectRatio: (aspectRatio: AspectRatio) => void;
  setFormat: (format: Format) => void;
  setGridSize: (gridSize: {
    width: number;
    height: number;
    pixelSize: number;
  }) => void;
  setGridColor: (gridColor: { background: string; line: string }) => void;
  setPixelColors: (newPixelColors: Record<string, string>) => void;
  setPixelColorsBackup: (newPixelColors: Record<string, string>) => void;
  cleanPixelColors: () => void;
  resetPixelColors: () => void;
}

const createGridSlice: StateCreator<GridSlice> = (set) => ({
  userDragsGrid: false,
  aspectRatio: resetAspectRatio,
  format: resetAspectRatio.formats[0],
  gridSize: { width: 40, height: 30, pixelSize: 25 }, // Default grid size, 800x600, 25px
  gridColor: {
    background: '#FFFEFF',
    line: '#ccc',
  },
  pixelColors: {},
  setUserDragsGrid: (userDragsGrid) => set({ userDragsGrid }),
  setAspectRatio: (aspectRatio) => set({ aspectRatio }),
  setFormat: (format) => set({ format }),
  setGridSize: (gridSize) => set({ gridSize }),
  setGridColor: (gridColor) => set({ gridColor }),
  setPixelColors: (newPixelColors: Record<string, string>) =>
    set((state) => ({
      pixelColors: { ...state.pixelColors, ...newPixelColors }, // Ajoute les nouvelles couleurs à pixelColors
    })),
  setPixelColorsBackup: (newPixelColors: Record<string, string>) => {
    set(() => ({
      pixelColors: { ...newPixelColors }, // Remplace entièrement pixelColors par les nouvelles couleurs
    }));
  },
  cleanPixelColors: () => {
    set((state) => {
      const pixelsToBeCleaned = { ...state.pixelColors };
      const cleanedPixelColors: Record<string, string> = Object.fromEntries(
        Object.entries(pixelsToBeCleaned).filter(
          ([pixelId, color]) => color !== state.gridColor.background
        )
      );
      return { pixelColors: cleanedPixelColors };
    });
  },
  resetPixelColors: () => set({ pixelColors: {} }),
});

export default createGridSlice;

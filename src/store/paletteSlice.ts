import { StateCreator } from 'zustand';
import {
  Color,
  PaletteName,
  PaletteNameCamelCase,
} from '../@types/colorPalette';
import colorPalettes from '../constants/colors';

import gridColor from '../constants/gridColor';

export interface PaletteSlice {
  selectedPalette: {
    name: PaletteName;
    colors: Color[];
  };
  selectedColor: Color;
  recentColors: Color[];
  favoriteColors: Color[];
  setSelectedPalette: (paletteName: PaletteNameCamelCase) => void;
  setSelectedColor: (selectedColor: Color) => void;
  addRecentColor: (color: Color) => void;
  addFavoriteColor: (color: Color) => void;
  removeFavoriteColor: (color: Color) => void;
}

const createPaletteSlice: StateCreator<PaletteSlice> = (set) => ({
  selectedPalette: {
    name: 'materialDesign' as PaletteName,
    colors: colorPalettes.materialDesign.colors,
  },
  selectedColor: colorPalettes.materialDesign.colors[0],
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
});

export default createPaletteSlice;

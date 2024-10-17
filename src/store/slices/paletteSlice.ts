import { StateCreator } from 'zustand';
import {
  Color,
  PaletteName,
  PaletteNameCamelCase,
} from '../../@types/colorPalette';
import colorPalettes from '../../constants/colors';

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
  setFavoriteColors: (updatedFavoriteColors: Color[]) => void;
  addRecentColor: (color: Color) => void;
  addFavoriteColor: (color: Color) => void;
  removeFavoriteColor: (color: Color) => void;
}

const createPaletteSlice: StateCreator<PaletteSlice> = (set) => {
  const defaultBackgroundColor = '#FFFEFF';

  return {
    selectedPalette: {
      name: 'materialDesign' as PaletteName,
      colors: colorPalettes.materialDesign.colors,
    },
    selectedColor: colorPalettes.materialDesign.colors[0],
    recentColors: new Array(20).fill({
      name: 'Background',
      code: defaultBackgroundColor,
    }),
    favoriteColors: new Array(20).fill({
      name: 'Background',
      code: defaultBackgroundColor,
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
    setFavoriteColors: (updatedFavoriteColors) =>
      set({ favoriteColors: updatedFavoriteColors }),
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
        const updatedFavoriteColors = [...state.favoriteColors]; // Copie du tableau
        // Exclure defaultBackgroundColor du décompte
        const validFavoriteColors = updatedFavoriteColors.filter(
          (c) => c.code !== defaultBackgroundColor
        );
        if (
          validFavoriteColors.length < 20 &&
          !state.favoriteColors.includes(color)
        ) {
          // Ajouter la couleur en premier (le tableau possède 21 éléments)
          updatedFavoriteColors.unshift(color);

          // Recherche de la première occurrence de defaultBackgroundColor
          const invalidFavoriteColorIndex = updatedFavoriteColors.findIndex(
            (c) => c.code === defaultBackgroundColor
          );

          // Si trouvé, supprimer cette couleur de fond du tableau
          if (invalidFavoriteColorIndex !== -1) {
            updatedFavoriteColors.splice(invalidFavoriteColorIndex, 1);
          }

          // Limiter le tableau à 20 couleurs
          return {
            favoriteColors: updatedFavoriteColors.splice(0, 20),
          };
        }
        return state;
      }),
    removeFavoriteColor: (color) =>
      set((state) => {
        const updatedFavoriteColors = [...state.favoriteColors].filter(
          (c) => c.code !== color.code
        ); // Copie du tableau sans la couleur à supprimer
        const filledColors = [
          ...updatedFavoriteColors,
          ...new Array(20 - updatedFavoriteColors.length).fill({
            name: 'Background',
            code: defaultBackgroundColor,
          }),
        ]; // Compléter le tableau avec defaultBackgroundColor
        return { favoriteColors: filledColors };
      }),
  };
};

export default createPaletteSlice;

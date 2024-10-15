import useStore from '../store/store';

import { getGridSize, getGridColor } from '../store/selectors/selector';

// ----- Color a pixel or a group of pixels -----

/**
 * Colors the specified pixels with the given color.
 *
 * @param {string[]} pixelIds - An array of pixel IDs to be colored.
 * @param {string} [color] - The color to use.
 */

export const coloring = (pixelIds: string[], color: string) => {
  const newPixelColors: Record<string, string> = {};
  pixelIds.forEach((id) => {
    newPixelColors[id] = color;
  });
  useStore.getState().setPixelColors(newPixelColors);
};

// ----- Replace a color with another color -----

/**
 * Replaces the specified color with the new color.
 *
 * @param {string} oldColor - The color to replace.
 * @param {string} [newColor] - The new color to use.
 */

export const replaceColor2 = async (oldColor: string, newColor: string) => {
  const gridColor = getGridColor();
  const { pixelColors } = useStore.getState();

  // Démarage du chargement
  useStore.getState().setColorReplacement({
    isSelectingColor: false,
    savedPixelColors: { ...pixelColors },
    isLoading: true,
  });

  // Attendre pour laisser le temps au loader de s'afficher
  await new Promise((resolve) => {
    setTimeout(resolve, 50);
  });

  // Logique de remplacement de la couleur par "batch processing"
  const newPixelColors: Record<string, string> = {};

  // Find all pixels with the old color
  Object.keys(pixelColors).forEach((id) => {
    if (pixelColors[id] === oldColor) {
      newPixelColors[id] = newColor;
    }
  });

  // If the old color is the grid background color, find all uncolored pixels
  if (oldColor === gridColor.background) {
    const gridSize = getGridSize();
    for (let row = 0; row < gridSize.height; row += 1) {
      for (let col = 0; col < gridSize.width; col += 1) {
        const id = `${row}-${col}`;
        if (!pixelColors[id]) {
          newPixelColors[id] = newColor;
        }
      }
    }
  }

  // Color the pixels with the new color (batch processing)
  const arrayOfKeys = Object.keys(newPixelColors);
  const numberOfKeys = arrayOfKeys.length;
  const batchSize = 1500; // Number of pixels to color at a time
  const totalBatches = Math.ceil(numberOfKeys / batchSize);

  for (let i = 0; i < totalBatches; i += 1) {
    const startIncluded = i * batchSize;
    const endExcluded = startIncluded + batchSize;
    const batch = arrayOfKeys.slice(startIncluded, endExcluded);
    const batchUpdate: Record<string, string> = {};
    batch.forEach((id) => {
      batchUpdate[id] = newPixelColors[id];
    });
    useStore.getState().setPixelColors(batchUpdate);

    // Wait for the UI to update
    // désactive la règle eslint car nous souhaitons spécifiquement une éxecution séquentielle
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });
  }

  // Arrêt du chargement et affichage du toast
  useStore.getState().setColorReplacement({ isLoading: false });
  useStore.getState().setIsColorReplacementToastVisible(true);
};

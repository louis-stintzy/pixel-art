import useStore from '../store/store';

//----------------------------------

/**
 * Colors the specified pixels with the given color.
 *
 * @param {string[]} pixelIds - An array of pixel IDs to be colored.
 * @param {string} [color] - The color to use. If not provided, the selected color from the store is used.
 */

export const coloring = (pixelIds: string[], color?: string) => {
  const { selectedColor } = useStore.getState();
  const colorToUSe = color || selectedColor.code;
  const newPixelColors: Record<string, string> = {};
  pixelIds.forEach((id) => {
    newPixelColors[id] = colorToUSe;
  });
  useStore.getState().setPixelColors(newPixelColors);
};

//----------------------------------

/**
 * Replaces the specified color with the new color.
 *
 * @param {string} oldColor - The color to replace.
 * @param {string} [newColor] - The new color to use. If not provided, the selected color from the store is used.
 */

export const replaceColor2 = async (oldColor: string, newColor?: string) => {
  const { gridColor, pixelColors, selectedColor } = useStore.getState();

  // Démarage du chargement
  useStore.getState().setColorReplacement({
    isSelectingColor: false,
    targetColor: oldColor,
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
      newPixelColors[id] = newColor || selectedColor.code;
    }
  });

  // If the old color is the grid background color, find all uncolored pixels
  if (oldColor === gridColor.background) {
    const { gridSize } = useStore.getState();
    for (let row = 0; row < gridSize.height; row += 1) {
      for (let col = 0; col < gridSize.width; col += 1) {
        const id = `${row}-${col}`;
        if (!pixelColors[id]) {
          newPixelColors[id] = newColor || selectedColor.code;
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
  useStore
    .getState()
    .setColorReplacement({ isLoading: false, toastVisible: true });
};

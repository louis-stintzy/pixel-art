import gridColor from '../constants/gridColor';
import useStore from '../store/store';

/**
 * Colors the specified pixels with the given color.
 *
 * @param {string[]} pixelIds - An array of pixel IDs to be colored.
 * @param {string} [color] - The color to use. If not provided, the selected color from the store is used.
 */

export const coloring = (pixelIds: string[], color?: string) => {
  const { selectedColor } = useStore.getState();
  const colorToUSe = color || selectedColor;
  pixelIds.forEach((id) => useStore.getState().setPixelColors(id, colorToUSe));
};

/**
 * Replaces the specified color with the new color.
 *
 * @param {string} oldColor - The color to replace.
 * @param {string} [newColor] - The new color to use. If not provided, the selected color from the store is used.
 */

export const replaceColor = (oldColor: string, newColor?: string) => {
  const { pixelColors, gridSize } = useStore.getState();
  const pixelIds: string[] = [];

  // Find all pixels with the old color
  Object.keys(pixelColors).forEach((id) => {
    if (pixelColors[id] === oldColor) {
      pixelIds.push(id);
    }
  });

  // If the old color is the grid background color, find all uncolored pixels
  if (oldColor === gridColor.background) {
    for (let row = 0; row < gridSize.height; row += 1) {
      for (let col = 0; col < gridSize.width; col += 1) {
        const id = `${row}-${col}`;
        if (!pixelColors[id]) {
          pixelIds.push(id);
        }
      }
    }
  }

  // Color the pixels with the new color
  coloring(pixelIds, newColor);
};

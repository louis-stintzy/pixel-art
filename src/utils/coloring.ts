import useStore from '../store/store';

/**
 * Colors the specified pixels with the given color.
 *
 * @param {string[]} pixelIds - An array of pixel IDs to be colored.
 * @param {string} [color] - The color to use. If not provided, the selected color from the store is used.
 */

const coloring = (pixelIds: string[], color?: string) => {
  const { selectedColor } = useStore.getState();
  const colorToUSe = color || selectedColor;
  pixelIds.forEach((id) => useStore.getState().setPixelColors(id, colorToUSe));
};

export default coloring;

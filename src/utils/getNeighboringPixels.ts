import useStore from '../store/store';

/**
 * Get the IDs of the neighboring pixels of the pixel with the given ID.
 *
 * @param {string} id - The ID of the pixel.
 * @returns {string[]} An array of neighboring pixel IDs.
 */

const getNeighboringPixels = (id: string) => {
  // assign the first element of the array to row and the second element to col (destructuring assignment, splitting the id string, and converting the strings to numbers)
  const [row, col] = id.split('-').map(Number);

  // get grid width and height from store
  const { width, height } = useStore.getState().gridSize;

  // create an array of neighboring pixel IDs and filter out any neighbors that are outside the grid
  const neighbors = [
    [row - 1, col], // top
    [row + 1, col], // bottom
    [row, col - 1], // left
    [row, col + 1], // right
  ]
    .filter(([r, c]) => r >= 0 && c >= 0 && r <= height - 1 && c <= width - 1)
    .map(([r, c]) => `${r}-${c}`);

  return neighbors;
};

export default getNeighboringPixels;

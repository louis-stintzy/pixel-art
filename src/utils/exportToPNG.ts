import { PixelArtData } from '../@types/pixelArtData';
/**
 * Export the pixel art data to a PNG file
 *
 * @param pixelArtData - Pixel art data returned by the exportData function.
 */

const exportToPNG = (pixelArtData: PixelArtData) => {
  const { width, height, pixelSize } = pixelArtData.gridSize;

  const canvas = document.createElement('canvas');
  canvas.width = width * pixelSize;
  canvas.height = height * pixelSize;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    Object.keys(pixelArtData.pixelColors).forEach((pixelId) => {
      const [row, col] = pixelId.split('-').map(Number);
      const color = pixelArtData.pixelColors[pixelId];
      const x = col * pixelSize;
      const y = row * pixelSize;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${pixelArtData.name}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  }
};

export default exportToPNG;

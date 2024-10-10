import { PixelArtData } from '../../@types/pixelArtData';
/**
 * Export the pixel art data to a PNG file
 *
 * @param pixelArtData - Pixel art data returned by the exportData function.
 * @param gridOption - Grid option selected by the user to show the grid everywhere, around pixels or not at all.
 */

const exportToSVG = (
  pixelArtData: PixelArtData,
  gridOption: 'none' | 'pixel' | 'full'
) => {
  const { width, height, pixelSize } = pixelArtData.gridSize;
  const svgNamespace = 'http://www.w3.org/2000/svg';
  const svgElement = document.createElementNS(svgNamespace, 'svg');
  svgElement.setAttribute('width', `${width * pixelSize}`);
  svgElement.setAttribute('height', `${height * pixelSize}`);

  const metadata = document.createElementNS(svgNamespace, 'metadata');
  metadata.textContent = `Created with Pixel Art Maker (version ${pixelArtData.version}),
  Creator: ${pixelArtData.user.username}, Pixel Art Token: ${pixelArtData.pixelArtToken}`;
  svgElement.appendChild(metadata);

  Object.keys(pixelArtData.pixelColors).forEach((pixelId) => {
    const [row, col] = pixelId.split('-').map(Number);
    const color = pixelArtData.pixelColors[pixelId];
    const x = col * pixelSize;
    const y = row * pixelSize;

    const rect = document.createElementNS(svgNamespace, 'rect');
    rect.setAttribute('x', `${x}`);
    rect.setAttribute('y', `${y}`);
    rect.setAttribute('width', `${pixelSize}`);
    rect.setAttribute('height', `${pixelSize}`);
    rect.setAttribute('fill', color);
    if (gridOption === 'pixel') {
      rect.setAttribute('stroke', pixelArtData.gridColor.line);
      // rect.setAttribute('stroke-width', '1'); // todo : rendre parametreable ?
    }
    svgElement.appendChild(rect);
  });

  if (gridOption === 'full') {
    for (let row = 0; row <= height; row += 1) {
      const y = row * pixelSize;
      const line = document.createElementNS(svgNamespace, 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', `${y}`);
      line.setAttribute('x2', `${width * pixelSize}`);
      line.setAttribute('y2', `${y}`);
      line.setAttribute('stroke', pixelArtData.gridColor.line);
      svgElement.appendChild(line);
    }
    for (let col = 0; col <= width; col += 1) {
      const x = col * pixelSize;
      const line = document.createElementNS(svgNamespace, 'line');
      line.setAttribute('x1', `${x}`);
      line.setAttribute('y1', '0');
      line.setAttribute('x2', `${x}`);
      line.setAttribute('y2', `${height * pixelSize}`);
      line.setAttribute('stroke', pixelArtData.gridColor.line);
      svgElement.appendChild(line);
    }
  }

  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return url;

  // const link = document.createElement('a');
  // link.href = url;
  // link.download = `${pixelArtData.name}.svg`;
  // link.click();
  // URL.revokeObjectURL(url);
};

export default exportToSVG;

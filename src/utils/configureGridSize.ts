import { Format } from '../@types/aspectRatio';

const configureGridSize = (newFormat: Format, pixelSize: number) => {
  const widthNumberOfPixels = newFormat.width / pixelSize;
  const heightNumberOfPixels = newFormat.height / pixelSize;
  return {
    width: widthNumberOfPixels,
    height: heightNumberOfPixels,
    pixelSize,
  };
};

export default configureGridSize;

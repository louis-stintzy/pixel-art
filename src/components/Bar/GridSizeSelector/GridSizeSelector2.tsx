import { useCallback, useEffect, useState } from 'react';
import useStore from '../../../store/store';
import ImageInput from '../../ImageUpload/ImageInput';
import { Format } from '../../../@types/aspectRatio';
import resizeImage from '../../../utils/resizeImage';

function GridSizeSelector2() {
  const aspectRatio = useStore((state) => state.aspectRatio);
  const imageUrl = useStore((state) => state.imageUrl);
  const setFormat = useStore((state) => state.setFormat);
  const setGridSize = useStore((state) => state.setGridSize);
  const setImageUrl = useStore((state) => state.setImageUrl);

  const [selectedFormat, setSelectedFormat] = useState<Format>(
    aspectRatio.formats[0]
  );
  const [selectedPixelSize, setSelectedPixelSize] = useState<number>(
    selectedFormat.pixelSize[2]
  );

  const configureGridSize = (format: Format, pixelSize: number) => {
    const widthNumberOfPixels = format.width / pixelSize;
    const heightNumberOfPixels = format.height / pixelSize;
    return {
      width: widthNumberOfPixels,
      height: heightNumberOfPixels,
      pixelSize,
    };
  };

  const updateImageUrl = useCallback(
    async (format: Format) => {
      try {
        if (!imageUrl || !format) {
          throw new Error('File Url or format is null');
        }
        const resizedImageUrl = await resizeImage(imageUrl, format);
        URL.revokeObjectURL(imageUrl);
        setImageUrl(resizedImageUrl);
      } catch (error) {
        console.error('Error resizing image : ', error);
      }
    },
    [imageUrl, setImageUrl]
  );

  useEffect(() => {
    const defaultFormat = aspectRatio.formats[0];
    setSelectedFormat(defaultFormat);
    setFormat(defaultFormat);
    setSelectedPixelSize(defaultFormat.pixelSize[2]);
    setGridSize(configureGridSize(defaultFormat, defaultFormat.pixelSize[2]));
    // if (imageUrl) updateImageUrl(defaultFormat);
  }, [aspectRatio, setFormat, setGridSize, updateImageUrl]);

  const handleChangeGridSize =
    (type: 'format' | 'pixel-size') => (value: string | number) => {
      if (type === 'format') {
        const format = aspectRatio.formats.find((f) => f.display === value);
        if (format) {
          setSelectedFormat(format);
          setFormat(format);
          setSelectedPixelSize(format.pixelSize[2]);
          setGridSize(configureGridSize(format, format.pixelSize[2]));
          if (imageUrl) updateImageUrl(format);
        } else {
          console.error('Format not found');
        }
      }
      if (type === 'pixel-size') {
        setSelectedPixelSize(value as number);
        setGridSize(configureGridSize(selectedFormat, value as number));
      }
    };

  const gridSizeSelectorActionsStyle = {
    display: 'flex',
    gap: '1rem',
  };

  return (
    <div id="grid-size-selector-form">
      <div id="grid-size-selector-inputs">
        <label>
          Format:
          <select
            name="format"
            value={selectedFormat.display}
            onChange={(e) => handleChangeGridSize('format')(e.target.value)}
          >
            {aspectRatio.formats.map((format) => (
              <option key={format.display} value={format.display}>
                {format.display}
              </option>
            ))}
          </select>
        </label>
        <label>
          Pixel Size:
          <select
            name="pixel size"
            value={selectedPixelSize}
            onChange={(e) =>
              handleChangeGridSize('pixel-size')(parseInt(e.target.value, 10))
            }
          >
            {selectedFormat.pixelSize.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div id="grid-size-selector-actions" style={gridSizeSelectorActionsStyle}>
        <ImageInput />
      </div>
    </div>
  );
}

export default GridSizeSelector2;

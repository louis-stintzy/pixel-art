import { useEffect, useState } from 'react';
import useStore from '../../../store/store';
import ImageInput from '../../ImageUpload/ImageInput';
import { Format } from '../../../@types/aspectRatio';

function GridSizeSelector2() {
  const aspectRatio = useStore((state) => state.aspectRatio);
  const setGridSize = useStore((state) => state.setGridSize);

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

  useEffect(() => {
    const defaultFormat = aspectRatio.formats[0];
    setSelectedFormat(defaultFormat);
    setSelectedPixelSize(defaultFormat.pixelSize[2]);
    setGridSize(configureGridSize(defaultFormat, defaultFormat.pixelSize[2]));
  }, [aspectRatio, setGridSize]);

  const handleChangeGridSize =
    (type: 'format' | 'pixel-size') => (value: string | number) => {
      if (type === 'format') {
        const format = aspectRatio.formats.find((f) => f.display === value);
        if (format) {
          setSelectedFormat(format);
          setSelectedPixelSize(format.pixelSize[2]);
          setGridSize(configureGridSize(format, format.pixelSize[2]));
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

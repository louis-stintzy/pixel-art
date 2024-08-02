import { useState } from 'react';
import avaibleAspectRatio, {
  Orientation,
  Format,
  AspectRatio,
} from '../../../constants/aspectRatio';
import useStore from '../../../store/store';
import ImageInput from '../../ImageUpload/ImageInput';

function GridSizeSelector2() {
  const aspectRatio = useStore((state) => state.aspectRatio);
  const setGridSize = useStore((state) => state.setGridSize);

  const [selectedFormat, setSelectedFormat] = useState<Format>(
    aspectRatio.formats[0]
  );
  const [pixelSize, setPixelSize] = useState<number>(
    selectedFormat.pixelSize[2]
  );

  const handleChangeGridSize =
    (type: 'format' | 'pixel-size') => (value: string | number) => {
      if (type === 'format') {
        const format = aspectRatio.formats.find((f) => f.display === value);
        if (format) {
          setSelectedFormat(format);
          setPixelSize(format.pixelSize[2]);
          setGridSize({
            width: format.width,
            height: format.height,
            pixelSize: format.pixelSize[2],
          });
        }
      } else {
        setPixelSize(value as number);
        setGridSize({
          width: selectedFormat.width,
          height: selectedFormat.height,
          pixelSize: value as number,
        });
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
            value={pixelSize}
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

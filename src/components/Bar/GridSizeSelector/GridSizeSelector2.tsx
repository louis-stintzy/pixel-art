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
  const [selectedFormat, setSelectedFormat] = useState<Format>(
    avaibleAspectRatio[aspectRatio].formats[0]
  );
  const [pixelSize, setPixelSize] = useState(70);

  const handleChangeFormat = (value) => {
    console.log('handleChangeFormat', value);
  };

  const handleChangePixelSize = (value) => {
    console.log('handleChangePixelSize', value);
  };

  const pixelSizeInputStyle = {
    width: '50px',
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
            onChange={(e) => handleChangeFormat(e.target.value)}
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
              handleChangePixelSize(parseInt(e.target.value, 10))
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

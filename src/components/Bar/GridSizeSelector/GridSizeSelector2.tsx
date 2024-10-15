import { useCallback, useState } from 'react';
import useStore from '../../../store/store';
import ImageInput from '../../ImageUpload/ImageInput';
import { Format } from '../../../@types/aspectRatio';
import resizeImage from '../../../utils/resizeImage';
import configureGridSize from '../../../utils/configureGridSize';
import {
  useAspectRatio,
  useFormat,
  useImageUrl,
} from '../../../store/selectors/selector';

/**
 * GridSizeSelector2 component manages the grid format and pixel size.
 * It allows users to select the format and pixel size from dropdowns.
 * It updates the grid size and resizes the image accordingly.
 */

function GridSizeSelector2() {
  const aspectRatio = useAspectRatio();
  const format = useFormat();
  const imageUrl = useImageUrl();
  const setFormat = useStore((state) => state.setFormat);
  const setGridSize = useStore((state) => state.setGridSize);
  const setImageUrl = useStore((state) => state.setImageUrl);

  const [selectedPixelSize, setSelectedPixelSize] = useState<number>(
    aspectRatio.formats[0].pixelSize[2]
  );

  const updateImageUrl = useCallback(
    async (newFormat: Format) => {
      try {
        if (!imageUrl || !newFormat) {
          throw new Error('File Url or format is null');
        }
        const resizedImageUrl = await resizeImage(imageUrl, newFormat);

        URL.revokeObjectURL(imageUrl);
        setImageUrl(resizedImageUrl);
      } catch (error) {
        console.error('Error resizing image : ', error);
      }
    },
    [imageUrl, setImageUrl]
  );

  const handleChangeGridSize =
    (type: 'format' | 'pixel-size') => async (value: string | number) => {
      if (type === 'format') {
        const newFormat = aspectRatio.formats.find((f) => f.display === value);
        if (newFormat) {
          if (imageUrl) await updateImageUrl(newFormat);
          setFormat(newFormat);
          setFormat(newFormat);
          setSelectedPixelSize(newFormat.pixelSize[2]);
          setGridSize(configureGridSize(newFormat, newFormat.pixelSize[2]));
        } else {
          console.error('Format not found');
        }
      }
      if (type === 'pixel-size') {
        setSelectedPixelSize(value as number);
        setGridSize(configureGridSize(format, value as number));
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
            value={format.display}
            onChange={(e) => handleChangeGridSize('format')(e.target.value)}
          >
            {aspectRatio.formats.map((f) => (
              <option key={f.display} value={f.display}>
                {f.display}
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
            {format.pixelSize.map((size) => (
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

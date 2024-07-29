import { FormEvent, useState } from 'react';
import useStore from '../../../store/store';
import ImageInput from '../../ImageUpload/ImageInput';

function GridSizeSelector() {
  const sizeAvailable = [8, 16, 24, 32, 40, 48];
  const dimensions = ['width', 'height'];

  const setGridSize = useStore((state) => state.setGridSize);
  const [gridSizeSelection, setGridSizeSelection] = useState({
    width: 8,
    height: 8,
    pixelSize: 70,
  });

  const handleChange =
    (label: 'width' | 'height' | 'pixelSize') => (value: number) => {
      setGridSizeSelection((prev) => ({
        ...prev,
        [label]: value,
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGridSize(gridSizeSelection);
  };

  const pixelSizeInputStyle = {
    width: '50px',
  };

  const gridSizeSelectorActionsStyle = {
    display: 'flex',
    gap: '1rem',
  };

  return (
    <form id="grid-size-selector-form" onSubmit={handleSubmit}>
      <div id="grid-size-selector-inputs">
        {dimensions.map((dimension) => (
          <label key={dimension}>
            {dimension}:
            <select
              name={dimension}
              onChange={(e) =>
                handleChange(dimension as 'width' | 'height')(
                  parseInt(e.target.value, 10)
                )
              }
            >
              {sizeAvailable.map((size: number) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        ))}
        <label>
          Pixel Size:
          <input
            type="number"
            name="pixelSize"
            value={gridSizeSelection.pixelSize}
            style={pixelSizeInputStyle}
            onChange={(e) =>
              handleChange('pixelSize')(parseInt(e.target.value, 10))
            }
          />
        </label>
      </div>
      <div id="grid-size-selector-actions" style={gridSizeSelectorActionsStyle}>
        <button type="submit">Set Grid Size</button>
        <ImageInput aspectRatio={4 / 3} />
      </div>
    </form>
  );
}

export default GridSizeSelector;

import { FormEvent, useState } from 'react';
import useStore from '../../store/store';

function GridSizeSelector() {
  const sizeAvailable = [8, 16, 24, 32, 40, 48];
  const dimensions = ['width', 'height'];

  const setGridSize = useStore((state) => state.setGridSize);
  const [gridSizeSelection, setGridSizeSelection] = useState({
    width: 8,
    height: 8,
    pixelSize: 30,
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
  return (
    <form onSubmit={handleSubmit}>
      {dimensions.map((dimension) => (
        <label key={dimension}>
          {dimension}:
          <select
            name={dimension}
            value={
              dimension === 'width'
                ? gridSizeSelection.width
                : gridSizeSelection.height
            }
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
          onChange={(e) =>
            handleChange('pixelSize')(parseInt(e.target.value, 10))
          }
        />
      </label>
      <button type="submit">Set Grid Size</button>
    </form>
  );
}

export default GridSizeSelector;

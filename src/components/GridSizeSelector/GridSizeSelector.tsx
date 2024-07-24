import { FormEvent, useState } from 'react';

interface GridSizeSelectorProps {
  setGridSize: (gridSize: { width: number; height: number }) => void;
}

function GridSizeSelector({ setGridSize }: GridSizeSelectorProps) {
  const sizeAvailable = [8, 16, 32, 64];
  const dimensions = ['width', 'height'];
  const [gridSizeSelection, setGridSizeSelection] = useState({
    width: 8,
    height: 8,
  });

  const handleChange = (label: 'width' | 'height') => (value: number) => {
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
      <button type="submit">Set Grid Size</button>
    </form>
  );
}

export default GridSizeSelector;

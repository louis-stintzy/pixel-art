import colorPalettes, { PaletteName } from '../../../constants/colors';
import useStore from '../../../store/store';

function ColorPaletteSelector() {
  const selectedPalette = useStore((state) => state.selectedPalette);
  const setSelectedPalette = useStore((state) => state.setSelectedPalette);

  const handleChange = (paletteName: PaletteName) => {
    setSelectedPalette(paletteName);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Color Palette:
        <select
          name="colorPalette"
          value={selectedPalette.name}
          onChange={(e) => handleChange(e.target.value as PaletteName)}
        >
          {Object.keys(colorPalettes).map((paletteName) => (
            <option key={paletteName} value={paletteName}>
              {paletteName}
            </option>
          ))}
        </select>
      </label>
    </form>
  );
}

export default ColorPaletteSelector;

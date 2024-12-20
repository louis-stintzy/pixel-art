import { PaletteNameCamelCase } from '../../../@types/colorPalette';
import colorPalettes from '../../../constants/colors';
import { useSelectedPalette } from '../../../store/selectors/selector';
import { setSelectedPalette } from '../../../store/actions/storeActions';

function ColorPaletteSelector() {
  const selectedPalette = useSelectedPalette();

  const handleChange = (paletteName: PaletteNameCamelCase) => {
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
          onChange={(e) => handleChange(e.target.value as PaletteNameCamelCase)}
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

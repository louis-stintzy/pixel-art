import colorPalettes from '../../constants/colors';
import useStore from '../../store/store';

function ColorPaletteSelector() {
  const selectedPalette = useStore((state) => state.selectedPalette);
  const setSelectedPalette = useStore((state) => state.setSelectedPalette);
  const setSelectedColor = useStore((state) => state.setSelectedColor);

  const handleChange = (paletteName: string) => {
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
          // value={selectedPalette}
          onChange={(e) => handleChange(e.target.value)}
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

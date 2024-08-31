import { Palette } from '../../../../@types/colorPalette';

interface SelectPalettesToDisplayProps {
  paletteAvaibleToDisplay: Palette[];
  paletteToDisplay: Palette[];
  setPaletteToDisplay: (palette: Palette[]) => void;
}

function SelectPalettesToDisplay({
  paletteAvaibleToDisplay,
  paletteToDisplay,
  setPaletteToDisplay,
}: SelectPalettesToDisplayProps) {
  return (
    <fieldset>
      <legend>Select the palettes to display :</legend>
      {paletteAvaibleToDisplay.map((palette) => (
        <label key={palette.name}>
          <input
            type="checkbox"
            id={palette.name}
            name={palette.name}
            checked={paletteToDisplay.some((p) => p.name === palette.name)}
            onChange={(e) => {
              if (e.target.checked) {
                setPaletteToDisplay([...paletteToDisplay, palette]);
              } else {
                setPaletteToDisplay(
                  paletteToDisplay.filter((p) => p.name !== palette.name)
                );
              }
            }}
          />
          {palette.name}
        </label>
      ))}
      {/* <div>
        <h2>Checkbox 5</h2>
        <p>
          <input type="checkbox" className="demo5" id="demo5" />
          <label htmlFor="demo5" />
        </p>
      </div> */}
    </fieldset>
  );
}

export default SelectPalettesToDisplay;

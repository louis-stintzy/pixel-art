import { useEffect, useMemo, useState } from 'react';
import { Color } from '../../../@types/colorPalette';
import useStore from '../../../store/store';
import ColorPaletteColors from './ColorPaletteColors/ColorPaletteColors';
import SelectPalettesToDisplay from './SelectPalettesToDisplay/SelectPalettesToDisplay';

function ColorPicker() {
  const selectedPalette = useStore((state) => state.selectedPalette);
  const recentColors = useStore((state) => state.recentColors);
  const favoriteColors = useStore((state) => state.favoriteColors);

  const paletteAvaibleToDisplay = useMemo(
    () => [
      {
        name: 'Selected Palette',
        colors: selectedPalette.colors,
      },
      { name: 'Recent Colors', colors: recentColors },
      {
        name: 'Favorite Colors',
        colors: favoriteColors,
      },
    ],
    [selectedPalette.colors, recentColors, favoriteColors]
  );

  const [paletteToDisplay, setPaletteToDisplay] = useState([
    paletteAvaibleToDisplay[0],
  ]);

  useEffect(() => {
    setPaletteToDisplay((current) =>
      current.map((palette) => {
        if (palette.name === 'Selected Palette') {
          return paletteAvaibleToDisplay[0];
        }
        if (palette.name === 'Recent Colors') {
          return paletteAvaibleToDisplay[1];
        }
        if (palette.name === 'Favorite Colors') {
          return paletteAvaibleToDisplay[2];
        }
        return palette;
      })
    );
  }, [selectedPalette, recentColors, favoriteColors, paletteAvaibleToDisplay]);

  let touchStart: number;

  const handleTouchStart = () => {
    touchStart = Date.now();
  };

  const handleTouchEnd = (color: Color) => {
    if (Date.now() - touchStart > 3000) {
      console.log('ouvrir menu contextuel');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, color: Color) => {
    e.preventDefault();
    console.log('ouvrir menu contextuel');
    // const { addFavoriteColor } = useStore.getState();
    // addFavoriteColor(color);
  };

  const handleClick = (color: Color) => {
    const { setSelectedColor, addRecentColor } = useStore.getState();
    setSelectedColor(color);
    addRecentColor(color);
  };

  return (
    <div>
      <SelectPalettesToDisplay
        paletteAvaibleToDisplay={paletteAvaibleToDisplay}
        paletteToDisplay={paletteToDisplay}
        setPaletteToDisplay={setPaletteToDisplay}
      />

      {paletteToDisplay.map((palette) => (
        <ColorPaletteColors
          key={palette.name}
          palette={palette}
          onColorClick={handleClick}
          onColorTouchStart={handleTouchStart}
          onColorTouchEnd={handleTouchEnd}
          onColorContextMenu={handleContextMenu}
        />
      ))}
    </div>
  );
}

export default ColorPicker;

import { useState } from 'react';
import { Color } from '../../../../@types/colorPalette';
import useStore from '../../../../store/store';
import ColorContextMenu from '../ColorContextMenu/ColorContextMenu';

interface ColorPaletteColorsProps {
  palette: { name: string; colors: Color[] };
  // onColorClick: (color: Color) => void;
  // onColorTouchStart: () => void;
  // onColorTouchEnd: (e: React.TouchEvent, color: Color) => void;
  // onColorContextMenu: (e: React.MouseEvent, color: Color) => void;
}

function ColorPaletteColors({
  palette,
}: // onColorClick,
// onColorTouchStart,
// onColorTouchEnd,
// onColorContextMenu,
ColorPaletteColorsProps) {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    color: Color;
  } | null>(null);

  let touchStart: number;

  const handleTouchStart = () => {
    touchStart = Date.now();
  };

  const handleTouchEnd = (e: React.TouchEvent, color: Color) => {
    if (Date.now() - touchStart > 3000) {
      e.preventDefault();
      setContextMenu({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        color,
      });
      console.log('ouvrir menu contextuel');
    }
  };

  const handleContextMenu = (e: React.MouseEvent, color: Color) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      color,
    });
    console.log('ouvrir menu contextuel');
    // const { addFavoriteColor } = useStore.getState();
    // addFavoriteColor(color);
  };

  const handleClick = (color: Color) => {
    const { setSelectedColor, addRecentColor } = useStore.getState();
    setSelectedColor(color);
    addRecentColor(color);
  };

  const colorKeys: string[] = [];
  for (let i = 0; i < 20; i += 1) {
    colorKeys.push(`color${i}`);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      {palette.colors.map((color, index) => (
        <button
          key={`${colorKeys[index]}-${palette.name}-${color.code}`}
          type="button"
          style={{
            backgroundColor: color.code,
            width: '2rem',
            height: '2rem',
            borderRadius: '40%',
            cursor: 'pointer',
          }}
          title={color.name}
          onClick={() => handleClick(color)}
          onTouchStart={() => handleTouchStart()}
          onTouchEnd={(e) => handleTouchEnd(e, color)}
          onContextMenu={(e) => handleContextMenu(e, color)}
          aria-label={`Select ${color.name} color`}
        />
      ))}

      {contextMenu && <ColorContextMenu {...contextMenu} />}
    </div>
  );
}

export default ColorPaletteColors;

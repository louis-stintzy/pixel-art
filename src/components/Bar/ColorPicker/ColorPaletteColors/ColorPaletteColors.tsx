import { useState } from 'react';
import { Color } from '../../../../@types/colorPalette';
import useStore from '../../../../store/store';
import ColorContextMenu from '../ColorContextMenu/ColorContextMenu';
import ColorButton from '../ColorButton/ColorButton';

interface ColorPaletteColorsProps {
  palette: { name: string; colors: Color[] };
}

function ColorPaletteColors({ palette }: ColorPaletteColorsProps) {
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
    }
  };

  const handleContextMenu = (e: React.MouseEvent, color: Color) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      color,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const colorKeys: string[] = [];
  for (let i = 0; i < 20; i += 1) {
    colorKeys.push(`color${i}`);
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      {palette.colors.map((color, index) => (
        <ColorButton
          key={`${colorKeys[index]}-${palette.name}-${color.code}`}
          color={color}
          paletteName={palette.name}
          index={index}
          onTouchStart={handleTouchStart}
          onTouchEndd={handleTouchEnd}
          onContextMenu={handleContextMenu}
        />
      ))}

      {contextMenu && (
        <ColorContextMenu {...contextMenu} onClose={closeContextMenu} />
      )}
    </div>
  );
}

export default ColorPaletteColors;

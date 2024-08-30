import { Color } from '../../../../@types/colorPalette';

interface ColorPaletteColorsProps {
  palette: { name: string; colors: Color[] };
  onColorClick: (color: Color) => void;
  onColorTouchStart: () => void;
  onColorTouchEnd: (color: Color) => void;
  onColorContextMenu: (e: React.MouseEvent, color: Color) => void;
}

function ColorPaletteColors({
  palette,
  onColorClick,
  onColorTouchStart,
  onColorTouchEnd,
  onColorContextMenu,
}: ColorPaletteColorsProps) {
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
          onClick={() => onColorClick(color)}
          onTouchStart={() => onColorTouchStart()}
          onTouchEnd={() => onColorTouchEnd(color)}
          onContextMenu={(e) => onColorContextMenu(e, color)}
          aria-label={`Select ${color.name} color`}
        />
      ))}
    </div>
  );
}

export default ColorPaletteColors;

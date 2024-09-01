import { Color } from '../../../../@types/colorPalette';
import useStore from '../../../../store/store';

interface ColorButtonProps {
  color: Color;
  paletteName: string;
  index: number;
  onTouchStart: () => void;
  onTouchEndd: (e: React.TouchEvent, color: Color) => void;
  onContextMenu: (e: React.MouseEvent, color: Color) => void;
}

function ColorButton({
  color,
  paletteName,
  index,
  onTouchStart,
  onTouchEndd,
  onContextMenu,
}: ColorButtonProps) {
  const handleClick = (clickedColor: Color) => {
    const { setSelectedColor, addRecentColor } = useStore.getState();
    setSelectedColor(clickedColor);
    addRecentColor(clickedColor);
  };

  const colorButtonStyle = {
    backgroundColor: color.code,
    width: '2rem',
    height: '2rem',
    borderRadius: '40%',
    cursor: 'pointer',
  };
  return (
    <button
      id={`color${index}-${paletteName}-${color.code}`}
      type="button"
      style={colorButtonStyle}
      title={color.name}
      onClick={() => handleClick(color)}
      onTouchStart={onTouchStart}
      onTouchEnd={(e) => onTouchEndd(e, color)}
      onContextMenu={(e) => onContextMenu(e, color)}
      aria-label={`Select ${color.name} color`}
    />
  );
}

export default ColorButton;

import { Color } from '../../../../@types/colorPalette';
import {
  addRecentColor,
  setSelectedColor,
} from '../../../../store/actions/storeActions';

interface ColorButtonProps {
  color: Color;
  paletteName: string;
  index: number;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEndd: (e: React.TouchEvent, color: Color) => void;
  onContextMenu: (e: React.MouseEvent, color: Color) => void;
  onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  button?: HTMLButtonElement | null;
  translateX?: number | null;
  translateY?: number | null;
}

function ColorButton({
  color,
  paletteName,
  index,
  onTouchStart,
  onTouchEndd,
  onContextMenu,
  onMouseDown,
  onMouseUp,
  button,
  translateX,
  translateY,
}: ColorButtonProps) {
  const handleClick = (clickedColor: Color) => {
    setSelectedColor(clickedColor);
    addRecentColor(clickedColor);
  };

  const colorButtonStyle = {
    backgroundColor: color.code,
    width: '2rem',
    height: '2rem',
    borderRadius: '40%',
    cursor: 'pointer',
    transform:
      button && button.id === `color${index}-${paletteName}-${color.code}`
        ? `translate(${translateX}px, ${translateY}px)`
        : 'none',
    transition: 'transform 0.1s ease-out',
  };

  return (
    <button
      id={`color${index}-${paletteName}-${color.code}`}
      type="button"
      style={colorButtonStyle}
      title={color.name}
      onClick={() => handleClick(color)}
      onTouchStart={(e) => onTouchStart(e)}
      onTouchEnd={(e) => onTouchEndd(e, color)}
      onContextMenu={(e) => onContextMenu(e, color)}
      onMouseDown={(e) => onMouseDown(e)}
      onMouseUp={(e) => onMouseUp(e)}
      aria-label={`Select ${color.name} color`}
    />
  );
}

ColorButton.defaultProps = {
  button: null,
  translateX: null,
  translateY: null,
};

export default ColorButton;

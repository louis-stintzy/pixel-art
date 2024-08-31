import { Color } from '../../../../@types/colorPalette';

interface ContextMenuProps {
  x: number;
  y: number;
  color: Color;
}

function ColorContextMenu({ x, y, color }: ContextMenuProps) {
  const contextMenuContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: y,
    left: x,
    width: '10rem',
    height: '2rem',
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '0.5rem',
    border: '1px solid #ccc',
    boxShadow: '0 0 5px 0 #000',
    zIndex: 1000,
  };
  return (
    <div id="contextMenuContainer" style={contextMenuContainerStyle}>
      ContextMenu : {color.name}
    </div>
  );
}

export default ColorContextMenu;

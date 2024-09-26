import { useEffect, useRef } from 'react';
import { Color } from '../../../../@types/colorPalette';
import useStore from '../../../../store/store';
import { useGridColor, useFavoriteColors } from '../../../../store/selector';

interface ContextMenuProps {
  x: number;
  y: number;
  color: Color;
  onClose: () => void;
}

function ColorContextMenu({ x, y, color, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const gridColor = useGridColor();
  const favoriteColors = useFavoriteColors();
  const validFavoriteColors = favoriteColors.filter(
    (c) => c.code !== gridColor.background
  );
  const isFavorite = favoriteColors.some((c) => c.code === color.code);

  const handleClick = () => {
    const { addFavoriteColor, removeFavoriteColor } = useStore.getState();
    if (!isFavorite && validFavoriteColors.length >= 20) {
      onClose();
    } else if (isFavorite) {
      removeFavoriteColor(color);
    } else {
      addFavoriteColor(color);
    }
    onClose();
  };

  // le useEffect est utilisé pour fermer le menu contextuel lorsqu'on clique en dehors
  // il permet e placer l'écouteur d'événement sur le document après que le composant ait été monté
  // et de le retirer après que le composant ait été démonté
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const menuWidth = 200;
  const appContainerMargin = 17; // 1rem + border
  const adjustX =
    x + menuWidth > window.innerWidth - appContainerMargin
      ? window.innerWidth - appContainerMargin - menuWidth
      : x;

  const contextMenuContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: y,
    left: adjustX,
    width: menuWidth,
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '0.5rem',
    border: '1px solid #ccc',
    boxShadow: '0 0 5px 0 #000',
    zIndex: 1000,
  };

  const removeOrAddButtonStyle: React.CSSProperties = {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  let buttonText = '';
  if (!isFavorite && validFavoriteColors.length >= 20) {
    buttonText = 'Favorite colors are full';
  } else if (isFavorite) {
    buttonText = 'Remove from favorites';
  } else {
    buttonText = 'Add to favorites';
  }

  return (
    <div
      id="contextMenuContainer"
      ref={menuRef}
      style={contextMenuContainerStyle}
    >
      <button
        id="removeOrAddButton"
        type="button"
        onClick={handleClick}
        style={removeOrAddButtonStyle}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default ColorContextMenu;

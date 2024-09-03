import { useCallback, useEffect, useRef, useState } from 'react';
import { Color } from '../../../../@types/colorPalette';
import ColorContextMenu from '../ColorContextMenu/ColorContextMenu';
import ColorButton from '../ColorButton/ColorButton';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';
import useStore from '../../../../store/store';

interface ColorPaletteColorsProps {
  palette: { name: string; colors: Color[] };
}

function ColorPaletteColors({ palette }: ColorPaletteColorsProps) {
  const favoriteColors = useStore((state) => state.favoriteColors);
  const lastRanMouseRef = useRef<number | undefined>(undefined);
  const lastFuncMouseRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastRanTouchRef = useRef<number | undefined>(undefined);
  const lastFuncTouchRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const paletteRef = useRef<HTMLDivElement | null>(null);
  const { isDragging, position, resetPosition } = useDragAndDrop(paletteRef);
  const [draggedColorButton, setDraggedColorButton] = useState<{
    button: HTMLButtonElement;
    // index: number;
    translateX: number;
    translateY: number;
  } | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    color: Color;
  } | null>(null);

  // --------------------------------- CONTEXT MENU ---------------------------------

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

  // -------------------------------- DRAG AND DROP --------------------------------

  const handleMouseDragStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedColorButton = event.target as HTMLButtonElement;
    if (selectedColorButton)
      setDraggedColorButton({
        button: selectedColorButton,
        translateX: 0,
        translateY: 0,
      });
  };

  const handleMouseDragInProgress = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const deltaX = event.clientX - position.x;
      const deltaY = event.clientY - position.y;
      if (draggedColorButton) {
        setDraggedColorButton({
          button: draggedColorButton.button,
          translateX: position.x,
          translateY: position.y,
        });
      }
    },
    [draggedColorButton, isDragging, position.x, position.y]
  );

  const handleMouseDragStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { setFavoriteColors } = useStore.getState();
    // const buttonToBeInterchanged = event.target as HTMLButtonElement;
    const buttonToBeInterchanged = document.elementFromPoint(
      event.clientX,
      event.clientY
    ) as HTMLButtonElement;
    if (!draggedColorButton || !buttonToBeInterchanged) return;
    console.log('buttonToBeInterchanged', buttonToBeInterchanged);
    console.log('draggedColorButton', draggedColorButton);
    const draggedColorIndex = parseInt(
      draggedColorButton.button.id.split('-')[0].replace('color', ''),
      10
    );
    const colorIndexToBeInterchanged = parseInt(
      buttonToBeInterchanged.id.split('-')[0].replace('color', ''),
      10
    );
    const updatedFavoriteColors = [...favoriteColors]; // todo: en veillant initialement à ce qu'on opère le drag and drop que sur favorite colors
    // voir https://www.aality.fr/blog/javascript/inverser-deux-valeurs-array-javascript/
    [
      updatedFavoriteColors[draggedColorIndex],
      updatedFavoriteColors[colorIndexToBeInterchanged],
    ] = [
      updatedFavoriteColors[colorIndexToBeInterchanged],
      updatedFavoriteColors[draggedColorIndex],
    ];
    setFavoriteColors(updatedFavoriteColors);
    setDraggedColorButton(null);
    resetPosition();
  };

  // --------------------------------- RETURN ---------------------------------

  const colorKeys: string[] = [];
  for (let i = 0; i < 20; i += 1) {
    colorKeys.push(`color${i}`);
  }
  return (
    <div
      ref={paletteRef}
      role="row"
      tabIndex={0}
      style={{ display: 'flex', justifyContent: 'flex-start' }}
      onMouseMove={handleMouseDragInProgress}
    >
      {palette.colors.map((color, index) => (
        <ColorButton
          key={`${colorKeys[index]}-${palette.name}-${color.code}`}
          color={color}
          paletteName={palette.name}
          index={index}
          onTouchStart={handleTouchStart}
          onTouchEndd={handleTouchEnd}
          onContextMenu={handleContextMenu}
          onMouseDown={handleMouseDragStart}
          onMouseUp={handleMouseDragStop}
          {...draggedColorButton}
        />
      ))}

      {contextMenu && (
        <ColorContextMenu {...contextMenu} onClose={closeContextMenu} />
      )}
    </div>
  );
}

export default ColorPaletteColors;

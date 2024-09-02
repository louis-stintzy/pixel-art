import { useCallback, useRef, useState } from 'react';
import { Color } from '../../../../@types/colorPalette';
import ColorContextMenu from '../ColorContextMenu/ColorContextMenu';
import ColorButton from '../ColorButton/ColorButton';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';

interface ColorPaletteColorsProps {
  palette: { name: string; colors: Color[] };
}

function ColorPaletteColors({ palette }: ColorPaletteColorsProps) {
  const lastRanMouseRef = useRef<number | undefined>(undefined);
  const lastFuncMouseRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastRanTouchRef = useRef<number | undefined>(undefined);
  const lastFuncTouchRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const paletteRef = useRef<HTMLDivElement | null>(null);
  const { isDragging, position } = useDragAndDrop(paletteRef);
  const [draggedColorButton, setDraggedColorButton] = useState<{
    button: HTMLButtonElement;
    translateX: number;
    translateY: number;
  } | null>(null);
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

  const handleMouseDragStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedColorButton = event.target as HTMLButtonElement;
    if (selectedColorButton)
      setDraggedColorButton({
        button: selectedColorButton,
        translateX: 0,
        translateY: 0,
      });
    console.log(selectedColorButton);
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

  const handleMouseDragStop = () => {
    setDraggedColorButton(null);
  };
  // const handleMouseDragStart = useCallback(
  //   (event: React.MouseEvent<HTMLDivElement>) => {
  //     if (!isDragging) return;
  //     const selectedColorButton = event.target as HTMLDivElement;
  //     if (selectedColorButton) setDraggedColorButton(selectedColorButton);
  //     console.log(selectedColorButton);
  //   },
  //   [isDragging]
  // );

  // const COLOR_BUTTON_THROTTLE = 32;

  // const handleMouseMove = useCallback(
  //   (event: React.MouseEvent<HTMLDivElement>) => {
  //     if (!isDragging) return;
  //     requestAnimationFrame(() => {
  //       if (
  //         !lastRanMouseRef.current ||
  //         Date.now() - lastRanMouseRef.current >= COLOR_BUTTON_THROTTLE
  //       ) {
  //         lastRanMouseRef.current = Date.now();
  //         const pixel = event.target as HTMLDivElement;
  //         if (pixel) applyToolOnPixel(pixel);
  //       } else {
  //         if (lastFuncMouseRef.current !== undefined)
  //           clearTimeout(lastFuncMouseRef.current);
  //         lastFuncMouseRef.current = setTimeout(() => {
  //           lastRanMouseRef.current = Date.now();
  //           const pixel = event.target as HTMLDivElement;
  //           if (pixel) applyToolOnPixel(pixel);
  //         }, PIXEL_COLOR_THROTTLE - (Date.now() - lastRanMouseRef.current));
  //       }
  //     });
  //   },
  //   [isDragging]
  // );

  // const handleTouchMove = useCallback(
  //   (e: React.TouchEvent<HTMLDivElement>) => {
  //     if (!isDragging) return;
  //   },
  //   [isDragging]
  // );

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

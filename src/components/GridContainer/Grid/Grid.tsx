import { useCallback, useRef } from 'react';
import useStore from '../../../store/store';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
import coloring from '../../../utils/coloring';
import Pixel from '../Pixel/Pixel';

function Grid() {
  const lastRanMouseRef = useRef<number | undefined>(undefined);
  const lastFuncMouseRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastRanTouchRef = useRef<number | undefined>(undefined);
  const lastFuncTouchRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const gridRef = useRef<HTMLDivElement | null>(null);
  const gridSize = useStore((state) => state.gridSize);
  const isReadyToColor = useStore((state) => state.isReadyToColor);
  const { isDragging: isColoring } = useDragAndDrop(gridRef, isReadyToColor);

  const PIXEL_COLOR_THROTTLE = 32;

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isColoring) return;
      requestAnimationFrame(() => {
        if (
          !lastRanMouseRef.current ||
          Date.now() - lastRanMouseRef.current >= PIXEL_COLOR_THROTTLE
        ) {
          lastRanMouseRef.current = Date.now();
          const pixel = event.target as HTMLDivElement;
          if (pixel) coloring([pixel.id]);
        } else {
          if (lastFuncMouseRef.current !== undefined)
            clearTimeout(lastFuncMouseRef.current);
          lastFuncMouseRef.current = setTimeout(() => {
            lastRanMouseRef.current = Date.now();
            const pixel = event.target as HTMLDivElement;
            if (pixel) coloring([pixel.id]);
          }, PIXEL_COLOR_THROTTLE - (Date.now() - lastRanMouseRef.current));
        }
      });
    },
    [isColoring]
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!isColoring) return;
      requestAnimationFrame(() => {
        if (
          !lastRanTouchRef.current ||
          Date.now() - lastRanTouchRef.current >= PIXEL_COLOR_THROTTLE
        ) {
          lastRanTouchRef.current = Date.now();
          const pixel = document.elementFromPoint(
            event.touches[0].clientX,
            event.touches[0].clientY
          ) as HTMLDivElement;
          if (pixel) coloring([pixel.id]);
        } else {
          if (lastFuncTouchRef.current !== undefined)
            clearTimeout(lastFuncTouchRef.current);
          lastFuncTouchRef.current = setTimeout(() => {
            lastRanTouchRef.current = Date.now();
            const pixel = document.elementFromPoint(
              event.touches[0].clientX,
              event.touches[0].clientY
            ) as HTMLDivElement;
            if (pixel) coloring([pixel.id]);
          }, PIXEL_COLOR_THROTTLE - (Date.now() - lastRanTouchRef.current));
        }
      });
    },
    [isColoring]
  );

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    position: 'absolute',
    zIndex: 1,
    gridTemplateColumns: `repeat(${gridSize.width}, ${gridSize.pixelSize}px)`,
    gridTemplateRows: `repeat(${gridSize.height}, ${gridSize.pixelSize}px)`,
  };

  return (
    <div
      id="grid"
      role="grid"
      tabIndex={0} // role et tabIndex pour pouvoir utiliser onMouseDown et onTouchStart
      ref={gridRef}
      style={gridStyle}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {Array.from({ length: gridSize.width * gridSize.height }).map(
        (_, index) => {
          const row = Math.floor(index / gridSize.width);
          const column = index % gridSize.width;
          const id = `${row}-${column}`;
          return <Pixel key={id} id={id} />;
        }
      )}
    </div>
  );
}

export default Grid;

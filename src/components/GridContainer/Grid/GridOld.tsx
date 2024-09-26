import { useCallback, useRef } from 'react';
import useStore from '../../../store/store';
import useDragAndDrop from '../../../hooks/useDragAndDropOld';
import {
  useGridSize,
  useGridColor,
  useSelectedColor,
  useIsReadyToDraw,
  useIsEraser,
  useIsBigTool,
} from '../../../store/selector';
import Pixel from '../Pixel/Pixel';
import getNeighboringPixels from '../../../utils/getNeighboringPixels';
import { coloring } from '../../../utils/coloring';

function Grid() {
  const selectedColor = useSelectedColor();
  const lastRanMouseRef = useRef<number | undefined>(undefined);
  const lastFuncMouseRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastRanTouchRef = useRef<number | undefined>(undefined);
  const lastFuncTouchRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const gridRef = useRef<HTMLDivElement | null>(null);
  const gridSize = useGridSize();
  const gridColor = useGridColor();
  const isReadyToDraw = useIsReadyToDraw();
  const isEraser = useIsEraser();
  const isBigTool = useIsBigTool();
  const { isDragging: isColoring } = useDragAndDrop(gridRef, isReadyToDraw);

  const PIXEL_COLOR_THROTTLE = 32;

  const applyToolOnPixel = useCallback(
    (pixel: HTMLDivElement) => {
      console.log('-OLD-applyToolOnPixel, date.now() : ', Date.now());
      const pixelIds = isBigTool
        ? [pixel.id, ...getNeighboringPixels(pixel.id, gridSize)]
        : [pixel.id];
      const color = isEraser ? gridColor.background : selectedColor.code;
      coloring(pixelIds, color);
    },
    [gridColor.background, gridSize, isBigTool, isEraser, selectedColor.code]
  );

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
          if (pixel) applyToolOnPixel(pixel);
        } else {
          if (lastFuncMouseRef.current !== undefined)
            clearTimeout(lastFuncMouseRef.current);
          lastFuncMouseRef.current = setTimeout(() => {
            lastRanMouseRef.current = Date.now();
            const pixel = event.target as HTMLDivElement;
            if (pixel) applyToolOnPixel(pixel);
          }, PIXEL_COLOR_THROTTLE - (Date.now() - lastRanMouseRef.current));
        }
      });
    },
    [applyToolOnPixel, isColoring]
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
          if (pixel) applyToolOnPixel(pixel);
        } else {
          if (lastFuncTouchRef.current !== undefined)
            clearTimeout(lastFuncTouchRef.current);
          lastFuncTouchRef.current = setTimeout(() => {
            lastRanTouchRef.current = Date.now();
            const pixel = document.elementFromPoint(
              event.touches[0].clientX,
              event.touches[0].clientY
            ) as HTMLDivElement;
            if (pixel) applyToolOnPixel(pixel);
          }, PIXEL_COLOR_THROTTLE - (Date.now() - lastRanTouchRef.current));
        }
      });
    },
    [applyToolOnPixel, isColoring]
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

import { FixedSizeGrid } from 'react-window';
import { useCallback, useRef } from 'react';
import Pixel from '../Pixel/Pixel';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
import useStore from '../../../store/store';

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
}

function Cell({ columnIndex, rowIndex, style }: CellProps) {
  const id = `${rowIndex}-${columnIndex}`;
  return (
    <div style={style}>
      <Pixel id={id} />
    </div>
  );
}

function Grid2() {
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
  const format = useStore((state) => state.format);
  const isReadyToDraw = useStore((state) => state.isReadyToDraw);
  const { isDragging: isColoring } = useDragAndDrop(gridRef, isReadyToDraw);

  const PIXEL_COLOR_THROTTLE = 32;

  const colorPixelWithSelectedColor = (id: string) => {
    const color = useStore.getState().selectedColor;
    useStore.getState().setPixelColors(id, color);
  };

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
          if (pixel) colorPixelWithSelectedColor(pixel.id);
        } else {
          if (lastFuncMouseRef.current !== undefined)
            clearTimeout(lastFuncMouseRef.current);
          lastFuncMouseRef.current = setTimeout(() => {
            lastRanMouseRef.current = Date.now();
            const pixel = event.target as HTMLDivElement;
            if (pixel) colorPixelWithSelectedColor(pixel.id);
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
          if (pixel) colorPixelWithSelectedColor(pixel.id);
        } else {
          if (lastFuncTouchRef.current !== undefined)
            clearTimeout(lastFuncTouchRef.current);
          lastFuncTouchRef.current = setTimeout(() => {
            lastRanTouchRef.current = Date.now();
            const pixel = document.elementFromPoint(
              event.touches[0].clientX,
              event.touches[0].clientY
            ) as HTMLDivElement;
            if (pixel) colorPixelWithSelectedColor(pixel.id);
          }, PIXEL_COLOR_THROTTLE - (Date.now() - lastRanTouchRef.current));
        }
      });
    },
    [isColoring]
  );

  const gridStyle: React.CSSProperties = {
    // display: 'grid',
    position: 'absolute',
    zIndex: 1,
    // gridTemplateColumns: `repeat(${gridSize.width}, ${gridSize.pixelSize}px)`,
    // gridTemplateRows: `repeat(${gridSize.height}, ${gridSize.pixelSize}px)`,
    width: '400px',
    height: '400px',
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
      <FixedSizeGrid
        columnCount={gridSize.width}
        rowCount={gridSize.height}
        columnWidth={gridSize.pixelSize}
        rowHeight={gridSize.pixelSize}
        height={400}
        width={400}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  );
}

export default Grid2;

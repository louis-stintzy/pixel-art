import { useCallback, useRef } from 'react';
import useStore from '../../../store/store';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
import { coloring } from '../../../utils/coloring';
import Pixel from '../Pixel/Pixel';
import getNeighboringPixels from '../../../utils/getNeighboringPixels';
import gridColor from '../../../constants/gridColor';
import throttledExecution from '../../../utils/throttledExecution';

function Grid() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const gridSize = useStore((state) => state.gridSize);
  const isReadyToDraw = useStore((state) => state.isReadyToDraw);
  const { isDragging: isColoring } = useDragAndDrop(gridRef, isReadyToDraw);

  const applyToolOnPixel = (pixel: HTMLDivElement) => {
    const { isBigTool, isEraser } = useStore.getState();
    const pixelIds = isBigTool
      ? [pixel.id, ...getNeighboringPixels(pixel.id)]
      : [pixel.id];
    const color = isEraser ? gridColor.background : undefined;
    coloring(pixelIds, color);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      throttledExecution({
        cbShouldNotRun: !isColoring,
        cb: {
          function: {
            forMouseEvent: (e: React.MouseEvent) => {
              const pixel = e.target as HTMLDivElement;
              if (pixel) applyToolOnPixel(pixel);
            },
          },
          args: {
            mouseEvent: event,
          },
        },
      });
    },
    [isColoring]
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      throttledExecution({
        cbShouldNotRun: !isColoring,
        cb: {
          function: {
            forTouchEvent: (e: React.TouchEvent) => {
              const pixel = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
              ) as HTMLDivElement;
              if (pixel) applyToolOnPixel(pixel);
            },
          },
          args: {
            touchEvent: event,
          },
        },
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

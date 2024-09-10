import { useCallback, useEffect, useRef } from 'react';
import useStore from '../../../store/store';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
import useThrottledExecution from '../../../hooks/useThrottledExecution';
import useActionFollowingMove from '../../../hooks/useActionFollowingMove';
import { coloring } from '../../../utils/coloring';
import Pixel from '../Pixel/Pixel';
import getNeighboringPixels from '../../../utils/getNeighboringPixels';
import gridColor from '../../../constants/gridColor';

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

  const token = useRef<string>(
    // `ColorGrid-T${Date.now().toString()}-R${Math.floor(Math.random() * 1000)}`
    'Plus besoin de token ColorGrid'
  );
  const lastRanRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const throttleLimit = 1000;
  const cbShouldNotRun = !isColoring;

  const executeMouseLogic = useCallback((e: React.MouseEvent | MouseEvent) => {
    console.log(
      'executeMouseLogic dans Grid pour coloriage, date.now() : ',
      Date.now()
    );
    const pixel = e.target as HTMLDivElement;
    if (pixel) applyToolOnPixel(pixel);
  }, []);

  const executeTouchLogic = useCallback((e: React.TouchEvent | TouchEvent) => {
    const pixel = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    ) as HTMLDivElement;
    if (pixel) applyToolOnPixel(pixel);
  }, []);

  const handleDragProgress = useActionFollowingMove(
    token.current,
    lastRanRef,
    timeoutRef,
    throttleLimit,
    cbShouldNotRun,
    executeMouseLogic,
    executeTouchLogic
  );
  // const { throttledExecution } = useThrottledExecution();

  // const handleMouseTouchMove = useCallback(
  //   (
  //     event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  //   ) => {
  //     throttledExecution({
  //       token: token.current,
  //       throttleLimit,
  //       cbShouldNotRun,
  //       cb: {
  //         function: {
  //           forMouseEvent:
  //             event.type === 'mousemove'
  //               ? (e: React.MouseEvent | MouseEvent) => {
  //                   executeMouseLogic(e);
  //                 }
  //               : undefined,
  //           forTouchEvent:
  //             event.type === 'touchmove'
  //               ? (e: React.TouchEvent | TouchEvent) => {
  //                   executeTouchLogic(e);
  //                 }
  //               : undefined,
  //         },
  //         args: {
  //           mouseEvent:
  //             event.type === 'mousemove'
  //               ? (event as React.MouseEvent | MouseEvent)
  //               : undefined,
  //           touchEvent:
  //             event.type === 'touchmove'
  //               ? (event as React.TouchEvent | TouchEvent)
  //               : undefined,
  //         },
  //       },
  //     });
  //   },
  //   [cbShouldNotRun, executeMouseLogic, executeTouchLogic, throttledExecution]
  // );

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
      onMouseMove={handleDragProgress}
      onTouchMove={handleDragProgress}
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

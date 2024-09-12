import { useCallback, useRef } from 'react';
import useStore from '../../../store/store';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
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

  // ----- handleDragProgress

  // const token = useRef<string>(
  //   `ColorGrid-T${Date.now().toString()}-R${Math.floor(Math.random() * 1000)}`
  // ).current;

  const lastRanRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const throttleLimit = 32;
  const cbShouldNotRun = !isColoring;

  const applyToolOnPixel = (pixel: HTMLDivElement) => {
    const { isBigTool, isEraser } = useStore.getState();
    const pixelIds = isBigTool
      ? [pixel.id, ...getNeighboringPixels(pixel.id)]
      : [pixel.id];
    const color = isEraser ? gridColor.background : undefined;
    coloring(pixelIds, color);
  };

  const executeMouseLogic = useCallback((e: React.MouseEvent | MouseEvent) => {
    // console.log(
    //   'executeMouseLogic dans Grid pour coloriage, date.now() : ',
    //   Date.now()
    // );
    const pixel = e.target as HTMLDivElement;
    if (pixel) applyToolOnPixel(pixel);
  }, []);

  const executeTouchLogic = useCallback((e: React.TouchEvent | TouchEvent) => {
    // console.log(
    //   'executeTouchLogic dans Grid pour coloriage, date.now() : ',
    //   Date.now()
    // );
    const pixel = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    ) as HTMLDivElement;
    if (pixel) applyToolOnPixel(pixel);
  }, []);

  const handleDragProgress = useActionFollowingMove(
    // token
    lastRanRef,
    timeoutRef,
    throttleLimit,
    cbShouldNotRun,
    executeMouseLogic,
    executeTouchLogic
  );

  // Je n'ai pas réussi à faire fonctionner le cleanup des timeouts restants (le dernier timeout s'il n'est pas clear via useThrottledExecution). Le throttle est de 32ms, "peu de risque" que le timeout ne soit pas clear
  // useEffect(() => {
  //   return () => {
  //     clearTimeouts();
  //   };
  // }, [clearTimeouts]);

  // ----------

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

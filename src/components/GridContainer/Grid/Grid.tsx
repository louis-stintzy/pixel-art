import { useRef } from 'react';
import useStore from '../../../store/store';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
import Pixel from '../Pixel/Pixel';

function Grid() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const gridSize = useStore((state) => state.gridSize);
  const isReadyToColor = useStore((state) => state.isReadyToColor);
  const { isDragging: isColoring } = useDragAndDrop(gridRef, isReadyToColor);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isColoring) return;
    const pixel = event.target as HTMLDivElement;
    const { id } = pixel;
    const color = useStore.getState().selectedColor;
    useStore.getState().setPixelColors(id, color);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isColoring) return;
    const pixel = document.elementFromPoint(
      event.touches[0].clientX,
      event.touches[0].clientY
    ) as HTMLDivElement;
    const { id } = pixel;
    const color = useStore.getState().selectedColor;
    useStore.getState().setPixelColors(id, color);
  };

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

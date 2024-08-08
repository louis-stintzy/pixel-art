import { useRef } from 'react';
import useStore from '../../../store/store';
import Pixel from '../Pixel/Pixel';

function Grid() {
  const gridSize = useStore((state) => state.gridSize);
  const isColoring = useStore((state) => state.isColoring);
  const isColoringRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isColoring) return;
    isColoringRef.current = true;
    console.log('Start Painting');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isColoring) return;
    isColoringRef.current = true;
    console.log('Start Painting');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isColoring || !isColoringRef.current) return;
    console.log('Painting');
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isColoring || !isColoringRef.current) return;
    console.log('Painting');
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isColoring) return;
    isColoringRef.current = false;
    console.log('Stop painting');
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isColoring) return;
    isColoringRef.current = false;
    console.log('Stop painting');
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
      style={gridStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
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

import useStore from '../../store/store';
import Pixel from '../Pixel/Pixel';

function Grid() {
  const gridSize = useStore((state) => state.gridSize);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize.width}, ${gridSize.pixelSize}px)`,
    gridTemplateRows: `repeat(${gridSize.height}, ${gridSize.pixelSize}px)`,
  };

  return (
    <div id="grid" style={gridStyle}>
      {Array.from({ length: gridSize.width * gridSize.height }).map(
        (_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Pixel key={index} />
        )
      )}
    </div>
  );
}

export default Grid;

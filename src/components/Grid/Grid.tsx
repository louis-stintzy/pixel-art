import useStore from '../../store/store';
import Pixel from '../Pixel/Pixel';

function Grid() {
  const gridSize = useStore((state) => state.gridSize);
  const gridContainerStyle = {
    padding: '1rem',
    overflow: 'hidden',
  };
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize.width}, ${gridSize.pixelSize}px)`,
    overflow: 'hidden',
  };
  return (
    <div id="grid-container" style={gridContainerStyle}>
      <div id="grid" style={gridStyle}>
        {Array.from({ length: gridSize.width * gridSize.height }).map(
          (_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Pixel key={index} />
          )
        )}
      </div>
    </div>
  );
}

export default Grid;

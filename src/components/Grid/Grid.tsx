import Pixel from '../Pixel/Pixel';

interface GridProps {
  gridSize: { width: number; height: number };
}

function Grid({ gridSize }: GridProps) {
  const gridContainerStyle = {
    width: '100%',
    padding: '1rem',
  };
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize.width}, 20px)`,
  };
  return (
    <div style={gridContainerStyle}>
      <div style={gridStyle}>
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

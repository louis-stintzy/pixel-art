import Pixel from '../Pixel/Pixel';

function Grid() {
  const gridContainerStyle = {
    width: '100%',
    paddingTop: '1rem',
    paddingLeft: '1rem',
  };
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 20px)',
  };
  return (
    <div style={gridContainerStyle}>
      <div style={gridStyle}>
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
        <Pixel />
      </div>
    </div>
  );
}

export default Grid;

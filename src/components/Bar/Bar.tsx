import ColorPicker from '../ColorPicker/ColorPicker';
import GridSizeSelector from '../GridSizeSelector/GridSizeSelector';

interface BarProps {
  setGridSize: (gridSize: { width: number; height: number }) => void;
}

function Bar({ setGridSize }: BarProps) {
  const barStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
    color: 'white',
    width: '100%',
    height: '6rem',
  };
  return (
    <div style={barStyle}>
      <GridSizeSelector setGridSize={setGridSize} />
      <ColorPicker />
    </div>
  );
}

export default Bar;

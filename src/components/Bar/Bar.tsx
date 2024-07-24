import useStore from '../../store/store';
import ColorPicker from '../ColorPicker/ColorPicker';
import GridSizeSelector from '../GridSizeSelector/GridSizeSelector';

function Bar() {
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
    <div id="bar" style={barStyle}>
      <GridSizeSelector />
      <ColorPicker />
    </div>
  );
}

export default Bar;

import ColorPaletteSelector from './ColorPaletteSelector/ColorPaletteSelector';
import ColorPicker from './ColorPicker/ColorPicker';
import ToggleColoringDragMode from './ControlPanel/ToggleColoringDragMode';
import GridSizeSelector2 from './GridSizeSelector/GridSizeSelector2';

import './Bar.scss';

function Bar() {
  return (
    <div id="bar">
      <h2>Pixel Art Maker</h2>
      <GridSizeSelector2 />
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          <ColorPaletteSelector />
          <ToggleColoringDragMode />
        </div>
        <ColorPicker />
      </div>
    </div>
  );
}

export default Bar;

import ColorPaletteSelector from './ColorPaletteSelector/ColorPaletteSelector';
import ColoringModeOption from './ColoringModeOption/ColoringModeOption';
import ColorPicker from './ColorPicker/ColorPicker';
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
          <ColoringModeOption />
        </div>
        <ColorPicker />
      </div>
    </div>
  );
}

export default Bar;

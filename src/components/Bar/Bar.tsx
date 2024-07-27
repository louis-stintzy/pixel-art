import ColorPaletteSelector from './ColorPaletteSelector/ColorPaletteSelector';
import ColorPicker from './ColorPicker/ColorPicker';
import GridSizeSelector from './GridSizeSelector/GridSizeSelector';

import './Bar.scss';

function Bar() {
  return (
    <div id="bar">
      <h2>Pixel Art Maker</h2>
      <GridSizeSelector />
      <div>
        <ColorPaletteSelector />
        <ColorPicker />
      </div>
    </div>
  );
}

export default Bar;

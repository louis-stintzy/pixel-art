import ColorPaletteSelector from './ColorPaletteSelector/ColorPaletteSelector';
import ColorPicker from './ColorPicker/ColorPicker';
import GridSizeSelector2 from './GridSizeSelector/GridSizeSelector2';

import './Bar.scss';
import ControlPanel from './ControlPanel/ControlPanel';
import OtherButtons from './OtherButtons/OtherButtons';
import DescriptionModal from './OtherButtons/DescriptionModal';
import { useIsDescriptionModalOpen } from '../../store/selector';

function Bar() {
  const isDescriptionModalOpen = useIsDescriptionModalOpen();
  return (
    <div id="bar">
      <h2>Pixel Art Maker</h2>
      <GridSizeSelector2 />
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          <ColorPaletteSelector />
          <ControlPanel />
        </div>
        <OtherButtons />
        <ColorPicker />
      </div>
      {isDescriptionModalOpen && <DescriptionModal />}
    </div>
  );
}

export default Bar;

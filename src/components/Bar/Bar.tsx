import ColorPaletteSelector from './ColorPaletteSelector/ColorPaletteSelector';
import ColorPicker from './ColorPicker/ColorPicker';
import GridSizeSelector2 from './GridSizeSelector/GridSizeSelector2';

import './Bar.scss';
import ControlPanel from './ControlPanel/ControlPanel';
import OtherButtons from './OtherButtons/OtherButtons';
import DescriptionModal from './OtherButtons/SaveAndPublishButton/DescriptionModal';
import {
  useIsDescriptionModalOpen,
  useIsPreviewModalOpen,
} from '../../store/selector';
import PreviewModal from './OtherButtons/SaveAndPublishButton/PreviewModal/PreviewModal';

function Bar() {
  const isDescriptionModalOpen = useIsDescriptionModalOpen();
  const isPreviewModalOpen = useIsPreviewModalOpen();
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
      {isPreviewModalOpen && <PreviewModal />}
    </div>
  );
}

export default Bar;

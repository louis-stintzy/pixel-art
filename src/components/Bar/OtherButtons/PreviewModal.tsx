import { useCallback, useState } from 'react';
import {
  useGridSize,
  useIsPreviewModalOpen,
  usePreviewUrl,
} from '../../../store/selector';
import useStore from '../../../store/store';
import Modal from '../../common/Modal';
import { closeIcon } from '../../../constants/icons';

function PreviewModal() {
  const isPreviewModalOpen = useIsPreviewModalOpen();
  const previewUrl = usePreviewUrl();
  const gridSize = useGridSize();
  const [zoom, setZoom] = useState(1);

  const handleClose = () => {
    useStore.getState().setIsPreviewModalOpen(false);
  };

  const handleZoomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setZoom(parseFloat(e.target.value));
    },
    []
  );

  const previewModalStyle: React.CSSProperties = {
    width: '800px',
    height: '500px',
    margin: 'auto',
    overflow: 'hidden',
  };

  const previewContainerStyle: React.CSSProperties = {
    width: `${gridSize.width * gridSize.pixelSize * zoom}px`,
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  const previewStyle: React.CSSProperties = {
    width: `${gridSize.width * gridSize.pixelSize * zoom}px`,
    height: `auto`,
  };
  return (
    <Modal
      isOpen={isPreviewModalOpen}
      modalStyle={previewModalStyle}
      onClose={handleClose}
    >
      <>
        <button type="button" onClick={handleClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div style={previewContainerStyle}>
          <img src={previewUrl} alt="preview" style={previewStyle} />
        </div>
        <input
          type="range"
          value={zoom}
          min={1}
          max={10}
          step={0.1}
          onChange={handleZoomChange}
        />
      </>
    </Modal>
  );
}

export default PreviewModal;

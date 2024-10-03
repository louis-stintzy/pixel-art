import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useGridSize,
  useIsPreviewModalOpen,
  usePreviewUrl,
} from '../../../store/selector';
import useStore from '../../../store/store';
import Modal from '../../common/Modal';
import { closeIcon } from '../../../constants/icons';
import useDragAndDrop from '../../../hooks/useDragAndDrop';

function PreviewModal() {
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const { position } = useDragAndDrop(previewContainerRef);
  const isPreviewModalOpen = useIsPreviewModalOpen();
  const previewUrl = usePreviewUrl();
  const gridSize = useGridSize();
  const [zoom, setZoom] = useState(1);

  // todo : calculer un initial zoom dans un useEffect pour que l'image apparaisse entièrement
  // todo : créer un bouton qui revient au zoom initial
  // todo : mettre des boutons pour changer gridOptionSelected dans la modal
  // todo : refactoriser DescriptionModalContent, trop long et certaines fonction(alités) vont se répéter

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

  const previewWrapperStyle: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: 'transform 0.1s ease-out',
  };

  const previewStyle: React.CSSProperties = {
    width: `${gridSize.width * gridSize.pixelSize * zoom}px`,
    height: `auto`,
    pointerEvents: 'none',
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
        <div ref={previewContainerRef} style={previewContainerStyle}>
          <div id="previewWrapper" style={previewWrapperStyle}>
            <img src={previewUrl} alt="preview" style={previewStyle} />
          </div>
        </div>
        <input
          type="range"
          value={zoom}
          min={0.2}
          max={10}
          step={0.1}
          onChange={handleZoomChange}
        />
      </>
    </Modal>
  );
}

export default PreviewModal;

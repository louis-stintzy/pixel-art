import { useEffect, useRef, useState } from 'react';
import {
  useGridSize,
  useIsPreviewModalOpen,
} from '../../../../../store/selector';
import useStore from '../../../../../store/store';
import Modal from '../../../../common/Modal';
import useDragAndDrop from '../../../../../hooks/useDragAndDrop';
import GridOption from '../../../../common/GridOption';
import ZoomControls from './ZoomControls';
import CloseButton from './CloseButton';
import Preview from './Preview';

function PreviewModal() {
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const childOfModalRef = useRef<HTMLDivElement | null>(null);
  const { position, resetPosition } = useDragAndDrop(previewContainerRef);
  const isPreviewModalOpen = useIsPreviewModalOpen();
  const gridSize = useGridSize();
  const [zoom, setZoom] = useState(1);
  const [initialZ, setInitialZ] = useState(1);

  const handleClose = () => {
    useStore.getState().setIsPreviewModalOpen(false);
  };

  const previewModalStyle: React.CSSProperties = {
    width: `800px`,
    height: `500px`,
    margin: 'auto',
    overflow: 'hidden',
  };

  const childOfModalStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
  };

  // l'initial zoom est calculé en fonction de la taille de l'image (gridSize width/height x pixelSize) et de la taille disponible soit (childOfModal width/height - height 80% de la height de la Modal)
  // on prend le zoom le plus petit pour que l'image apparaisse entierement
  useEffect(() => {
    if (childOfModalRef.current) {
      const childOfModalWidth = childOfModalRef.current.clientWidth;
      const childOfModalHeight = childOfModalRef.current.clientHeight;
      const initialZoom = Math.min(
        Math.round(
          (childOfModalWidth * 100) / (gridSize.width * gridSize.pixelSize)
        ) / 100,
        Math.round(
          (childOfModalHeight * 0.8 * 100) /
            (gridSize.height * gridSize.pixelSize)
        ) / 100
      );
      setInitialZ(initialZoom);
      setZoom(initialZoom);
    }
  }, [gridSize.height, gridSize.pixelSize, gridSize.width]);

  return (
    <Modal
      isOpen={isPreviewModalOpen}
      modalStyle={previewModalStyle}
      onClose={handleClose}
    >
      <div id="childOfModal" ref={childOfModalRef} style={childOfModalStyle}>
        <CloseButton onClose={handleClose} />
        <Preview
          childOfModalRef={childOfModalRef}
          previewContainerRef={previewContainerRef}
          position={position}
          zoom={zoom}
        />
        <ZoomControls
          initialZoom={initialZ}
          zoom={zoom}
          setZoom={setZoom}
          resetPosition={resetPosition}
        />
        <GridOption display="button" />
      </div>
    </Modal>
  );
}

export default PreviewModal;

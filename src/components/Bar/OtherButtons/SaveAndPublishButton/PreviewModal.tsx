import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useGridSize,
  useIsPreviewModalOpen,
  usePreviewUrl,
} from '../../../../store/selector';
import useStore from '../../../../store/store';
import Modal from '../../../common/Modal';
import { closeIcon } from '../../../../constants/icons';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';

function PreviewModal() {
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const childOfModalRef = useRef<HTMLDivElement | null>(null);
  const { position, resetPosition } = useDragAndDrop(previewContainerRef);
  const isPreviewModalOpen = useIsPreviewModalOpen();
  const previewUrl = usePreviewUrl();
  const gridSize = useGridSize();
  const [zoom, setZoom] = useState(1);
  const [initialZ, setInitialZ] = useState(1);

  // todo : créer un bouton qui revient au zoom initial
  // todo : mettre des boutons pour changer gridOptionSelected dans la modal

  const handleClose = () => {
    useStore.getState().setIsPreviewModalOpen(false);
  };

  const handleZoomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setZoom(parseFloat(e.target.value));
    },
    []
  );

  const handleResetZoom = () => {
    resetPosition();
    setZoom(initialZ);
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

  // si il y a bien un childOfModalRef et que la largeur de l'image (redimensionnée) est plus grande que la largeur du childOfModalRef :
  // on retourne la largeur de l'image en zoom, sinon on retourne 100% pour que l'image soit centrée et qu'il n'y ait pas de pb de container trop petit (l'image sortirait du container  tout en étant plus petit que la modal)
  const calculatePreviewContainerWidth = () => {
    if (childOfModalRef.current) {
      return gridSize.width * gridSize.pixelSize * zoom >
        childOfModalRef.current.clientWidth
        ? gridSize.width * gridSize.pixelSize * zoom
        : '100%';
    }
    return gridSize.width * gridSize.pixelSize * zoom;
  };

  const previewContainerStyle: React.CSSProperties = {
    width: calculatePreviewContainerWidth(),
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
    pointerEvents: 'none', // pour que le drag and drop fonctionne sur la div parent et non sur l'image
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
        <button type="button" onClick={handleClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div
          id="previewContainer"
          ref={previewContainerRef}
          style={previewContainerStyle}
        >
          <div id="previewWrapper" style={previewWrapperStyle}>
            <img src={previewUrl} alt="preview" style={previewStyle} />
          </div>
        </div>
        <div
          id="zoom-controller"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <input
            id="zoom-controller__input-range"
            type="range"
            value={zoom}
            min={0.2}
            max={5}
            step={0.2}
            onChange={handleZoomChange}
          />
          <button
            id="zoom-controller__btn-reset"
            type="button"
            onClick={handleResetZoom}
            style={{ margin: '0 5px' }}
          >
            Reset
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default PreviewModal;

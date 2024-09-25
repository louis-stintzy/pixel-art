import { useEffect, useRef } from 'react';
import ImageCropper from './ImageCropper';
import useStore from '../../store/store';
import { handleCancel } from '../../utils/imageHandlers';
import Modal from '../common/Modal';
import { useIsCroppingModalOpen } from '../../store/selector';

function ImageModal() {
  const isCroppingModalOpen = useIsCroppingModalOpen();
  const fileUrl = useStore((state) => state.fileUrl);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isCroppingModalOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isCroppingModalOpen]);

  const imageModalStyle: React.CSSProperties = {
    width: '400px',
    height: '500px',
    margin: 'auto',
  };

  if (!fileUrl) return null;

  return (
    <Modal
      isOpen={isCroppingModalOpen}
      modalStyle={imageModalStyle}
      onClose={handleCancel}
    >
      <ImageCropper />
    </Modal>
  );
}

export default ImageModal;

import { useEffect, useRef } from 'react';
import ImageCropper from './ImageCropper';
import useStore from '../../store/store';
import { handleCancel } from '../../utils/imageHandlers';
import Modal from '../common/Modal';

function ImageModal() {
  const croppingModalIsOpen = useStore((state) => state.croppingModalIsOpen);
  const fileUrl = useStore((state) => state.fileUrl);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (croppingModalIsOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [croppingModalIsOpen]);

  const imageModalStyle: React.CSSProperties = {
    width: '400px',
    height: '500px',
    margin: 'auto',
  };

  if (!fileUrl) return null;

  return (
    <Modal
      isOpen={croppingModalIsOpen}
      modalStyle={imageModalStyle}
      onClose={handleCancel}
    >
      <ImageCropper />
    </Modal>
  );
}

export default ImageModal;

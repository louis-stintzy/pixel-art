import { useEffect, useRef } from 'react';
import ImageCropper from './ImageCropper';
import useStore from '../../store/store';

function ImageModal() {
  const croppingModalIsOpen = useStore((state) => state.croppingModalIsOpen);
  const fileUrl = useStore((state) => state.fileUrl);
  const setCroppingModalIsOpen = useStore(
    (state) => state.setCroppingModalIsOpen
  );
  const setFileUrl = useStore((state) => state.setFileUrl);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (croppingModalIsOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [croppingModalIsOpen]);

  const handleCancel = () => {
    setCroppingModalIsOpen(false);
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFileUrl(undefined);
  };

  const imageModalStyle: React.CSSProperties = {
    width: '400px',
    height: '500px',
    margin: 'auto',
  };

  if (!fileUrl) return null;

  return (
    <dialog ref={modalRef} style={imageModalStyle} onCancel={handleCancel}>
      <ImageCropper onCancel={handleCancel} />
    </dialog>
  );
}

export default ImageModal;

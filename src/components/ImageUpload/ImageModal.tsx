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
  const setAspectRatio = useStore((state) => state.setAspectRation);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (croppingModalIsOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [croppingModalIsOpen]);

  const handleCropOrCancel = () => {
    setCroppingModalIsOpen(false);
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFileUrl(undefined);
  };

  const handleCancel = () => {
    handleCropOrCancel();
    setAspectRatio({
      // reset aspectRatio to default value
      display: '4:3',
      value: 4 / 3,
      formats: [
        {
          display: '800x600',
          width: 800,
          height: 600,
          pixelSize: [8, 10, 20, 25, 40, 50, 100],
        },
        {
          display: '1024x768',
          width: 1024,
          height: 768,
          pixelSize: [8, 16, 32, 64, 128],
        },
      ],
    });
  };

  const imageModalStyle: React.CSSProperties = {
    width: '400px',
    height: '500px',
    margin: 'auto',
  };

  if (!fileUrl) return null;

  return (
    <dialog ref={modalRef} style={imageModalStyle} onCancel={handleCancel}>
      <ImageCropper onCrop={handleCropOrCancel} onCancel={handleCancel} />
    </dialog>
  );
}

export default ImageModal;

import { useDropzone } from 'react-dropzone';
import ImageModal from './ImageModal';
import useStore from '../../store/store';
import { handleCancel } from '../../utils/imageHandlers';

function ImageInput() {
  const previousImageUrl = useStore((state) => state.imageUrl);
  const setFileUrl = useStore((state) => state.setFileUrl);
  const setIsCroppingModalOpen = useStore(
    (state) => state.setIsCroppingModalOpen
  );

  const onDrop = (acceptedFiles: File[]) => {
    if (previousImageUrl) URL.revokeObjectURL(previousImageUrl);
    handleCancel();
    const file = acceptedFiles[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setFileUrl(imageUrl);
    setIsCroppingModalOpen(true);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] },
    // maxSize: 1000000,
  });

  const ImageInputDragStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    border: '1px dashed #ccc',
    cursor: 'pointer',
    padding: '0 2rem',
    height: '1.8rem',
    width: '12.5rem',
    boxSizing: 'content-box',
  };
  return (
    <>
      <div
        id="image-input__drag"
        {...getRootProps()}
        style={ImageInputDragStyle}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag an image to pixelate !</p>
        )}
      </div>
      <ImageModal />
    </>
  );
}

export default ImageInput;

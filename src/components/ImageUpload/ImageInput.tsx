import { useDropzone } from 'react-dropzone';
import ImageModal from './ImageModal';
import useStore from '../../store/store';

function ImageInput() {
  const fileUrl = useStore((state) => state.fileUrl);
  const setFileUrl = useStore((state) => state.setFileUrl);
  const setCroppingModalIsOpen = useStore(
    (state) => state.setCroppingModalIsOpen
  );
  const setAspectRatio = useStore((state) => state.setAspectRation);

  // -----
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
  //-----

  const onDrop = (acceptedFiles: File[]) => {
    handleCancel();
    const file = acceptedFiles[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setFileUrl(imageUrl);
    setCroppingModalIsOpen(true);
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

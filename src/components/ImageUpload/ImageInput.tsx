import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageInputProps {
  aspectRatio: number;
}

function ImageInput({ aspectRatio }: ImageInputProps) {
  const [croppingModalIsOpen, setCroppingModalIsOpen] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setCroppingModalIsOpen(true);

    // const reader = new FileReader();
    // reader.onload = () => {
    //   const imageUrl = reader.result as string;
    //   console.log(imageUrl);
    // };
    // reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] },
    maxSize: 1000000,
  });
  return (
    <div {...getRootProps()} style={{ border: '1px solid black' }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag 'n' drop an image here, or click to select an image</p>
      )}
    </div>
  );
}

export default ImageInput;

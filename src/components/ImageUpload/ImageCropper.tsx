import Cropper, { Area } from 'react-easy-crop';
import { useState } from 'react';
import useStore from '../../store/store';

interface ImageModalProps {
  aspectRatio: number;
  onCancel: () => void;
}

function ImageCropper({ aspectRatio, onCancel }: ImageModalProps) {
  const fileUrl = useStore((state) => state.fileUrl);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const handleCropImage = () => {
    console.log('Cropping image');
  };

  const cropperContainerStyle: React.CSSProperties = {
    width: '350px',
    height: '350px',
    position: 'relative',
  };

  return (
    <div>
      <h1>ImageCropper</h1>
      <div id="cropper-container" style={cropperContainerStyle}>
        <Cropper
          image={fileUrl}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="button" onClick={handleCropImage}>
        Crop Image
      </button>
    </div>
  );
}

export default ImageCropper;

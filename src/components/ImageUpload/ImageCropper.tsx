import Cropper, { Area } from 'react-easy-crop';
import { useCallback, useState } from 'react';
import useStore from '../../store/store';
import getCroppedImg from '../../utils/cropImage';

interface ImageModalProps {
  aspectRatio: number;
  onCancel: () => void;
}

function ImageCropper({ aspectRatio, onCancel }: ImageModalProps) {
  const fileUrl = useStore((state) => state.fileUrl);
  const setImageUrl = useStore((state) => state.setImageUrl);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // onCropComplete est appelée à chaque fois que l'utilisateur modifie la zone de sélection (zomm ou déplacement du cadre)
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPXLS: Area) => {
      setCroppedAreaPixels(croppedAreaPXLS);
    },
    []
  );

  const handleCropImage = useCallback(async () => {
    try {
      if (!fileUrl || !croppedAreaPixels) {
        throw new Error('File Url or Cropped Area Pixels is null');
      }
      const croppedImage = await getCroppedImg(fileUrl, croppedAreaPixels);
      setImageUrl(croppedImage);
      onCancel();
    } catch (error) {
      console.error('Error cropping image : ', error);
    }
  }, [croppedAreaPixels, fileUrl, setImageUrl, onCancel]);

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

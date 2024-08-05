import Cropper, { Area } from 'react-easy-crop';
import { useCallback, useState } from 'react';
import useStore from '../../store/store';
import getCroppedImg from '../../utils/cropImage';
import ImageFormatSetting from './ImageFormatSetting';
import { handleCancel, handleCropOrCancel } from '../../utils/imageHandlers';

function ImageCropper() {
  const aspectRatio = useStore((state) => state.aspectRatio);
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

  const handleZoomChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setZoom(parseFloat(e.target.value));
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
      handleCropOrCancel();
    } catch (error) {
      console.error('Error cropping image : ', error);
    }
  }, [croppedAreaPixels, fileUrl, setImageUrl]);

  const cropperContainerStyle: React.CSSProperties = {
    width: '350px',
    height: '350px',
    position: 'relative',
  };

  return (
    <div>
      <h1>ImageCropper</h1>
      <ImageFormatSetting />
      <div id="cropper-container" style={cropperContainerStyle}>
        <Cropper
          image={fileUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio.value}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <input
        type="range"
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        onChange={handleZoomChange}
      />
      <button type="button" onClick={handleCropImage}>
        Crop Image
      </button>
    </div>
  );
}

export default ImageCropper;

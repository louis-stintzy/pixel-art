import Cropper, { Area } from 'react-easy-crop';
import { useCallback, useState } from 'react';
import useStore from '../../store/store';
import getCroppedImg from '../../utils/cropImage';
import ImageFormatSetting from './ImageFormatSetting';
import { handleCancel, handleCropOrCancel } from '../../utils/imageHandlers';
import resizeImage from '../../utils/resizeImage';
import configureGridSize from '../../utils/configureGridSize';
import { useAspectRatio, useFileUrl } from '../../store/selectors/selector';

/**
 * The ImageCropper component manages image cropping.
 * It allows users to crop images.
 * It is the parent of the ImageFormatSetting component (which manages aspect ratio settings).
 * It makes available, via the store, a cropped image with the correct dimensions (first available format for the chosen aspect ratio).
 * The component also updates the format and size of the grid according to the cropped image (first available format of the chosen aspect ratio).
 */

function ImageCropper() {
  const aspectRatio = useAspectRatio();
  const fileUrl = useFileUrl();
  const setImageUrl = useStore((state) => state.setImageUrl);
  const setFormat = useStore((state) => state.setFormat);
  const setGridSize = useStore((state) => state.setGridSize);

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
        throw new Error('File Url is undefined or Cropped Area Pixels is null');
      }
      const croppedImage = await getCroppedImg(fileUrl, croppedAreaPixels);
      if (!croppedImage) {
        throw new Error('Cropped image is undefined');
      }
      const resizedImageUrl = await resizeImage(
        croppedImage,
        aspectRatio.formats[0]
      );
      setImageUrl(resizedImageUrl);
      handleCropOrCancel();

      const defaultFormat = aspectRatio.formats[0];

      setFormat(defaultFormat);
      setGridSize(configureGridSize(defaultFormat, defaultFormat.pixelSize[2]));
    } catch (error) {
      console.error('Error cropping image : ', error);
    }
  }, [
    aspectRatio.formats,
    croppedAreaPixels,
    fileUrl,
    setFormat,
    setGridSize,
    setImageUrl,
  ]);

  const cropperContainerStyle: React.CSSProperties = {
    width: '350px',
    height: '350px',
    position: 'relative',
  };

  return (
    <>
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
    </>
  );
}

export default ImageCropper;

import { useEffect, useState } from 'react';
import useStore from '../../../store/store';
import { useFormat, useImageUrl } from '../../../store/selectors/selector';

function ImageUnderTheGrid() {
  const format = useFormat();
  const imageUrl = useImageUrl();

  const [uploadedImageDimensions, setUploadedImageDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: format.width, height: format.height });

  useEffect(() => {
    setUploadedImageDimensions({
      width: format.width,
      height: format.height,
    });
  }, [format]);

  const uploadedImageContainerStyle: React.CSSProperties = {
    width: uploadedImageDimensions.width,
    height: uploadedImageDimensions.height,
  };

  return (
    imageUrl && (
      <div id="uploaded-image-container" style={uploadedImageContainerStyle}>
        <img src={imageUrl} alt="uploaded" />
      </div>
    )
  );
}

export default ImageUnderTheGrid;

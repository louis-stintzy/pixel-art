import { useState } from 'react';
import useStore from '../../store/store';

function Pixel() {
  const pixelSize = useStore((state) => state.gridSize.pixelSize);
  const [isClicked, setIsClicked] = useState(false);

  const pixelStyle = (backgroundColor: string, borderColor: string) => ({
    width: pixelSize,
    height: pixelSize,
    backgroundColor: isClicked ? '#FFC107' : backgroundColor,
    border: `1px solid ${borderColor}`,
  });
  return (
    <button
      type="button"
      style={pixelStyle('#00796B', '#689F38')}
      onClick={() => setIsClicked((prev) => !prev)}
      aria-label="Pixel Button"
    />
  );
}

export default Pixel;

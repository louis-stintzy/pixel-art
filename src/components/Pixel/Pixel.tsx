import { useState } from 'react';
import useStore from '../../store/store';

function Pixel() {
  const pixelSize = useStore((state) => state.gridSize.pixelSize);
  const userDragsGrid = useStore((state) => state.userDragsGrid);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (userDragsGrid) return;
    setIsClicked((prev) => !prev);
  };

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
      onClick={handleClick}
      aria-label="Pixel Button"
    />
  );
}

export default Pixel;

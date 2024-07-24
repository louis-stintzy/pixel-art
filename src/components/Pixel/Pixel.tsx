import { useState } from 'react';

function Pixel() {
  const [isClicked, setIsClicked] = useState(false);

  const pixelStyle = (backgroundColor: string, borderColor: string) => ({
    width: '20px',
    height: '20px',
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

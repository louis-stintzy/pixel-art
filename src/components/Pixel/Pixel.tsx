import { useState } from 'react';
import useStore from '../../store/store';

interface PixelProps {
  id: string;
}

function Pixel({ id }: PixelProps) {
  const pixelSize = useStore((state) => state.gridSize.pixelSize);
  const userDragsGrid = useStore((state) => state.userDragsGrid);
  const selectedColor = useStore((state) => state.selectedColor);
  const pixelColors = useStore((state) => state.pixelColors);
  const setPixelColors = useStore((state) => state.setPixelColors);
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pixelColor = pixelColors[id] || '#00796B'; // If pixelColors[id] is undefined, use '#00796B' as the default value
  const pixelBorderColor = '#689F38';
  let pixelOpacity;
  if (isHovered) {
    pixelOpacity = 0.7;
  } else if (isClicked) {
    pixelOpacity = 1;
  } else {
    pixelOpacity = 0.8;
  }

  const pixelStyle = {
    width: pixelSize,
    height: pixelSize,
    backgroundColor: pixelColor,
    opacity: pixelOpacity,
    transition: 'opacity 0.1s ease-out',
    border: `1px solid ${pixelBorderColor}`,
  };

  const handleClick = () => {
    if (userDragsGrid) return; // Si l'utilisateur fait glisser la grille, ne pas autoriser le clic sur un pixel.
    setIsClicked((prev) => !prev);
    setPixelColors(id, selectedColor); // Mettre à jour la couleur du pixel dans le store.
  };

  return (
    <button
      id={id}
      type="button"
      style={pixelStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      aria-label="Pixel Button"
    />
  );
}

export default Pixel;

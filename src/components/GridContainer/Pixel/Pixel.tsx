import { useState } from 'react';
import useStore from '../../../store/store';

interface PixelProps {
  id: string;
}

function Pixel({ id }: PixelProps) {
  const pixelSize = useStore((state) => state.gridSize.pixelSize);
  const userDragsGrid = useStore((state) => state.userDragsGrid);
  const selectedColor = useStore((state) => state.selectedColor);
  const pixelColors = useStore((state) => state.pixelColors);
  const setPixelColors = useStore((state) => state.setPixelColors);
  const [isHovered, setIsHovered] = useState(false);

  const gridColor = {
    background: '#fff',
    line: '#ccc',
  };

  const pixelColor = pixelColors[id] || gridColor.background; // If pixelColors[id] is undefined, use '#00796B' as the default value
  const pixelBorderColor = gridColor.line;
  let pixelOpacity;
  if (isHovered) {
    pixelOpacity = 0.7;
  } else if (pixelColor !== gridColor.background) {
    pixelOpacity = 1;
  } else {
    pixelOpacity = 0.8;
  }

  const pixelStyle = {
    width: pixelSize,
    height: pixelSize,
    backgroundColor: pixelColor,
    opacity: pixelOpacity,
    transition: 'opacity 0.1s ease-out, background-color 0.1s ease-out',
    border: `1px solid ${pixelBorderColor}`,
  };

  const handleClick = () => {
    if (userDragsGrid) return; // Si l'utilisateur fait glisser la grille, ne pas autoriser le clic sur un pixel.
    if (pixelColors[id] === selectedColor) {
      setPixelColors(id, gridColor.background); // Si la couleur du pixel est la même que la couleur sélectionnée, réinitialiser la couleur du pixel.
      return;
    }
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

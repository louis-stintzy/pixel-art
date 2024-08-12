import React, { useState } from 'react';
import useStore from '../../../store/store';

interface PixelProps {
  id: string;
}

const Pixel = React.memo(({ id }: PixelProps) => {
  // function Pixel({ id }: PixelProps) {
  const pixelSize = useStore((state) => state.gridSize.pixelSize);
  const userDragsGrid = useStore((state) => state.userDragsGrid);
  const selectedColor = useStore((state) => state.selectedColor);
  const pixelColor = useStore((state) => state.pixelColors[id]);
  const setPixelColors = useStore((state) => state.setPixelColors);
  const [isHovered, setIsHovered] = useState(false);

  const gridColor = {
    background: '#fff',
    line: '#ccc',
  };

  const pixelBorderColor = gridColor.line;
  let pixelOpacity;
  if (isHovered) {
    pixelOpacity = 0.3;
  } else if (pixelColor && pixelColor !== gridColor.background) {
    pixelOpacity = 1;
  } else {
    pixelOpacity = 0.5;
  }

  const pixelStyle = {
    width: pixelSize,
    height: pixelSize,
    backgroundColor: pixelColor || gridColor.background,
    opacity: pixelOpacity,
    transition: 'opacity 0.1s ease-out, background-color 0.1s ease-out',
    border: `1px solid ${pixelBorderColor}`,
  };

  const handleClick = () => {
    if (userDragsGrid) return; // Si l'utilisateur fait glisser la grille, ne pas autoriser le clic sur un pixel.
    if (pixelColor === selectedColor) {
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
});

// Pixel.displayName est utilisé par React DevTools pour afficher un nom plus lisible pour le composant.
Pixel.displayName = 'Pixel';

export default Pixel;

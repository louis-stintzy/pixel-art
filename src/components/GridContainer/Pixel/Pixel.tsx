import React, { useState } from 'react';
import useStore from '../../../store/store';
import coloring from '../../../utils/coloring';
import getNeighboringPixels from '../../../utils/getNeighboringPixels';
import gridColor from '../../../constants/gridColor';

interface PixelProps {
  id: string;
}

// React.memo est utilisé pour éviter de rendre à nouveau le composant Pixel si ses props n'ont pas changé.
// Cela améliore les performances en évitant des re-renders inutiles.
// L'optimisation est renforcée par le fait que l'on récupère uniquement la couleur du pixel actuel,
// ce qui évite de provoquer un re-render de tous les pixels lorsque la couleur d'un seul change.
const Pixel = React.memo(({ id }: PixelProps) => {
  const pixelSize = useStore((state) => state.gridSize.pixelSize);
  const userDragsGrid = useStore((state) => state.userDragsGrid);
  const pixelColor = useStore((state) => state.pixelColors[id]);
  const [isHovered, setIsHovered] = useState(false);

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
    const { isBigTool, selectedColor } = useStore.getState();
    if (userDragsGrid) return; // Si l'utilisateur fait glisser la grille, ne pas autoriser le clic sur un pixel.
    if (isBigTool) {
      coloring([id, ...getNeighboringPixels(id)]); // Colorer le pixel et ses pixels voisins avec la couleur sélectionnée (selectedColor récupérée dans coloring).
      return;
    }
    if (pixelColor === selectedColor) {
      coloring([id], gridColor.background); // Si la couleur du pixel est la même que la couleur sélectionnée, réinitialiser la couleur du pixel.
      return;
    }
    coloring([id]); // Colorer le pixel avec la couleur sélectionnée (selectedColor récupérée dans coloring).
  };

  return (
    <button
      id={id}
      type="button"
      style={pixelStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      aria-label={`Pixel ${id} - ${
        pixelColor === gridColor.background ? 'uncolored' : 'colored'
      }`}
    />
  );
});

// Pixel.displayName est utilisé par React DevTools pour afficher un nom plus lisible pour le composant.
Pixel.displayName = 'Pixel';

export default Pixel;

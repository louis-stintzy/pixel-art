import React, { useState } from 'react';
import useStore from '../../../store/store';
import { coloring, replaceColor2 } from '../../../utils/coloring';
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
  const pixelColor = useStore((state) => state.pixelColors[id]);
  const isSelectingColorToChange = useStore(
    (state) => state.colorReplacement.isSelectingColor
  );
  const [isHovered, setIsHovered] = useState(false);

  const pipetteIcon =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXBpcGV0dGUiPjxwYXRoIGQ9Im0yIDIyIDEtMWgzbDktOSIvPjxwYXRoIGQ9Ik0zIDIxdi0zbDktOSIvPjxwYXRoIGQ9Im0xNSA2IDMuNC0zLjRhMi4xIDIuMSAwIDEgMSAzIDNMMTggOWwuNC40YTIuMSAyLjEgMCAxIDEtMyAzbC0zLjgtMy44YTIuMSAyLjEgMCAxIDEgMy0zbC40LjRaIi8+PC9zdmc+';

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
    cursor: isSelectingColorToChange ? `url(${pipetteIcon}), auto` : 'auto',
  };

  const handleClick = async () => {
    const { userDragsGrid, isReadyToDraw, isEraser, isBigTool, selectedColor } =
      useStore.getState();

    // Si l'utilisateur fait glisser la grille, ne pas autoriser le clic sur un pixel :
    if (userDragsGrid) return;

    // Si l'utilisateur s'apprête à remplacer une couleur :
    if (isSelectingColorToChange) {
      const targetColor = pixelColor || gridColor.background;
      useStore.getState().setColorReplacement({
        isSelectingColor: false,
        targetColor,
        savedPixelColors: { ...useStore.getState().pixelColors },
        isLoading: true,
      });
      await replaceColor2(targetColor);
      return;
    }

    // Si le mode dessin est activé :
    if (isReadyToDraw) {
      const color = isEraser ? gridColor.background : undefined; // Si le mode erase est activé, définir la couleur sur la couleur de fond de la grille.
      if (isBigTool) {
        coloring([id, ...getNeighboringPixels(id)], color); // Si le mode big tool est activé, colorer le pixel et ses pixels voisins
        return;
      }
      if (pixelColor === selectedColor) {
        coloring([id], gridColor.background); // Si la couleur du pixel est la même que la couleur sélectionnée, réinitialiser la couleur du pixel.
        return;
      }
      coloring([id], color); // Cas par défaut : applique la couleur définie plus haut sur le pixel en mode dessin.
      return;
    }

    // Si le mode dessin n'est pas activé :
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

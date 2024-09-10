import { useCallback, useEffect, useRef, useState } from 'react';
import { Color } from '../../../../@types/colorPalette';
import ColorContextMenu from '../ColorContextMenu/ColorContextMenu';
import ColorButton from '../ColorButton/ColorButton';
import useDragAndDrop from '../../../../hooks/useDragAndDrop';
import useStore from '../../../../store/store';
import useActionFollowingMove from '../../../../hooks/useActionFollowingMove';
import timeoutCleanup from '../../../../utils/timeoutCleanup';

interface ColorPaletteColorsProps {
  palette: { name: string; colors: Color[] };
}

function ColorPaletteColors({ palette }: ColorPaletteColorsProps) {
  const favoriteColors = useStore((state) => state.favoriteColors);

  const paletteRef = useRef<HTMLDivElement | null>(null);
  const { isDragging, position, resetPosition } = useDragAndDrop(paletteRef);
  const [draggedColorButton, setDraggedColorButton] = useState<{
    button: HTMLButtonElement;
    translateX: number;
    translateY: number;
  } | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    color: Color;
  } | null>(null);

  // --------------------------------- CONTEXT MENU ---------------------------------

  const [touchStartTime, setTouchStartTime] = useState<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent) => {
    // Pour ContextMenu (long press)
    setTouchStartTime(Date.now());
    // Pour Drag and Drop
    const selectedColorButton = event.target as HTMLButtonElement;
    if (selectedColorButton)
      setDraggedColorButton({
        button: selectedColorButton,
        translateX: 0,
        translateY: 0,
      });
  };

  const handleTouchEnd = (e: React.TouchEvent, color: Color) => {
    // ici on utilise e.changedTouches[0].clientX et e.changedTouches[0].clientY pour obtenir les coordonnées du pointeur
    // e.touches[0] est undefined lorsque l'événement touchend est déclenché
    // changedTouches contient les informations sur les touches qui ont changé, c'est-à-dire celles qui ont été levées (les dernières touches en interaction avant la fin du toucher)

    // Pour Drag and Drop
    const { setFavoriteColors } = useStore.getState();
    const buttonToBeInterchanged = document.elementFromPoint(
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    ) as HTMLButtonElement;
    if (!draggedColorButton || !buttonToBeInterchanged) return;

    const draggedColorIndex = parseInt(
      draggedColorButton.button.id.split('-')[0].replace('color', ''),
      10
    );
    const colorIndexToBeInterchanged = parseInt(
      buttonToBeInterchanged.id.split('-')[0].replace('color', ''),
      10
    );
    const updatedFavoriteColors = [...favoriteColors]; // todo: en veillant initialement à ce qu'on opère le drag and drop que sur favorite colors
    // voir https://www.aality.fr/blog/javascript/inverser-deux-valeurs-array-javascript/
    [
      updatedFavoriteColors[draggedColorIndex],
      updatedFavoriteColors[colorIndexToBeInterchanged],
    ] = [
      updatedFavoriteColors[colorIndexToBeInterchanged],
      updatedFavoriteColors[draggedColorIndex],
    ];
    setFavoriteColors(updatedFavoriteColors);
    setDraggedColorButton(null);
    // réinitialiser touchStartTime après avoir terminé le drag-and-drop
    setTouchStartTime(null);
    // Réinitialiser la position après avoir terminé le drag-and-drop (sinon lors d'un prochain drag and drop, on reprendrait la position x et y précédente en point de départ)
    resetPosition();
    // Réactiver les événements du pointeur après avoir terminé le drag-and-drop
    draggedColorButton.button.style.pointerEvents = 'auto';

    // Pour ContextMenu (long press)
    if (
      !buttonToBeInterchanged &&
      touchStartTime &&
      Date.now() - touchStartTime > 500
    ) {
      e.preventDefault();
      setContextMenu({
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        color,
      });
      setTouchStartTime(null);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, color: Color) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      color,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // -------------------------------- DRAG AND DROP --------------------------------

  const handleMouseDragStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedColorButton = event.target as HTMLButtonElement;
    if (selectedColorButton)
      setDraggedColorButton({
        button: selectedColorButton,
        translateX: 0,
        translateY: 0,
      });
  };

  const handleMouseDragStop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { setFavoriteColors } = useStore.getState();
    const buttonToBeInterchanged = document.elementFromPoint(
      event.clientX,
      event.clientY
    ) as HTMLButtonElement;
    if (!draggedColorButton || !buttonToBeInterchanged) return;

    const draggedColorIndex = parseInt(
      draggedColorButton.button.id.split('-')[0].replace('color', ''),
      10
    );
    const colorIndexToBeInterchanged = parseInt(
      buttonToBeInterchanged.id.split('-')[0].replace('color', ''),
      10
    );
    const updatedFavoriteColors = [...favoriteColors]; // todo: en veillant initialement à ce qu'on opère le drag and drop que sur favorite colors
    // voir https://www.aality.fr/blog/javascript/inverser-deux-valeurs-array-javascript/
    [
      updatedFavoriteColors[draggedColorIndex],
      updatedFavoriteColors[colorIndexToBeInterchanged],
    ] = [
      updatedFavoriteColors[colorIndexToBeInterchanged],
      updatedFavoriteColors[draggedColorIndex],
    ];
    setFavoriteColors(updatedFavoriteColors);
    setDraggedColorButton(null);
    // Réinitialiser la position après avoir terminé le drag-and-drop (sinon lors d'un prochain drag and drop, on reprendrait la position x et y précédente en point de départ)
    resetPosition();
    // Réactiver les événements du pointeur après avoir terminé le drag-and-drop
    draggedColorButton.button.style.pointerEvents = 'auto';
  };
  // --------------------------------- NEW ---------------------------------

  const lastRanRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    return () => {
      timeoutCleanup(timeoutRef);
    };
  }, []);

  const throttleLimit = 32;
  const cbShouldNotRun = !isDragging;

  const executeLogic = useCallback(() => {
    if (draggedColorButton) {
      setDraggedColorButton({
        button: draggedColorButton.button,
        translateX: position.x,
        translateY: position.y,
      });
      // Désactiver les événements du pointeur pour permettre l'interaction avec les éléments en dessous.
      // Sinon nous ne pourrions pas déplacer le bouton, dans handleMouseDragStop buttonToBeInterchanged serait le draggedColorButton
      draggedColorButton.button.style.pointerEvents = 'none';
    }
  }, [draggedColorButton, position.x, position.y]);

  const executeMouseLogic = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      // console.log('executeMouseLogic dans CPC, date.now() : ', Date.now());
      executeLogic();
    },
    [executeLogic]
  );

  const executeTouchLogic = useCallback(
    (e: React.TouchEvent | TouchEvent) => {
      executeLogic();
    },
    [executeLogic]
  );

  const handleDragProgress = useActionFollowingMove(
    lastRanRef,
    timeoutRef,
    throttleLimit,
    cbShouldNotRun,
    executeMouseLogic,
    executeTouchLogic
  );

  // --------------------------------- RETURN ---------------------------------

  const colorKeys: string[] = [];
  for (let i = 0; i < 20; i += 1) {
    colorKeys.push(`color${i}`);
  }
  return (
    <div
      ref={paletteRef}
      role="row"
      tabIndex={0}
      style={{ display: 'flex', justifyContent: 'flex-start' }}
      onMouseMove={handleDragProgress}
      onTouchMove={handleDragProgress}
    >
      {palette.colors.map((color, index) => (
        <ColorButton
          key={`${colorKeys[index]}-${palette.name}-${color.code}`}
          color={color}
          paletteName={palette.name}
          index={index}
          onTouchStart={handleTouchStart}
          onTouchEndd={handleTouchEnd}
          onContextMenu={handleContextMenu}
          onMouseDown={handleMouseDragStart}
          onMouseUp={handleMouseDragStop}
          {...draggedColorButton}
        />
      ))}

      {contextMenu && (
        <ColorContextMenu {...contextMenu} onClose={closeContextMenu} />
      )}
    </div>
  );
}

export default ColorPaletteColors;

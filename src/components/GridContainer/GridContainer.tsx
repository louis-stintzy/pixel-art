import { useRef, useState } from 'react';
import Grid from './Grid/Grid';
import useStore from '../../store/store';

function GridContainer() {
  // useRef permet de stocker une valeur mutable qui ne déclenchera pas de nouveau rendu lorsqu'elle est modifiée.
  // useRef renvoie un objet avec une propriété current qui est mutable.
  // useRef est idéal pour conserver des références à des éléments DOM ou des valeurs qui ne nécessitent pas de re-render de composant lorsqu'elles sont modifiées.
  // C'est particulièrement utile pour suivre l'état d'interactions utilisateur comme le drag-and-drop.
  const gridRef = useRef<HTMLDivElement | null>(null); // Référence pour le conteneur de la grille
  const isDragging = useRef(false); // Référence pour savoir si l'utilisateur fait glisser la grille
  const lastMousePosition = useRef({ x: 0, y: 0 }); // Référence pour stocker la dernière position de la souris
  const mouseDownRef = useRef(false); // Référence pour savoir si le bouton de la souris est enfoncé

  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position de la grille
  const setUserDragsGrid = useStore((state) => state.setUserDragsGrid); // Fonction pour définir si l'utilisateur fait glisser la grille (etat global)
  const MIN_DRAG_DISTANCE = 7; // Distance minimale de glissement pour commencer à faire glisser la grille

  // L'utilisateur clique : met à jour l'état de mouseDownRef et enregistre la position de la souris
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownRef.current = true;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    mouseDownRef.current = true;
    const touch = e.touches[0];
    lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
  };

  // L'utilisateur déplace la souris :
  // - si pas encore de drag : vérifie si la distance de glissement est suffisante pour commencer à faire glisser la grille
  // - si drag en cours : met à jour la position de la grille en fonction du mouvement de la souris
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseDownRef.current) return;

    const deltaX = e.clientX - lastMousePosition.current.x;
    const deltaY = e.clientY - lastMousePosition.current.y;

    if (!isDragging.current) {
      if (
        Math.abs(deltaX) > MIN_DRAG_DISTANCE ||
        Math.abs(deltaY) > MIN_DRAG_DISTANCE
      ) {
        isDragging.current = true;
        setUserDragsGrid(true);
      }
    } else {
      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!mouseDownRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMousePosition.current.x;
    const deltaY = touch.clientY - lastMousePosition.current.y;

    if (!isDragging.current) {
      if (
        Math.abs(deltaX) > MIN_DRAG_DISTANCE ||
        Math.abs(deltaY) > MIN_DRAG_DISTANCE
      ) {
        isDragging.current = true;
        setUserDragsGrid(true);
      }
    } else {
      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  // L'utilisateur relâche le bouton de la souris ou quitte la zone de la grille :
  // met à jour l'état de isDragging et de userDragsGrid après un court délai
  // pour qu'au relachement du clic (si glissement) le pixel ne change pas de couleur (voir le composant Pixel)
  // sinon le pixel change de couleur à la fin du glissement
  const handleMouseUpOrLeave = () => {
    if (isDragging.current) {
      setTimeout(() => {
        isDragging.current = false;
        setUserDragsGrid(false);
      }, 50);
    }
    mouseDownRef.current = false;
  };

  const handleTouchEnd = () => {
    if (isDragging.current) {
      setTimeout(() => {
        isDragging.current = false;
        setUserDragsGrid(false);
      }, 50);
    }
    mouseDownRef.current = false;
  };

  const gridContainerStyle = {
    padding: '1rem',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  };

  const gridWrapperStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: isDragging.current ? 'none' : 'transform 0.1s ease-out',
  };

  return (
    <div
      id="grid-container"
      role="grid"
      style={gridContainerStyle}
      tabIndex={0} // Add tabIndex attribute to make the grid container focusable
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchEnd={handleTouchEnd}
      ref={gridRef}
    >
      <div id="grid-wrapper" style={gridWrapperStyle}>
        <Grid />
      </div>
    </div>
  );
}

export default GridContainer;

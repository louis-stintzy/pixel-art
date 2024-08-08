import { useCallback, useEffect, useRef, useState } from 'react';
import useStore from '../store/store';

interface Position {
  x: number;
  y: number;
}

function useDragAndDrop(ref: React.RefObject<HTMLElement>) {
  const isDragging = useRef(false); // Référence pour savoir si l'utilisateur fait glisser la grille
  const lastMousePosition = useRef({ x: 0, y: 0 }); // Référence pour stocker la dernière position de la souris
  const mouseDownRef = useRef(false); // Référence pour savoir si le bouton de la souris est enfoncé

  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position de la grille
  const setUserDragsGrid = useStore((state) => state.setUserDragsGrid); // Fonction pour définir si l'utilisateur fait glisser la grille (etat global)
  const MIN_DRAG_DISTANCE = 7; // Distance minimale de glissement pour commencer à faire glisser la grille

  // L'utilisateur clique : met à jour l'état de mouseDownRef et enregistre la position de la souris
  const handleMouseDown = useCallback(
    () => (e: MouseEvent) => {
      mouseDownRef.current = true;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    },
    []
  );

  const handleTouchStart = useCallback(
    () => (e: TouchEvent) => {
      mouseDownRef.current = true;
      const touch = e.touches[0];
      lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
    },
    []
  );

  // L'utilisateur déplace la souris :
  // - si pas encore de drag : vérifie si la distance de glissement est suffisante pour commencer à faire glisser la grille
  // - si drag en cours : met à jour la position de la grille en fonction du mouvement de la souris
  const handleMouseMove = useCallback(
    () => (e: MouseEvent) => {
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
    },
    [setUserDragsGrid]
  );

  const handleTouchMove = useCallback(
    () => (e: TouchEvent) => {
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
    },
    [setUserDragsGrid]
  );

  // L'utilisateur relâche le bouton de la souris ou quitte la zone de la grille :
  // met à jour l'état de isDragging et de userDragsGrid après un court délai
  // pour qu'au relachement du clic (si glissement) le pixel ne change pas de couleur (voir le composant Pixel)
  // sinon le pixel change de couleur à la fin du glissement
  const handleMouseUpOrLeave = useCallback(() => {
    if (isDragging.current) {
      setTimeout(() => {
        isDragging.current = false;
        setUserDragsGrid(false);
      }, 50);
    }
    mouseDownRef.current = false;
  }, [setUserDragsGrid]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging.current) {
      setTimeout(() => {
        isDragging.current = false;
        setUserDragsGrid(false);
      }, 50);
    }
    mouseDownRef.current = false;
  }, [setUserDragsGrid]);

  // Les fonctions déclarées à l'intérieur d'un composant React sont recréées à chaque rendu.
  // Si on utilise une fonction dans le useEffect et que cette fonction est recréée à chaque rendu,
  // cela peut provoquer l'exécution du useEffect inutilement à chaque fois que le composant est rendu.
  // useCallback est un hook qui mémorise une fonction afin qu'elle ne soit pas recréée à chaque rendu,
  // sauf si l'une des dépendances spécifiées change.

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUpOrLeave);
    element.addEventListener('mouseleave', handleMouseUpOrLeave);
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUpOrLeave);
      element.removeEventListener('mouseleave', handleMouseUpOrLeave);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    ref,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
  ]);

  return position;
}

export default useDragAndDrop;

import { useCallback, useEffect, useRef, useState } from 'react';
import useActionFollowingMove from './useActionFollowingMove';

interface Position {
  x: number;
  y: number;
}

function useDragAndDrop(
  ref: React.RefObject<HTMLElement>,
  isActivated = true,
  throttleLimit = 32
) {
  const [isDragging, setIsDragging] = useState(false); // État pour savoir si l'utilisateur fait glisser la grille
  const lastMousePosition = useRef({ x: 0, y: 0 }); // Référence pour stocker la dernière position de la souris
  const [isMouseDown, setIsMouseDown] = useState(false); // État pour savoir si le bouton de la souris est enfoncé
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 }); // Position de la grille
  const MIN_DRAG_DISTANCE = 3; // Distance minimale de glissement pour commencer à faire glisser la grille

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
  };

  // L'utilisateur clique : enregistre la position de la souris
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isActivated) return;
      setIsMouseDown(true);
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    },
    [isActivated]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!isActivated) return;
      setIsMouseDown(true);
      const touch = e.touches[0];
      lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
    },
    [isActivated]
  );

  // L'utilisateur déplace la souris :
  // - si pas encore de drag : vérifie si la distance de glissement est suffisante pour commencer à faire glisser la grille
  // - si drag en cours : met à jour la position de la grille en fonction du mouvement de la souris

  // ----- handleDragProgress

  // const token = useRef<string>(
  //   `useDAD-T${Date.now().toString()}-R${Math.floor(Math.random() * 1000)}`
  // ).current;

  const lastRanRef = useRef<number | undefined>(undefined);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const cbShouldNotRun = !isMouseDown;

  const updatePosition = (deltaX: number, deltaY: number) => {
    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
  };

  const executeMouseLogic = useCallback(
    (e: MouseEvent | MouseEvent) => {
      // console.log('executeMouseLogic dans useDAD, date.now() : ', Date.now());
      const deltaX = e.clientX - lastMousePosition.current.x;
      const deltaY = e.clientY - lastMousePosition.current.y;

      if (!isDragging) {
        if (
          Math.abs(deltaX) > MIN_DRAG_DISTANCE ||
          Math.abs(deltaY) > MIN_DRAG_DISTANCE
        ) {
          setIsDragging(true);
        }
      } else {
        updatePosition(deltaX, deltaY);
        lastMousePosition.current = { x: e.clientX, y: e.clientY };
      }
    },
    [isDragging]
  );

  const executeTouchLogic = useCallback(
    (e: TouchEvent | TouchEvent) => {
      // console.log('executeTouchLogic dans useDAD, date.now() : ', Date.now());
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastMousePosition.current.x;
      const deltaY = touch.clientY - lastMousePosition.current.y;

      if (!isDragging) {
        if (
          Math.abs(deltaX) > MIN_DRAG_DISTANCE ||
          Math.abs(deltaY) > MIN_DRAG_DISTANCE
        ) {
          setIsDragging(true);
        }
      } else {
        updatePosition(deltaX, deltaY);
        lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
      }
    },
    [isDragging]
  );

  const handleDragProgress = useActionFollowingMove(
    // token,
    lastRanRef,
    timeoutRef,
    throttleLimit,
    cbShouldNotRun,
    executeMouseLogic,
    executeTouchLogic
  );

  // Je n'ai pas réussi à faire fonctionner le cleanup des timeouts restants (le dernier timeout s'il n'est pas clear via useThrottledExecution). Le throttle est de 32ms, "peu de risque" que le timeout ne soit pas clear
  // useEffect(() => {
  //   return () => {
  //     clearTimeouts();
  //   };
  // }, [clearTimeouts]);

  // ----------

  // L'utilisateur relâche le bouton de la souris ou quitte la zone de la grille :
  // met à jour l'état de isDragging et de userDragsGrid après un court délai
  // pour qu'au relachement du clic (si glissement) le pixel ne change pas de couleur (voir le composant Pixel)
  // sinon le pixel change de couleur à la fin du glissement
  const handleMouseUpOrLeave = useCallback(() => {
    if (isDragging) {
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    }
    setIsMouseDown(false);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    }
    setIsMouseDown(false);
  }, [isDragging]);

  // Les fonctions déclarées à l'intérieur d'un composant React sont recréées à chaque rendu.
  // Si on utilise une fonction dans le useEffect et que cette fonction est recréée à chaque rendu,
  // cela peut provoquer l'exécution du useEffect inutilement à chaque fois que le composant est rendu.
  // useCallback est un hook qui mémorise une fonction afin qu'elle ne soit pas recréée à chaque rendu,
  // sauf si l'une des dépendances spécifiées change.

  useEffect(() => {
    const element = ref.current;

    if (!element) return undefined;

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleDragProgress);
    element.addEventListener('mouseup', handleMouseUpOrLeave);
    element.addEventListener('mouseleave', handleMouseUpOrLeave);
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleDragProgress);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleDragProgress);
      element.removeEventListener('mouseup', handleMouseUpOrLeave);
      element.removeEventListener('mouseleave', handleMouseUpOrLeave);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleDragProgress);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    ref,
    handleMouseDown,
    handleMouseUpOrLeave,
    handleTouchEnd,
    handleDragProgress,
    handleTouchStart,
  ]);

  return { position, isDragging, resetPosition };
}

export default useDragAndDrop;

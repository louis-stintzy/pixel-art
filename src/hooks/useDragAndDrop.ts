import { useCallback, useEffect, useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

function useDragAndDrop(
  ref: React.RefObject<HTMLElement>,
  isActivated = true,
  throttleLimit = 4
) {
  const [isDragging, setIsDragging] = useState(false); // État pour savoir si l'utilisateur fait glisser la grille
  const lastMousePosition = useRef({ x: 0, y: 0 }); // Référence pour stocker la dernière position de la souris
  const mouseDownRef = useRef(false); // Référence pour savoir si le bouton de la souris est enfoncé

  const lastRanMouseRef = useRef<number | undefined>(undefined);
  const lastFuncMouseRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const lastRanTouchRef = useRef<number | undefined>(undefined);
  const lastFuncTouchRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  // const countRef = useRef(0);

  const [position, setPosition] = useState<Position>({ x: 0, y: 0 }); // Position de la grille
  const MIN_DRAG_DISTANCE = 7; // Distance minimale de glissement pour commencer à faire glisser la grille

  // L'utilisateur clique : met à jour l'état de mouseDownRef et enregistre la position de la souris
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isActivated) return;
      // console.log('throwleLimit : ', throttleLimit);
      // countRef.current = 0;
      mouseDownRef.current = true;
      lastMousePosition.current = { x: e.clientX, y: e.clientY };
    },
    [isActivated]
  );

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!isActivated) return;
      mouseDownRef.current = true;
      const touch = e.touches[0];
      lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
    },
    [isActivated]
  );

  const updatePosition = (deltaX: number, deltaY: number) => {
    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
  };

  const executeMouseLogic = useCallback(
    (e: MouseEvent) => {
      // countRef.current += 1;
      //-----
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
      //-----
    },
    [isDragging]
  );

  // L'utilisateur déplace la souris :
  // - si pas encore de drag : vérifie si la distance de glissement est suffisante pour commencer à faire glisser la grille
  // - si drag en cours : met à jour la position de la grille en fonction du mouvement de la souris
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Si le bouton de la souris n'est pas enfoncé, ne rien faire
      if (!mouseDownRef.current) return;

      // console.log('countRef.current : ', countRef.current);

      requestAnimationFrame(() => {
        // Logique de throttling : voir src/utils/throttle.ts
        // Si la fonction n'a jamais été exécutée ou si le délai entre deux exécutions est supérieur au délai limite,
        if (
          !lastRanMouseRef.current ||
          Date.now() - lastRanMouseRef.current >= throttleLimit
        ) {
          // console.log(`Premier passage ou délai dépassé => executeMouseLogic `);
          lastRanMouseRef.current = Date.now();
          executeMouseLogic(e);
        } else {
          // Sinon (si le délai entre deux exécutions est inférieur au délai limite),
          // console.log(
          //   `Délai non respecté => nouveau timer, temps restant : ${
          //     throttleLimit - (Date.now() - lastRanMouseRef.current)
          //   }`
          // );
          // Efface le dernier setTimeout
          if (lastFuncMouseRef.current !== undefined)
            clearTimeout(lastFuncMouseRef.current);
          // Définit un nouveau timer pour exécuter la fonction après un certain délai
          lastFuncMouseRef.current = setTimeout(() => {
            lastRanMouseRef.current = Date.now();
            // console.log(`Délai respecté => executeMouseLogic dans le timer`);
            executeMouseLogic(e);
          }, throttleLimit - (Date.now() - lastRanMouseRef.current));
          // Fin de la logique de throttling
        }
      });
    },
    [executeMouseLogic, throttleLimit]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!mouseDownRef.current) return;

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
        requestAnimationFrame(() => updatePosition(deltaX, deltaY));
        lastMousePosition.current = { x: touch.clientX, y: touch.clientY };
      }
    },
    [isDragging]
  );

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
    mouseDownRef.current = false;
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    }
    mouseDownRef.current = false;
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

  return { position, isDragging };
}

export default useDragAndDrop;

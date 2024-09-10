/* eslint-disable no-param-reassign */
// désactive la règle ESLint no-param-reassign pour permettre la modification de la propriété current de la référence

import { useCallback, useEffect } from 'react';

type ThrottledExecutionOptions = {
  lastRanRef: React.MutableRefObject<number | undefined>;
  timeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>;
  throttleLimit?: number;
  cbShouldNotRun: boolean;
  cb: {
    function: {
      forMouseEvent?: (e: React.MouseEvent | MouseEvent, args?: any[]) => void;
      forTouchEvent?: (e: React.TouchEvent | TouchEvent, args?: any[]) => void;
      forNoEvent?: (args?: any[]) => void;
    };
    args: {
      array?: any[];
      mouseEvent?: React.MouseEvent | MouseEvent;
      touchEvent?: React.TouchEvent | TouchEvent;
    };
  };
};

function useThrottledExecution() {
  // throttledExecution est une fonction qui permet de limiter le nombre d'appels à une fonction
  const throttledExecution = useCallback(
    ({
      lastRanRef,
      timeoutRef,
      throttleLimit = 32,
      cbShouldNotRun,
      cb,
    }: ThrottledExecutionOptions) => {
      if (cbShouldNotRun || !cb.function) return; // Si la fonction ne doit pas être exécutée ou si la fonction n'est pas définie, ne rien faire

      const { forMouseEvent, forTouchEvent, forNoEvent } = cb.function; // Destructuration de la fonction
      const { mouseEvent, touchEvent, array } = cb.args; // Destructuration des arguments

      const executeCallback = () => {
        if (forMouseEvent && mouseEvent) {
          forMouseEvent(mouseEvent, array);
        } else if (forTouchEvent && touchEvent) {
          forTouchEvent(touchEvent, array);
        } else if (forNoEvent) {
          forNoEvent(array);
        }
      };

      // les assignations sur les refs se répercutent sur les autres appels de la fonction (composant qui utilise le hook en passant les refs en paramètre)
      requestAnimationFrame(() => {
        const lastRan = lastRanRef.current || 0; // Enregistre le moment où la fonction a été exécutée pour la dernière fois pour ce token
        // requestAnimationFrame: permet de synchroniser l'exécution d'une fonction avec le rafraîchissement de l'écran
        if (!lastRan || Date.now() - lastRan >= throttleLimit) {
          // Si la fonction n'a jamais été exécutée ou si le délai entre deux exécutions est supérieur au délai limite
          lastRanRef.current = Date.now(); // Enregistre le moment où la fonction va être exécutée
          executeCallback();
        } else {
          // Sinon (si le délai entre deux exécutions est inférieur au délai limite)
          const remainingTime = throttleLimit - (Date.now() - lastRan); // Calcule le temps restant avant l'exécution de la fonction
          // Si une autre exécution est en attente, l'annuler avant d'en créer une nouvelle
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            lastRanRef.current = Date.now(); // Enregistre le moment où la fonction va être exécutée
            timeoutRef.current = undefined; // Réinitialise le timeout (puisque la fonction a été exécutée)
            executeCallback();
          }, remainingTime);
        }
      });
    },
    []
  );

  // Cleanup des timeouts
  useEffect(() => {
    return () => {
      console.log('CLEANUP');
    };
  }, []);

  return { throttledExecution };
}

export default useThrottledExecution;

import { useCallback, useEffect, useMemo, useRef } from 'react';

type ThrottledExecutionOptions = {
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
  // Stocker les timeouts dans une WeakMap (clé: objet, valeur: setTimeout) pour pouvoir les nettoyer plus tard
  const timeoutsMap = useMemo(
    () => new WeakMap<object, ReturnType<typeof setTimeout>>(),
    []
  );
  // stocke l'heure à laquelle la fonction a été exécutée pour la dernière fois (en millisecondes)
  const lastRanRef = useRef<number | undefined>(undefined);

  const lastFuncRef =
    useRef<(e: React.MouseEvent | MouseEvent) => void | undefined>(undefined);
  const defineFunction = useCallback(({ cb }: ThrottledExecutionOptions) => {
    console.log('cb.function', cb.function);
    lastFuncRef.current = cb.function;
  }, []);

  // const cbRef = useRef(cb);
  // useEffect(() => {
  //   cbRef.current = cb;
  // }, [cb]);

  // throttledExecution est une fonction qui permet de limiter le nombre d'appels à une fonction
  const throttledExecution = useCallback(
    ({ throttleLimit = 32, cbShouldNotRun, cb }: ThrottledExecutionOptions) => {
      if (cbShouldNotRun || !cb.function) return; // Si la fonction ne doit pas être exécutée ou si la fonction n'est pas définie, ne rien faire

      // let lastFunc: ReturnType<typeof setTimeout>; // stocke le setTimeout => remplacé par timeoutsMap

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

      requestAnimationFrame(() => {
        // requestAnimationFrame: permet de synchroniser l'exécution d'une fonction avec le rafraîchissement de l'écran
        if (
          !lastRanRef.current ||
          Date.now() - lastRanRef.current >= throttleLimit
        ) {
          // Si la fonction n'a jamais été exécutée ou si le délai entre deux exécutions est supérieur au délai limite
          lastRanRef.current = Date.now(); // Enregistre le moment où la fonction a été exécutée
          executeCallback();
        } else {
          console.log('throttle');
          // Sinon (si le délai entre deux exécutions est inférieur au délai limite)
          console.log('lasFuncRef', lastFuncRef.current);
          console.log(
            'timeout HAS cb.function : ',
            timeoutsMap.has(cb.function)
          );

          // Si une autre exécution est en attente, l'annuler avant d'en créer une nouvelle
          if (timeoutsMap.has(cb.function)) {
            const timeout = timeoutsMap.get(cb.function);
            if (timeout) clearTimeout(timeout);
          }
          const timeout = setTimeout(() => {
            lastRanRef.current = Date.now();
            executeCallback();
          }, throttleLimit - (Date.now() - lastRanRef.current));

          console.log('cb object reference:', cb.function);
          timeoutsMap.set(cb.function, timeout); // Enregistre le setTimeout lié à ce callback dans la WeakMap
        }
      });
    },
    [timeoutsMap]
  );

  const clearThrottledExecution = ({ cb }: ThrottledExecutionOptions) => {
    if (timeoutsMap.has(cb.function)) {
      const timeout = timeoutsMap.get(cb.function);
      if (timeout) clearTimeout(timeout);
    }
    timeoutsMap.delete(cb.function);
  };

  return { defineFunction, throttledExecution, clearThrottledExecution };
}

export default useThrottledExecution;

import { useCallback, useEffect, useMemo, useRef } from 'react';

type ThrottledExecutionOptions = {
  token: string;
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
  const timeoutsMap = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map()
  );

  // stocke l'heure à laquelle la fonction a été exécutée pour la dernière fois (en millisecondes)
  const lastRanRef = useRef<number | undefined>(undefined);

  // const lastFuncRef =
  //   useRef<(e: React.MouseEvent | MouseEvent) => void | undefined>(undefined);
  // const defineFunction = useCallback(({ cb }: ThrottledExecutionOptions) => {
  //   console.log('ICI');
  //   lastFuncRef.current = cb.function;
  // }, []);

  // const cbRef = useRef(cb);
  // useEffect(() => {
  //   cbRef.current = cb;
  // }, [cb]);

  // throttledExecution est une fonction qui permet de limiter le nombre d'appels à une fonction
  const throttledExecution = useCallback(
    ({
      token,
      throttleLimit = 32,
      cbShouldNotRun,
      cb,
    }: ThrottledExecutionOptions) => {
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
          console.log('----------------------1ere execution');
          // Si la fonction n'a jamais été exécutée ou si le délai entre deux exécutions est supérieur au délai limite
          lastRanRef.current = Date.now(); // Enregistre le moment où la fonction a été exécutée
          executeCallback();
        } else {
          console.log('throttle - token:', token);
          // Sinon (si le délai entre deux exécutions est inférieur au délai limite)
          // console.log('lasFuncRef', lastFuncRef.current);
          console.log('timeout HAS token : ', timeoutsMap.current.has(token));

          // Si une autre exécution est en attente, l'annuler avant d'en créer une nouvelle
          if (timeoutsMap.current.has(token)) {
            const timeout = timeoutsMap.current.get(token);
            if (timeout) clearTimeout(timeout);
            console.log('clearTimeout');
          }
          const timeout = setTimeout(() => {
            lastRanRef.current = Date.now();
            executeCallback();
          }, throttleLimit - (Date.now() - lastRanRef.current));

          timeoutsMap.current.set(token, timeout); // Enregistre le setTimeout lié à ce callback dans la WeakMap, non Map
          console.log('timeoutsMap.current suite SET', timeoutsMap.current);
        }
      });
    },
    []
  );

  // on pourra faire useEffect avec clearThrottledExecution pour nettoyer les timeouts ou boucle dans Map ?

  const clearThrottledExecution = ({
    token,
    cb,
  }: ThrottledExecutionOptions) => {
    const callback = cb.function.forMouseEvent || cb.function.forTouchEvent;
    if (timeoutsMap.current.has(token)) {
      const timeout = timeoutsMap.current.get(token);
      if (timeout) clearTimeout(timeout);
    }
    timeoutsMap.current.delete(token);
  };

  return { throttledExecution, clearThrottledExecution };
}

export default useThrottledExecution;

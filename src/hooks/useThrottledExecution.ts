import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  addToken,
  getTokenData,
  getTokenStore,
  updateTokenData,
  clearTokenData,
} from '../utils/tokenStore';

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
  // const lastRanRef = useRef<Record<string, number>>({});
  // const timeoutRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // todo : adapter commentaire : là c'est Map avec token en key et l'objet lastRan/timeout .Stocker les timeouts dans une WeakMap (clé: objet, valeur: setTimeout) pour pouvoir les nettoyer plus tard
  // const refsMap = useRef<
  //   Map<
  //     string,
  //     {
  //       lastRanRef: number | undefined;
  //       timeoutRef: ReturnType<typeof setTimeout> | null;
  //     }
  //   >
  // >(new Map());
  // console.log('-------------------------timeoutsMap', refsMap.current);

  // stocke l'heure à laquelle la fonction a été exécutée pour la dernière fois (en millisecondes)
  // const lastRanRef = useRef<Record<string, number>>({});

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
      // console.log('----UTILISATION DE : useThrottledExecution - TOKEN:', token);
      // console.log(getTokenStore());
      addToken(token); // Ajoute le token à la Map (verif si existe déjà dans la fonction)
      // let lastFunc: ReturnType<typeof setTimeout>; // stocke le setTimeout => remplacé par timeoutsMap

      const { forMouseEvent, forTouchEvent, forNoEvent } = cb.function; // Destructuration de la fonction
      const { mouseEvent, touchEvent, array } = cb.args; // Destructuration des arguments

      const executeCallback = () => {
        // console.log(
        //   'EXECUTE CALLBACK, token',
        //   token,
        //   ' - date.now() :',
        //   Date.now()
        // );
        if (forMouseEvent && mouseEvent) {
          forMouseEvent(mouseEvent, array);
        } else if (forTouchEvent && touchEvent) {
          forTouchEvent(touchEvent, array);
        } else if (forNoEvent) {
          forNoEvent(array);
        }
      };

      // Vérification si une référence existe déjà pour ce token
      // if (!refsMap.current.has(token)) {
      //   refsMap.current.set(token, {
      //     lastRanRef: undefined,
      //     timeoutRef: null,
      //   });
      // }
      // Récupération des références pour ce token
      // const lastRanRef = refsMap.current.get(token)?.lastRanRef;
      // const timeoutRef = refsMap.current.get(token)?.timeoutRef;
      const tokenData = getTokenData(token);
      const lastRanRef = tokenData?.lastRanRef;
      const timeoutRef = tokenData?.timeoutRef;

      requestAnimationFrame(() => {
        const lastRan = lastRanRef || 0; // Enregistre le moment où la fonction a été exécutée pour la dernière fois pour ce token
        // requestAnimationFrame: permet de synchroniser l'exécution d'une fonction avec le rafraîchissement de l'écran
        if (!lastRan || Date.now() - lastRan >= throttleLimit) {
          // Si la fonction n'a jamais été exécutée ou si le délai entre deux exécutions est supérieur au délai limite
          // Enregistre le moment où la fonction va être exécutée
          // refsMap.current.set(token, {
          //   lastRanRef: Date.now(),
          //   timeoutRef: null,
          // });
          const now = Date.now();
          updateTokenData(token, { lastRanRef: now, timeoutRef: null });
          executeCallback();
        } else {
          // console.log('FONCTION THROTTLE, timeoutsMap :', refsMap.current);
          const remainingTime = throttleLimit - (Date.now() - lastRan);
          // Sinon (si le délai entre deux exécutions est inférieur au délai limite)
          // console.log('lasFuncRef', lastFuncRef.current);

          // Si une autre exécution est en attente, l'annuler avant d'en créer une nouvelle
          if (timeoutRef) {
            // console.log('déjà un timeoutRef, BEFORE CLEAR :', timeoutRef);
            clearTimeout(timeoutRef);
            // console.log('timeoutsMap AFTER CLEAR', timeoutsMap.current);
          }
          const newTimeout = setTimeout(() => {
            // refsMap.current.set(token, {
            //   lastRanRef: Date.now(), // enregistrera le moment où la fonction sera exécutée
            //   timeoutRef: null,
            // });
            const now = Date.now();
            updateTokenData(token, {
              lastRanRef: now,
              timeoutRef: null,
            });
            executeCallback();
          }, remainingTime);
          // console.log(
          //   `New timeout set for token: ${token} with timeout ID: ${newTimeout} and will execute in: ${remainingTime}ms`
          // );
          updateTokenData(token, { lastRanRef, timeoutRef: newTimeout }); // Enregistre le setTimeout lié à ce callback dans la Map, lastRan peut rester l'ancienne valeur, ce qui compte c'est Date.now() dans le setTimeout
          // console.log('timeoutsMap AFTER SET', refsMap.current);
        }
      });

      // console.log(
      //   '----FIN UTILISATION DE : useThrottledExecution - TOKEN:',
      //   token
      // );
    },
    []
  );

  // on pourra faire useEffect avec clearThrottledExecution pour nettoyer les timeouts ou boucle dans Map ?

  // const clearThrottledExecution = ({ token }: ThrottledExecutionOptions) => {
  //   const tokenData = refsMap.current.get(token);
  //   if (tokenData?.timeoutRef) {
  //     clearTimeout(tokenData?.timeoutRef);
  //   }
  //   refsMap.current.delete(token);
  // };

  return { throttledExecution };
}

export default useThrottledExecution;

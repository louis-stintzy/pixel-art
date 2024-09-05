type ThrottledExecutionOptions = {
  throttleLimit?: number;
  cbShouldNotRun: boolean;
  cb: {
    function: {
      forMouseEvent?: (e: React.MouseEvent, args?: any[]) => void;
      forTouchEvent?: (e: React.TouchEvent, args?: any[]) => void;
      forNoEvent?: (args?: any[]) => void;
    };
    args: {
      array?: any[];
      mouseEvent?: React.MouseEvent;
      touchEvent?: React.TouchEvent;
    };
  };
};

// note: throttledExecution est une fonction qui permet de limiter le nombre d'appels à une fonction
const throttledExecution = ({
  throttleLimit = 32,
  cbShouldNotRun,
  cb,
}: ThrottledExecutionOptions) => {
  if (cbShouldNotRun || !cb.function) return; // Si la fonction ne doit pas être exécutée ou si la fonction n'est pas définie, ne rien faire

  let lastRan: number | undefined; // stocke l'heure à laquelle la fonction a été exécutée pour la dernière fois (en millisecondes)
  let lastFunc: ReturnType<typeof setTimeout>; // stocke le setTimeout

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
    if (!lastRan || Date.now() - lastRan >= throttleLimit) {
      // Si la fonction n'a jamais été exécutée ou si le délai entre deux exécutions est supérieur au délai limite
      lastRan = Date.now(); // Enregistre le moment où la fonction a été exécutée
      executeCallback();
    } else {
      // Sinon (si le délai entre deux exécutions est inférieur au délai limite)
      if (lastFunc) clearTimeout(lastFunc); // Efface le dernier setTimeout
      lastFunc = setTimeout(() => {
        lastRan = Date.now();
        executeCallback();
      }, throttleLimit - (Date.now() - lastRan)); // Définit un nouveau timer pour exécuter la fonction après un certain délai
    }
  });
};

export default throttledExecution;

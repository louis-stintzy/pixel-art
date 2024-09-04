// note: throttle est une fonction qui permet de limiter le nombre d'appels à une fonction
const throttledExecution = (
  throttleLimit: number,
  cbShouldNotRun: boolean,
  cb: {
    forMouseEvent: (args: any[], e?: MouseEvent) => void | undefined;
    forTouchEvent: (args: any[], e?: TouchEvent) => void | undefined;
  },
  args: {
    forMouseEvent: {
      args: any[];
      event: MouseEvent | undefined;
    };
    forTouchEvent: {
      args: any[];
      event: TouchEvent | undefined;
    };
  }
) => {
  if (cbShouldNotRun || (!cb.forMouseEvent && !cb.forTouchEvent)) return;

  let lastRan: number | undefined; // stocke l'heure à laquelle la fonction a été exécutée pour la dernière fois (en millisecondes)
  let lastFunc: ReturnType<typeof setTimeout>; // stocke le setTimeout

  const executeCallback = () => {
    if (cb.forMouseEvent && args.forMouseEvent.event)
      cb.forMouseEvent(args.forMouseEvent.args, args.forMouseEvent.event);
    if (cb.forMouseEvent && !args.forMouseEvent.event)
      cb.forMouseEvent(args.forMouseEvent.args);
    if (cb.forTouchEvent && args.forTouchEvent.event)
      cb.forTouchEvent(args.forTouchEvent.args, args.forTouchEvent.event);
    if (cb.forTouchEvent && !args.forTouchEvent.event)
      cb.forTouchEvent(args.forTouchEvent.args);
  };

  requestAnimationFrame(() => {
    if (!lastRan || Date.now() - lastRan >= throttleLimit) {
      lastRan = Date.now();
      executeCallback();
    } else {
      if (lastFunc) clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        lastRan = Date.now();
        executeCallback();
      }, throttleLimit - (Date.now() - lastRan));
    }
  });

  // let lastRan: number | undefined;
  // let lastFunc: ReturnType<typeof setTimeout> | undefined;

  // return function (this: any, ...args: [e: MouseEvent] | [e: TouchEvent]) {
  //   if (!lastRan || Date.now() - lastRan >= throttleLimit) {
  //     lastRan = Date.now();
  //     callback.apply(this, args);
  //   } else {
  //     if (lastFunc) clearTimeout(lastFunc);
  //     lastFunc = setTimeout(() => {
  //       lastRan = Date.now();
  //       callback.apply(this, args);
  //     }, throttleLimit - (Date.now() - lastRan));
  //   }
  // };
};

// const throttle = (
//   func: ((e: MouseEvent) => void) | ((e: TouchEvent) => void),
//   limit: number
// ) => {
//   let lastFunc: ReturnType<typeof setTimeout>; // stocke le setTimeout
//   let lastRan: number | undefined; // stocke l'heure à laquelle la fonction a été exécutée pour la dernière fois (en millisecondes)

//   return function (this: any, ...args: [e: MouseEvent] | [e: TouchEvent]) {
//     // 'this: any' : préserve le contexte de la fonction, '...args: any[]' : capture tous les arguments passés à la fonction throttle et les passe à la fonction 'func'
//     if (!lastRan) {
//       // Si la fonction n'a jamais été exécutée
//       func.apply(this, args); // Exécute la fonction 'func' avec les arguments 'args'
//       lastRan = Date.now(); // Enregistre le moment où la fonction a été exécutée
//     } else {
//       // Si la fonction a déjà été exécutée
//       clearTimeout(lastFunc); // Efface le dernier setTimeout
//       lastFunc = setTimeout(() => {
//         // Définit un nouveau timer pour exécuter la fonction après un certain délai
//         if (lastRan) {
//           if (Date.now() - lastRan >= limit) {
//             // Vérifie si le temps écoulé depuis la dernière exécution est supérieur ou égal à la limite définie
//             func.apply(this, args); // Si oui : exécute la fonction,
//             lastRan = Date.now(); // et enregistre le moment où la fonction a été exécutée
//           }
//         }
//       }, limit - (Date.now() - lastRan)); // Calcule le temps restant avant que la fonction puisse être exécutée à nouveau
//     }
//   };
// };

export default throttledExecution;

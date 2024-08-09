// note: throttle est une fonction qui permet de limiter le nombre d'appels à une fonction
// note: en raison de problèmes de typage et de dépendances, la fonction throttle est directement codée dans le hook useDragAndDrop
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

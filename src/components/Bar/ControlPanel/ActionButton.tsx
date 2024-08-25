import { useEffect, useRef, useState } from 'react';
import useStore from '../../../store/store';

interface ActionButtonProps {
  id: string;
  buttonStyle?: React.CSSProperties;
  deactivate?: {
    subscribeToState?: string; // le nom de l'état du store à s'abonner (si nécessaire) - ici, il faut que le changement d'état du state génère une nouvelle évaluation de shouldDeactivate
    shouldDeactivate: () => boolean; // la fonction pour évaluer si le bouton doit être désactivé
  };
  iconSrcMode1: string;
  iconSrcMode2: string;
  tooltipMode1?: string;
  tooltipMode2?: string;
  labelMode1: string;
  labelMode2: string;
  isInMode2: () => boolean; // une fonction car permet de réévaluer la condition
  switchToMode1: () => void;
  switchToMode2: () => void;
}

function ActionButton({
  id,
  buttonStyle = {},
  deactivate = {
    shouldDeactivate: () => false,
  },
  iconSrcMode1,
  iconSrcMode2,
  tooltipMode1,
  tooltipMode2,
  labelMode1,
  labelMode2,
  isInMode2,
  switchToMode1,
  switchToMode2,
}: ActionButtonProps) {
  const [isDisabled, setIsDisabled] = useState(
    deactivate ? deactivate.shouldDeactivate() : false
  ); // si deactivate est fourni, on initialise isDisabled avec le résultat de shouldDeactivate(), sinon isDisabled est initialisé à false
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutId = useRef<number | null>(null);
  const isInMode2State = useStore(isInMode2);

  const handleClick = () => {
    if (isDisabled) return;
    setIsFadingOut(true);
    timeoutId.current = window.setTimeout(() => {
      // window.setTimeout() vs setTimeout() : en typescript, setTimeout() peut être du type NodeJS.Timeout ou number, window.setTimeout() est toujours du type number
      if (isInMode2State) {
        switchToMode1();
      } else {
        switchToMode2();
      }
      setIsFadingOut(false);
    }, 100);
  };

  // useEffect s'abonne aux changements de l'état du store définis par `subscribeToState`.
  // Lorsqu'une modification est détectée, `shouldDeactivate` est évalué pour déterminer si le bouton doit être désactivé.
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (deactivate?.subscribeToState) {
      const { subscribeToState, shouldDeactivate } = deactivate;

      // subscribe permet d'écouter les changements d'une propriété spécifique du store.
      // Chaque fois que cette propriété change, une fonction de rappel (callback) est déclenchée.
      // => useStore.subscribe déclenche une réévaluation de shouldDeactivate lorsque la propriété correspondant à subscribeToState change mettant ainsi à jour isDisabled

      // La fonction passée à `useStore.subscribe` renvoie la valeur de la propriété `subscribeToState` du store.
      // Cette valeur n'est pas directement utilisée, mais permet de déclencher la réévaluation de `shouldDeactivate`.

      // "value" retourné par la première fonction est utilisé par Zustand pour comparer les valeurs entre les rendus. Si la valeur retournée est différemmente d'un rendu à l'autre, Zustand sait qu'il doit exécuter le callback.
      // Le "return" de "value" ne signifie pas qu'on l'utilisera directement dans le composant, mais que Zustand l'utilise en interne pour déterminer si un changement s'est produit.
      // useStore.subscribe retourne toujours unsubscribe, qui est une fonction qui permet de se désabonner du store.

      unsubscribe = useStore.subscribe((state) => {
        const value = state[subscribeToState as keyof typeof state];
        if (shouldDeactivate()) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
        return value;
      });
    }

    // Nettoyage de l'abonnement et du délai d'exécution du setTimeout
    return () => {
      if (unsubscribe) unsubscribe(); // useStore.subscribe retourne une fonction (unsubscribe)
      if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    };
  }, [deactivate]);

  // Sélectionne l'icône et le tooltip en fonction de l'état actuel (`isInMode2`).
  // `iconSrcCurrentAction` et `tooltip` reflètent l'état courant,
  // tandis que `iconSrcNextAction` montre l'action à venir après le clic.

  const iconSrcCurrentAction = isInMode2State ? iconSrcMode2 : iconSrcMode1;
  const iconSrcArrow =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQiPjxwYXRoIGQ9Im05IDE4IDYtNi02LTYiLz48L3N2Zz4=';
  const iconSrcNextAction = isInMode2State ? iconSrcMode1 : iconSrcMode2;

  let tooltip: string | undefined;
  if (tooltipMode1 && tooltipMode2) {
    tooltip = isInMode2State ? tooltipMode2 : tooltipMode1;
  }

  const label = isInMode2State ? labelMode2 : labelMode1;

  const IconStyle = {
    display: 'flex',
    justifyContent: 'center',
    width: '5rem',
    opacity: isFadingOut ? 0 : 1,
    transition: 'opacity 0.1s ease-out',
  };

  return (
    <button
      id={id}
      type="button"
      style={buttonStyle}
      onClick={handleClick}
      disabled={isDisabled}
      title={tooltip}
      aria-label={label}
    >
      <div style={IconStyle}>
        <img src={iconSrcCurrentAction} alt="Current action icon" />
        <img src={iconSrcArrow} alt="Arrow icon" />
        <img src={iconSrcNextAction} alt="Next action icon" />
      </div>
    </button>
  );
}

ActionButton.defaultProps = {
  deactivate: {
    shouldDeactivate: () => false,
  },
  buttonStyle: {},
  tooltipMode1: undefined,
  tooltipMode2: undefined,
};

export default ActionButton;

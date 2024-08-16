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
  );
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutId = useRef<number | null>(null);

  const handleClick = () => {
    if (isDisabled) return;
    setIsFadingOut(true);
    timeoutId.current = window.setTimeout(() => {
      // window.setTimeout() vs setTimeout() : en typescript, setTimeout() peut être du type NodeJS.Timeout ou number, window.setTimeout() est toujours du type number
      if (isInMode2()) {
        switchToMode1();
      } else {
        switchToMode2();
      }
      setIsFadingOut(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    };
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (deactivate?.subscribeToState) {
      const { subscribeToState, shouldDeactivate } = deactivate;

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
    return () => {
      if (unsubscribe) unsubscribe(); // useStore.subscribe retourne une fonction (unsubscribe)
    };
  }, [deactivate]);

  const iconSrcCurrentAction = isInMode2() ? iconSrcMode2 : iconSrcMode1;
  const iconSrcArrow =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQiPjxwYXRoIGQ9Im05IDE4IDYtNi02LTYiLz48L3N2Zz4=';
  const iconSrcNextAction = isInMode2() ? iconSrcMode1 : iconSrcMode2;

  let tooltip: string | undefined;
  if (tooltipMode1 && tooltipMode2) {
    tooltip = isInMode2() ? tooltipMode2 : tooltipMode1;
  }

  const label = isInMode2() ? labelMode2 : labelMode1;

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

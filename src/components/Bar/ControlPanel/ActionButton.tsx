import { useEffect, useRef, useState } from 'react';

interface ActionButtonProps {
  id: string;
  buttonStyle?: React.CSSProperties;
  isDisabled?: boolean;
  iconSrcAction1: string;
  iconSrcAction2: string;
  tooltipAction1?: string;
  tooltipAction2?: string;
  labelAction1: string;
  labelAction2: string;
  conditionForAction2: () => boolean; // une fonction car permet de réévaluer la condition pour l'action 2
  onAction1: () => void;
  onAction2: () => void;
}

function ActionButton({
  id,
  buttonStyle = {},
  isDisabled = false,
  iconSrcAction1,
  iconSrcAction2,
  tooltipAction1,
  tooltipAction2,
  labelAction1,
  labelAction2,
  conditionForAction2,
  onAction1,
  onAction2,
}: ActionButtonProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutId = useRef<number | null>(null);

  const handleClick = () => {
    if (isDisabled) return;
    setIsFadingOut(true);
    timeoutId.current = window.setTimeout(() => {
      // window.setTimeout() vs setTimeout() : en typescript, setTimeout() peut être du type NodeJS.Timeout ou number, window.setTimeout() est toujours du type number
      if (conditionForAction2()) {
        onAction1();
      } else {
        onAction2();
      }
      setIsFadingOut(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current !== null) clearTimeout(timeoutId.current);
    };
  }, []);

  const iconSrcCurrentAction = conditionForAction2()
    ? iconSrcAction2
    : iconSrcAction1;
  const iconSrcArrow =
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQiPjxwYXRoIGQ9Im05IDE4IDYtNi02LTYiLz48L3N2Zz4=';
  const iconSrcNextAction = conditionForAction2()
    ? iconSrcAction1
    : iconSrcAction2;

  let tooltip: string | undefined;
  if (tooltipAction1 && tooltipAction2) {
    tooltip = conditionForAction2() ? tooltipAction2 : tooltipAction1;
  }

  const label = conditionForAction2() ? labelAction2 : labelAction1;

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
  isDisabled: false,
  buttonStyle: {},
  tooltipAction1: undefined,
  tooltipAction2: undefined,
};

export default ActionButton;

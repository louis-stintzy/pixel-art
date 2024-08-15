import { useEffect, useRef, useState } from 'react';

interface ActionButtonProps {
  id: string;
  buttonStyle?: React.CSSProperties;
  isDisabled?: boolean;
  condition: boolean;
  iconSrcAction1: string;
  iconSrcAction2: string;
  onAction1: () => void;
  onAction2: () => void;
}

function ActionButton({
  id,
  buttonStyle = {},
  isDisabled = false,
  condition,
  iconSrcAction1,
  iconSrcAction2,
  onAction1,
  onAction2,
}: ActionButtonProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutId = useRef<number | null>(null);

  const handleClick = () => {
    if (isDisabled) return;
    setIsFadingOut(true);
    timeoutId.current = window.setTimeout(() => {
      if (condition) {
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

  const iconSrc = condition ? iconSrcAction1 : iconSrcAction2;

  const IconStyle = {
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
    >
      <img src={iconSrc} alt="Icon" style={IconStyle} />
    </button>
  );
}

ActionButton.defaultProps = {
  isDisabled: false,
  buttonStyle: {},
};

export default ActionButton;

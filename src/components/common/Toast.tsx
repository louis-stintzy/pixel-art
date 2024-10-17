import { useEffect } from 'react';
import { closeIcon } from '../../constants/icons';
import toastConfig from '../../constants/toastConfig';

import './Toast.scss';

interface ToastProps {
  type: 'success' | 'error' | 'info' | 'warning' | 'default';
  message: string;
  optionalButton?:
    | {
        text: string;
        onClick: () => void;
      }
    | undefined;
  onClose: () => void;
  duration?: number;
}

function Toast({
  type,
  message,
  optionalButton,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, duration);
    return () => clearTimeout(timeoutId);
  }, [duration, onClose]);

  const toastContainerStyle: React.CSSProperties = {
    border: `1px solid ${toastConfig[type].borderColor}`,
    backgroundColor: toastConfig[type].backgroundColor,
  };

  return (
    <div id="toast-container" style={toastContainerStyle}>
      <img id="toast-icon" src={toastConfig[type].icon} alt={`${type} icon`} />
      <div id="toast-message">{message}</div>
      {optionalButton && (
        <button
          type="button"
          id="toast-optional-button"
          onClick={optionalButton.onClick}
        >
          {optionalButton.text}
        </button>
      )}
      <button type="button" id="toast-close-button" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </button>
    </div>
  );
}

Toast.defaultProps = {
  optionalButton: undefined,
  duration: 5000,
};

export default Toast;

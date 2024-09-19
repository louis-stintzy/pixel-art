import { useEffect } from 'react';
import { closeIcon } from '../../constants/icons';

import './Toast.scss';

interface ToastProps {
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
  message,
  optionalButton,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, duration);
    return () => clearTimeout(timeoutId);
  }, [duration, onClose]);

  return (
    <div id="toast-container">
      <div id="toast-message">{message}</div>
      {optionalButton && (
        <button
          type="button"
          id="toast-undo-button"
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

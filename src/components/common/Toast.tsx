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
  backgroundColor?: string;
}

function Toast({
  message,
  optionalButton,
  onClose,
  duration = 5000,
  backgroundColor = '#333',
}: ToastProps) {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, duration);
    return () => clearTimeout(timeoutId);
  }, [duration, onClose]);

  const toastContainerBackgroundColor: React.CSSProperties = {
    backgroundColor,
  };

  return (
    <div id="toast-container" style={toastContainerBackgroundColor}>
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
  backgroundColor: '#333',
};

export default Toast;

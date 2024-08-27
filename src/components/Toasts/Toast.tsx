import { useEffect } from 'react';
import { closeIcon } from '../../constants/icons';

import './Toast.scss';

interface ToastProps {
  message: string;
  onUndo: () => void;
  onClose: () => void;
  duration?: number;
}

function Toast({ message, onUndo, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timeoutId = setTimeout(onClose, duration);
    return () => clearTimeout(timeoutId);
  }, [duration, onClose]);

  return (
    <div id="toast-container">
      <div id="toast-message">{message}</div>
      <button type="button" id="toast-undo-button" onClick={onUndo}>
        Undo
      </button>
      <button type="button" id="toast-close-button" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </button>
    </div>
  );
}

Toast.defaultProps = {
  duration: 5000,
};

export default Toast;

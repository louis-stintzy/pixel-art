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
    <div className="toast">
      <div className="toast__message">{message}</div>
      <button type="button" className="toast__undo-button" onClick={onUndo}>
        Undo
      </button>
      <button type="button" className="toast__close-button" onClick={onClose}>
        <img src={closeIcon} alt="Close" />
      </button>
    </div>
  );
}

Toast.defaultProps = {
  duration: 5000,
};

export default Toast;

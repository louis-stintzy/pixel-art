import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  modalStyle: React.CSSProperties;
  onClose: () => void;
}

function Modal({ isOpen, children, modalStyle, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} style={modalStyle} onCancel={onClose}>
      {children}
    </dialog>
  );
}

export default Modal;

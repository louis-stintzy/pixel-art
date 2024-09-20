import { useEffect, useRef } from 'react';
import useStore from '../../../store/store';
import exportData from '../../../utils/exportData';

function DescriptionModal() {
  const { descriptionModalIsOpen, pixelArtDescription } = useStore(
    (state) => state
  );

  const user = useStore((state) => state.user);
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    useStore.getState().setPixelArtDescription(e.target.value);
  };

  const handleCancel = () => {
    useStore.getState().setDescriptionModalIsOpen(false);
  };

  const handleSave = () => {
    try {
      const { isLogged } = useStore.getState();
      if (!isLogged || !user) {
        throw new Error('Please log in to save');
      }
      exportData();
      useStore.getState().setDescriptionModalIsOpen(false);
      useStore
        .getState()
        .setSavingToastVisible({ success: true, error: false });
    } catch (error) {
      console.error('Failed to save pixel art:', error);
      useStore
        .getState()
        .setSavingToastVisible({ success: false, error: true });
    }
  };

  useEffect(() => {
    if (descriptionModalIsOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [descriptionModalIsOpen]);

  const descriptionModalStyle: React.CSSProperties = {
    width: '400px',
    height: '500px',
    margin: 'auto',
  };
  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '350px',
    height: '350px',
    position: 'relative',
  };

  return (
    <dialog
      ref={modalRef}
      style={descriptionModalStyle}
      onCancel={handleCancel}
    >
      <div id="input-container" style={inputContainerStyle}>
        <div>
          <label htmlFor="creator">Creator </label>
          <input type="text" id="creator" value={user?.username} disabled />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="description">Description </label>
          <textarea
            id="description"
            name="description"
            rows={10}
            placeholder="Description"
            onChange={handleChangeDescription}
            value={pixelArtDescription}
          />
        </div>
      </div>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </dialog>
  );
}

export default DescriptionModal;

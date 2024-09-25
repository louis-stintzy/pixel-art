import useStore from '../../../store/store';
import exportData from '../../../utils/exportData';

function DescriptionModalContent() {
  const { user, pixelArtDescription } = useStore((state) => state);

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    useStore.getState().setPixelArtDescription(e.target.value);
  };

  const handleSave = () => {
    try {
      const { isLogged } = useStore.getState();
      if (!isLogged || !user) {
        throw new Error('Please log in to save');
      }
      exportData();
      useStore.getState().setIsDescriptionModalOpen(false);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: true, error: false });
    } catch (error) {
      console.error('Failed to save pixel art:', error);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: false, error: true });
      useStore.getState().setIsDescriptionModalOpen(false);
    }
  };

  const handleCancel = () => {
    useStore.getState().setIsDescriptionModalOpen(false);
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
    <>
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
    </>
  );
}

export default DescriptionModalContent;

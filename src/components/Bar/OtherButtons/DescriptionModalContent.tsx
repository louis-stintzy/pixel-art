import useStore from '../../../store/store';
import exportData from '../../../utils/exportData';
import {
  useUser,
  useIsLogged,
  usePixelArtName,
  usePixelArtDescription,
} from '../../../store/selector';

function DescriptionModalContent() {
  const user = useUser();
  const isLogged = useIsLogged();
  const pixelArtName = usePixelArtName();
  const pixelArtDescription = usePixelArtDescription();
  const { setDescriptionFields } = useStore((state) => state);

  const handleChangeDescriptionFields = (
    field: 'name' | 'description',
    value: string
  ) => {
    setDescriptionFields(field, value);
  };

  const handleSave = () => {
    try {
      if (!isLogged || !user) {
        throw new Error('Please log in to save');
      }
      if (pixelArtName.length < 3) {
        throw new Error('Pixel Art name must be at least 3 characters');
      }
      exportData();
      useStore.getState().resetDescriptionFields();
      useStore.getState().setIsDescriptionModalOpen(false);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: true, error: false });
    } catch (error) {
      console.error('Failed to save pixel art.', error);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: false, error: true });
      useStore.getState().setIsDescriptionModalOpen(false);
    }
  };

  const handleCancel = () => {
    useStore.getState().resetDescriptionFields();
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
        <div>
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            value={pixelArtName}
            onChange={(e) =>
              handleChangeDescriptionFields('name', e.target.value)
            }
            placeholder="Pixel Art name (Min 3 characters)"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="description">Description </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Description"
            onChange={(e) =>
              handleChangeDescriptionFields('description', e.target.value)
            }
            value={pixelArtDescription}
          />
        </div>
      </div>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button
        type="button"
        onClick={handleSave}
        disabled={pixelArtName.length < 3}
      >
        Save
      </button>
    </>
  );
}

export default DescriptionModalContent;

import { useState } from 'react';
import useStore from '../../../store/store';
import exportData from '../../../utils/exportData';
import {
  useUser,
  useIsLogged,
  usePixelArtName,
  usePixelArtDescription,
} from '../../../store/selector';
import exportToPNG from '../../../utils/exportToPNG';
import exportToSVG from '../../../utils/exportToSVG';

function DescriptionModalContent() {
  const user = useUser();
  const isLogged = useIsLogged();
  const pixelArtName = usePixelArtName();
  const pixelArtDescription = usePixelArtDescription();
  const { setDescriptionFields } = useStore((state) => state);

  const [gridOptionSelected, setGridOptionSelected] = useState<
    'none' | 'pixel' | 'full'
  >('full');

  const gridOption = {
    none: 'No grid',
    pixel: 'Border per Pixel',
    full: 'Full grid',
  };

  const handleGridOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridOptionSelected(e.target.value as 'none' | 'pixel' | 'full');
  };

  const handleDescriptionFieldsChange = (
    field: 'name' | 'description',
    value: string
  ) => {
    setDescriptionFields(field, value);
  };

  const handleCancel = () => {
    useStore.getState().resetDescriptionFields();
    useStore.getState().setIsDescriptionModalOpen(false);
  };

  const handleSave = () => {
    try {
      if (!isLogged || !user) {
        throw new Error('Please log in to save');
      }
      if (pixelArtName.length < 3) {
        throw new Error('Pixel Art name must be at least 3 characters');
      }
      const pixelArtData = exportData();
      console.log('pixelArtData:', JSON.stringify(pixelArtData, null, 2));
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

  const handlePublish = () => {
    try {
      if (!isLogged || !user) {
        throw new Error('Please log in to publish');
      }
      if (pixelArtName.length < 3) {
        throw new Error('Pixel Art name must be at least 3 characters');
      }
      const pixelArtData = exportData();
      exportToSVG(pixelArtData, gridOptionSelected);
      useStore.getState().resetDescriptionFields();
      useStore.getState().setIsDescriptionModalOpen(false);
      // todo : renommer SavingToast en passant des messages personnalisés
      useStore
        .getState()
        .setIsSavingToastVisible({ success: true, error: false });
    } catch (error) {
      console.error('Failed to publish pixel art:', error);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: false, error: true });
      useStore.getState().setIsDescriptionModalOpen(false);
    }
  };

  const flexAndColumnDirectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputContainerStyle: React.CSSProperties = {
    ...flexAndColumnDirectionStyle,
    justifyContent: 'space-around',
    width: '350px',
    height: '400px',
    position: 'relative',
  };

  return (
    <>
      <div id="input-container" style={inputContainerStyle}>
        <div style={flexAndColumnDirectionStyle}>
          <label htmlFor="creator">Creator </label>
          <input type="text" id="creator" value={user?.username} disabled />
        </div>
        <div style={flexAndColumnDirectionStyle}>
          <label htmlFor="name">Name </label>
          <input
            type="text"
            id="name"
            value={pixelArtName}
            onChange={(e) =>
              handleDescriptionFieldsChange('name', e.target.value)
            }
            placeholder="Pixel Art name (Min 3 characters)"
          />
        </div>
        <div style={flexAndColumnDirectionStyle}>
          <label htmlFor="description">Description </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Description"
            onChange={(e) =>
              handleDescriptionFieldsChange('description', e.target.value)
            }
            value={pixelArtDescription}
          />
        </div>
        <div style={flexAndColumnDirectionStyle}>
          {Object.entries(gridOption).map(([key, value]) => (
            <label key={key}>
              <input
                type="radio"
                name="gridOption"
                value={key}
                onChange={handleGridOptionChange}
                checked={gridOptionSelected === key}
              />
              {value}
            </label>
          ))}
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
      <button
        type="button"
        onClick={handlePublish}
        disabled={pixelArtName.length < 3}
      >
        Publish
      </button>
    </>
  );
}

export default DescriptionModalContent;

import { useState } from 'react';
import useStore from '../../../../store/store';
import exportData from '../../../../utils/exportData';
import {
  useUser,
  useIsLogged,
  usePixelArtName,
  usePixelArtDescription,
  usePreviewUrl,
  useClickedButton,
} from '../../../../store/selector';
import exportToSVG from '../../../../utils/exportToSVG';

function DescriptionModalContent() {
  const user = useUser();
  const isLogged = useIsLogged();
  const buttonClickedInOtherButtons = useClickedButton();
  const pixelArtName = usePixelArtName();
  const pixelArtDescription = usePixelArtDescription();
  const previewUrl = usePreviewUrl();
  const { setDescriptionFields, setPreviewUrl } = useStore((state) => state);

  const [gridOptionSelected, setGridOptionSelected] = useState<
    'none' | 'pixel' | 'full'
  >('full');

  const gridOption = {
    none: 'No grid',
    pixel: 'Border per Pixel',
    full: 'Full grid',
  };

  let confirmationButton = null;
  if (isLogged && user) {
    confirmationButton =
      buttonClickedInOtherButtons === 'save' ? 'Save' : 'Publish';
  }

  const handleGridOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGridOptionSelected(e.target.value as 'none' | 'pixel' | 'full');
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl('');
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

  const handleClickOnPreview = () => {
    try {
      // Pour prévisualiser, l'utilisateur doit être connecté et le nom du pixel art doit être  renseigné (au moins 3 caractères)
      if (!isLogged || !user) {
        throw new Error('Please log in to save');
      }
      if (pixelArtName.length < 3) {
        throw new Error('Pixel Art name must be at least 3 characters');
      }

      // Cliquer sur le lien de prévisualitaion entraine la révocation d'une eventuelle URL de preview déjà présente et la création d'une nouvelle url de preview puis l'ouverture d'une nouvelle modal pour afficher la preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
      useStore.getState().cleanPixelColors();
      const pixelArtData = exportData();
      const preview = exportToSVG(pixelArtData, gridOptionSelected);
      setPreviewUrl(preview);
      useStore.getState().setIsPreviewModalOpen(true);

      // En cas d'erreur, on affiche un message d'erreur dans la console + toast
    } catch (error) {
      console.error('Failed to preview pixel art.', error);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: false, error: true });
      useStore.getState().setIsDescriptionModalOpen(false);
    }
  };

  const handleSave = () => {
    try {
      // Pour sauvegarder, l'utilisateur doit être connecté et le nom du pixel art doit être  renseigné (au moins 3 caractères)
      if (!isLogged || !user) {
        throw new Error('Please log in to save');
      }
      if (pixelArtName.length < 3) {
        throw new Error('Pixel Art name must be at least 3 characters');
      }

      // Cliquer sur Save entraine le log des datas => par la suite : Data envoyer au backend
      useStore.getState().cleanPixelColors();
      const pixelArtData = exportData();
      console.log(
        'pixelArtData after save:',
        JSON.stringify(pixelArtData, null, 2)
      );

      // Pour finir, on revoque une éventuelle url de preview présente, efface les champs, ferme la modal et affiche un message de succès (toast)
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
      useStore.getState().resetDescriptionFields();
      useStore.getState().setIsDescriptionModalOpen(false);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: true, error: false });

      // En cas d'erreur, on affiche un message d'erreur dans la console + toast
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
      // Pour publier, l'utilisateur doit être connecté et le nom du pixel art doit être  renseigné (au moins 3 caractères)
      if (!isLogged || !user) {
        throw new Error('Please log in to publish');
      }
      if (pixelArtName.length < 3) {
        throw new Error('Pixel Art name must be at least 3 characters');
      }

      // Cliquer sur Publish entraine le téléchargement du fichier SVG + log des datas => par la suite : SVG + Data envoyer au backend
      useStore.getState().cleanPixelColors();
      const pixelArtData = exportData();
      console.log(
        'pixelArtData after publish:',
        JSON.stringify(pixelArtData, null, 2)
      );
      const pixelArtSVGurl = exportToSVG(pixelArtData, gridOptionSelected);
      const link = document.createElement('a');
      link.href = pixelArtSVGurl;
      link.download = `${pixelArtData.name}.svg`;
      link.click();
      URL.revokeObjectURL(pixelArtSVGurl); // on revoque direct une fois l'image téléchargée

      // Pour finir, on efface les champs, ferme la modal et affiche un message de succès (toast)
      // todo : renommer SavingToast en passant des messages personnalisés
      useStore.getState().resetDescriptionFields();
      useStore.getState().setIsDescriptionModalOpen(false);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: true, error: false });

      // En cas d'erreur, on affiche un message d'erreur dans la console + toast
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
    justifyContent: 'space-between',
    width: '350px',
    height: '462px',
    paddingBottom: '10px',
    position: 'relative',
  };

  const previewLinkStyle: React.CSSProperties =
    !isLogged || !user || pixelArtName.length < 3
      ? {
          color: 'gray',
          cursor: 'not-allowed',
          border: ' none',
          backgroundColor: 'transparent',
        }
      : {
          color: 'blue',
          cursor: 'pointer',
          border: ' none',
          backgroundColor: 'transparent',
        };

  return (
    <div id="input-container" style={inputContainerStyle}>
      <div
        style={{
          ...flexAndColumnDirectionStyle,
          height: '100%',
          justifyContent: 'space-around',
          paddingBottom: '10px',
        }}
      >
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
                disabled={!isLogged || !user || pixelArtName.length < 3}
              />
              {value}
            </label>
          ))}
        </div>
        <button
          type="button"
          style={previewLinkStyle}
          onClick={handleClickOnPreview}
        >
          {pixelArtName.length < 3
            ? 'Please enter the name of your pixel art'
            : 'Click to see a preview'}
        </button>
      </div>

      <div>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        {confirmationButton && (
          <button
            type="button"
            onClick={confirmationButton === 'Save' ? handleSave : handlePublish}
            disabled={pixelArtName.length < 3}
          >
            {confirmationButton}
          </button>
        )}
      </div>
    </div>
  );
}

export default DescriptionModalContent;

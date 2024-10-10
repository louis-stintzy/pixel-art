import usePreviewUrlManagement from '../../../../hooks/usePreviewUrlManagement';
import {
  useIsLogged,
  usePixelArtName,
  useUser,
} from '../../../../store/selector';
import useStore from '../../../../store/store';
import checkBeforeSavingPublishPreview from '../../../../utils/otherButtons/checkBeforeSavingPublishPreview';

function PreviewButton() {
  const user = useUser();
  const isLogged = useIsLogged();
  const pixelArtName = usePixelArtName();
  const { createPreviewUrl } = usePreviewUrlManagement();

  const handleClickOnPreview = () => {
    try {
      // Pour prévisualiser, l'utilisateur doit être connecté et le nom du pixel art doit être  renseigné (au moins 3 caractères)
      checkBeforeSavingPublishPreview();

      // Cliquer sur le lien de prévisualitaion entraine la révocation d'une eventuelle URL de preview déjà présente et la création d'une nouvelle url de preview puis l'ouverture d'une nouvelle modal pour afficher la preview
      createPreviewUrl();

      // En cas d'erreur, on affiche un message d'erreur dans la console + toast
    } catch (error) {
      console.error('Failed to preview pixel art.', error);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: false, error: true });
      useStore.getState().setIsDescriptionModalOpen(false);
    }
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
    <button
      type="button"
      className="description-fields__preview-link"
      style={previewLinkStyle}
      onClick={handleClickOnPreview}
      disabled={!isLogged || !user || pixelArtName.length < 3}
    >
      {pixelArtName.length < 3
        ? 'Please enter the name of your pixel art'
        : 'Click to see a preview'}
    </button>
  );
}

export default PreviewButton;

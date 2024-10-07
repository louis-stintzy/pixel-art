import {
  useIsLogged,
  usePixelArtName,
  usePreviewUrl,
  useUser,
} from '../../../../store/selector';
import useStore from '../../../../store/store';
import exportData from '../../../../utils/exportData';
import exportToSVG from '../../../../utils/exportToSVG';

interface PreviewButtonProps {
  gridOptionSelected: 'none' | 'pixel' | 'full';
}

function PreviewButton({ gridOptionSelected }: PreviewButtonProps) {
  const user = useUser();
  const isLogged = useIsLogged();
  const pixelArtName = usePixelArtName();
  const previewUrl = usePreviewUrl();
  const { setPreviewUrl } = useStore((state) => state);

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

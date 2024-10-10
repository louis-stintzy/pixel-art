import usePreviewUrlManagement from '../../../../hooks/usePreviewUrlManagement';
import {
  useClickedButton,
  useIsLogged,
  usePixelArtName,
  useUser,
} from '../../../../store/selector';
import useStore from '../../../../store/store';
import checkBeforeSavingPublishPreview from '../../../../utils/otherButtons/checkBeforeSavingPublishPreview';
import exportData from '../../../../utils/otherButtons/exportData';
import exportToSVG from '../../../../utils/otherButtons/exportToSVG';

function CancelAndConfirmationButtons() {
  const user = useUser();
  const isLogged = useIsLogged();
  const pixelArtName = usePixelArtName();
  const buttonClickedInOtherButtons = useClickedButton();
  const { revokePreviewUrl } = usePreviewUrlManagement();

  let confirmationButton = null;
  if (isLogged && user) {
    confirmationButton =
      buttonClickedInOtherButtons === 'save' ? 'Save' : 'Publish';
  }

  const handleCancel = () => {
    useStore.getState().resetDescriptionFields();
    useStore.getState().setIsDescriptionModalOpen(false);
  };

  const handleSave = () => {
    try {
      // Pour sauvegarder, l'utilisateur doit être connecté et le nom du pixel art doit être  renseigné (au moins 3 caractères)
      checkBeforeSavingPublishPreview();

      // Cliquer sur Save entraine le log des datas => par la suite : Data envoyer au backend
      useStore.getState().cleanPixelColors();
      const pixelArtData = exportData();
      console.log(
        'pixelArtData after save:',
        JSON.stringify(pixelArtData, null, 2)
      );

      // Pour finir, on revoque une éventuelle url de preview présente, efface les champs, ferme la modal et affiche un message de succès (toast)
      revokePreviewUrl();
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
      checkBeforeSavingPublishPreview();

      // Cliquer sur Publish entraine le téléchargement du fichier SVG + log des datas => par la suite : SVG + Data envoyer au backend
      useStore.getState().cleanPixelColors();
      const pixelArtData = exportData();
      console.log(
        'pixelArtData after publish:',
        JSON.stringify(pixelArtData, null, 2)
      );
      const pixelArtSVGurl = exportToSVG(pixelArtData);
      const link = document.createElement('a');
      link.href = pixelArtSVGurl;
      link.download = `${pixelArtData.name}.svg`;
      link.click();
      // URL.revokeObjectURL(pixelArtSVGurl); // on revoque direct une fois l'image téléchargée --> on utilise maintenant revokePreviewUrl

      // Pour finir, on efface les champs, ferme la modal et affiche un message de succès (toast)
      // todo : renommer SavingToast en passant des messages personnalisés
      revokePreviewUrl();
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
  return (
    <>
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
    </>
  );
}

export default CancelAndConfirmationButtons;

import useStore from '../store/store';
import checkBeforeSavingPublishPreview from '../utils/otherButtons/checkBeforeSavingPublishPreview';
import exportData from '../utils/otherButtons/exportData';
import exportToSVG from '../utils/otherButtons/exportToSVG';
import usePreviewUrlManagement from './usePreviewUrlManagement';

function useSavePublish() {
  const { revokePreviewUrl } = usePreviewUrlManagement();

  const handleSaveOrPublish = (action: 'save' | 'publish') => {
    try {
      // Pour Save ou Publish, l'utilisateur doit être connecté et le nom du pixel art doit être renseigné (au moins 3 caractères)
      checkBeforeSavingPublishPreview();

      // Cliquer sur Save ou Publish entraine le log des datas => par la suite : Data envoyer au backend
      // useStore.getState().cleanPixelColors(); // déplacé dans exportData car opération synchrone
      const pixelArtData = exportData();
      console.log(JSON.stringify(pixelArtData, null, 2));

      // Si l'action est 'publish', on exporte le pixel art en SVG
      if (action === 'publish') {
        const pixelArtSVGurl = exportToSVG(pixelArtData);
        const link = document.createElement('a');
        link.href = pixelArtSVGurl;
        link.download = `${pixelArtData.name}.svg`;
        link.click();
      }

      // Pour finir, on revoque une éventuelle url de preview présente, affiche un message de succès (toast) et ferme la modal
      // todo : renommer SavingToast en passant des messages personnalisés
      revokePreviewUrl();
      useStore.getState().setIsDescriptionModalOpen(false);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: true, error: false });
      useStore.getState().setIsDescriptionModalOpen(false);
    } catch (error) {
      // En cas d'erreur, on affiche un message d'erreur dans la console + toast et ferme la modal
      console.error(`Failed to ${action} pixel art`, error);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: false, error: true });
      useStore.getState().setIsDescriptionModalOpen(false);
    }
  };

  return { handleSaveOrPublish };
}

export default useSavePublish;

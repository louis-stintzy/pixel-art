import errorMessages from '../constants/errorMessages';
import { useIsPreviewModalOpen, usePreviewUrl } from '../store/selector';
import useStore from '../store/store';
import checkBeforeSavingPublishPreview from '../utils/otherButtons/checkBeforeSavingPublishPreview';
import exportData from '../utils/otherButtons/exportData';
import exportToSVG from '../utils/otherButtons/exportToSVG';

function useSavePublishPreview() {
  const previewUrl = usePreviewUrl();
  const isPreviewModalOpen = useIsPreviewModalOpen();
  const { setPreviewUrl, setIsPreviewModalOpen } = useStore((state) => state);

  const revokePreviewUrl = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
  };

  const handleSaveOrPublishOrPreview = (
    action: 'save' | 'publish' | 'preview'
  ) => {
    try {
      checkBeforeSavingPublishPreview(); // Pour Save, Publish ou Preview : l'utilisateur doit être connecté et le nom du pixel art doit être renseigné (au moins 3 caractères)
      revokePreviewUrl(); // Révocation d'une éventuelle URL de preview déjà présente
      const pixelArtData = exportData();
      console.log(JSON.stringify(pixelArtData, null, 2)); // Log des datas => par la suite : Data envoyées au backend pour save et publish

      if (action === 'publish' || action === 'preview') {
        // Si l'action est 'publish' ou 'preview', on exporte le pixel art en SVG
        const pixelArtSVGurl = exportToSVG(pixelArtData);
        if (action === 'publish') {
          // Si l'action est 'publish', on télécharge le fichier SVG
          const link = document.createElement('a');
          link.href = pixelArtSVGurl;
          link.download = `${pixelArtData.name}.svg`;
          link.click();
          URL.revokeObjectURL(pixelArtSVGurl); // Révocation de l'URL tout de suite après téléchargment du fichier (à voir après envoi au backend)
        } else {
          // Si l'action est 'preview', on affiche la preview dans une modal
          setPreviewUrl(pixelArtSVGurl);
          if (!isPreviewModalOpen) setIsPreviewModalOpen(true);
        }
      }

      if (action === 'save' || action === 'publish') {
        // Pour finir, on affiche un message de succès (toast) et ferme la modal
        useStore
          .getState()
          .setIsSavingToastVisible({ success: true, error: false });
        useStore.getState().setIsDescriptionModalOpen(false);
      }
    } catch (error) {
      // En cas d'erreur, on affiche un message d'erreur dans la console + toast et ferme la modal
      const errorMessage = `${errorMessages[`${action}Error`]} : ${error}`;
      console.error(errorMessage);
      useStore
        .getState()
        .setIsSavingToastVisible({ success: false, error: true });
      useStore.getState().setIsDescriptionModalOpen(false);
    }
  };

  return { revokePreviewUrl, handleSaveOrPublishOrPreview };
}

export default useSavePublishPreview;

import { errorMessages, successMessages } from '../constants/messages';
import {
  useIsPreviewModalOpen,
  usePreviewUrl,
} from '../store/selectors/selector';
import useStore from '../store/store';
import { setPreviewUrl } from '../store/actions/storeActions';
import checkBeforeSavingPublishPreview from '../utils/otherButtons/checkBeforeSavingPublishPreview';
import exportData from '../utils/otherButtons/exportData';
import exportToSVG from '../utils/otherButtons/exportToSVG';

function useSavePublishPreview() {
  const previewUrl = usePreviewUrl();
  const isPreviewModalOpen = useIsPreviewModalOpen();
  const { setIsPreviewModalOpen } = useStore((state) => state);

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
        useStore.getState().closeAllToasts();
        useStore.getState().setIsSavingPublishingPreviewingToastVisible({
          success: true,
          error: false,
          message: successMessages[`${action}Success`],
        });
        useStore.getState().setIsDescriptionModalOpen(false);
      }
    } catch (error) {
      // En cas d'erreur, on affiche un message d'erreur dans la console + toast et ferme la modal
      const errorMessage =
        error instanceof Error
          ? `${errorMessages[`${action}Error`]} ${error.message}`
          : errorMessages.unexpectedError;
      console.error(errorMessage);
      useStore.getState().closeAllToasts();
      useStore.getState().setIsSavingPublishingPreviewingToastVisible({
        success: false,
        error: true,
        message: errorMessage,
      });
      useStore.getState().setIsDescriptionModalOpen(false);
    }
  };

  return { revokePreviewUrl, handleSaveOrPublishOrPreview };
}

export default useSavePublishPreview;

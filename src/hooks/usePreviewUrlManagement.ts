import { useIsPreviewModalOpen, usePreviewUrl } from '../store/selector';
import useStore from '../store/store';
import exportData from '../utils/otherButtons/exportData';
import exportToSVG from '../utils/otherButtons/exportToSVG';

function usePreviewUrlManagement() {
  const previewUrl = usePreviewUrl();
  const isPreviewModalOpen = useIsPreviewModalOpen();
  const { setPreviewUrl, setIsPreviewModalOpen } = useStore((state) => state);

  const revokePreviewUrl = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
  };

  const createPreviewUrl = () => {
    revokePreviewUrl();
    useStore.getState().cleanPixelColors();
    const pixelArtData = exportData();
    const preview = exportToSVG(pixelArtData);
    setPreviewUrl(preview);
    if (!isPreviewModalOpen) setIsPreviewModalOpen(true);
  };

  return { revokePreviewUrl, createPreviewUrl };
}

export default usePreviewUrlManagement;

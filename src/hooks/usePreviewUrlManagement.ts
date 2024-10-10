import { useGridOptionSelected, usePreviewUrl } from '../store/selector';
import useStore from '../store/store';
import exportData from '../utils/otherButtons/exportData';
import exportToSVG from '../utils/otherButtons/exportToSVG';

function usePreviewUrlManagement() {
  const gridOptionSelected = useGridOptionSelected();
  const previewUrl = usePreviewUrl();
  const { setPreviewUrl } = useStore((state) => state);

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
    const preview = exportToSVG(pixelArtData, gridOptionSelected);
    setPreviewUrl(preview);
  };

  return { revokePreviewUrl, createPreviewUrl };
}

export default usePreviewUrlManagement;

import ClearCanvasToast from '../../Toasts/ClearCanvasToast';
import ColorReplacementToast from '../../Toasts/ColorReplacementToast';
import ContactToast from '../../Toasts/ContactToast';
import SavingPublishingPreviewingToast from '../../Toasts/SavingPublishingPreviewingToast';
import {
  useIsColorReplacementToastVisible,
  useIsClearCanvasToastVisible,
  useIsSavingPublishingPreviewingToastVisible,
  useIsContactToastVisible,
} from '../../../store/selector';

function ToastsContainer() {
  const isColorReplacementToastVisible = useIsColorReplacementToastVisible();
  const isClearCanvasToastVisible = useIsClearCanvasToastVisible();
  const isSavingPublishingPreviewingToastVisible =
    useIsSavingPublishingPreviewingToastVisible();
  const isContactToastVisible = useIsContactToastVisible();

  return (
    <>
      {isColorReplacementToastVisible && <ColorReplacementToast />}
      {isClearCanvasToastVisible && <ClearCanvasToast />}
      {isSavingPublishingPreviewingToastVisible && (
        <SavingPublishingPreviewingToast />
      )}
      {isContactToastVisible && <ContactToast />}
    </>
  );
}

export default ToastsContainer;

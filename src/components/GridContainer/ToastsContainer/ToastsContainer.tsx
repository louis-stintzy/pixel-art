import useStore from '../../../store/store';
import ClearCanvasToast from '../../Toasts/ClearCanvasToast';
import ColorReplacementToast from '../../Toasts/ColorReplacementToast';
import ContactToast from '../../Toasts/ContactToast';
import SavingToast from '../../Toasts/SavingToast';
import {
  useIsColorReplacementToastVisible,
  useIsClearCanvasToastVisible,
  useIsSavingToastVisible,
  useIsContactToastVisible,
} from '../../../store/selector';

function ToastsContainer() {
  const isColorReplacementToastVisible = useIsColorReplacementToastVisible();
  const isClearCanvasToastVisible = useIsClearCanvasToastVisible();
  const isSavingToastVisible = useIsSavingToastVisible();
  const isContactToastVisible = useIsContactToastVisible();

  return (
    <>
      {isColorReplacementToastVisible && <ColorReplacementToast />}
      {isClearCanvasToastVisible && <ClearCanvasToast />}
      {isSavingToastVisible && <SavingToast />}
      {isContactToastVisible && <ContactToast />}
    </>
  );
}

export default ToastsContainer;

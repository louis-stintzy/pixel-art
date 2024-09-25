import useStore from '../../../store/store';
import ClearCanvasToast from '../../Toasts/ClearCanvasToast';
import ColorReplacementToast from '../../Toasts/ColorReplacementToast';
import ContactToast from '../../Toasts/ContactToast';
import SavingToast from '../../Toasts/SavingToast';
import {
  useIsClearCanvasToastVisible,
  useIsSavingToastVisible,
  useIsContactToastVisible,
} from '../../../store/selector';

function ToastsContainer() {
  const { toastVisible: colorReplacementToastVisible } = useStore(
    (state) => state.colorReplacement
  );
  const isClearCanvasToastVisible = useIsClearCanvasToastVisible();
  const isSavingToastVisible = useIsSavingToastVisible();
  const isContactToastVisible = useIsContactToastVisible();

  return (
    <>
      {colorReplacementToastVisible && <ColorReplacementToast />}
      {isClearCanvasToastVisible && <ClearCanvasToast />}
      {isSavingToastVisible && <SavingToast />}
      {isContactToastVisible && <ContactToast />}
    </>
  );
}

export default ToastsContainer;

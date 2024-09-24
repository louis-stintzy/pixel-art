import useStore from '../../../store/store';
import ClearCanvasToast from '../../Toasts/ClearCanvasToast';
import ColorReplacementToast from '../../Toasts/ColorReplacementToast';
import ContactToast from '../../Toasts/ContactToast';
import SavingToast from '../../Toasts/SavingToast';

function ToastsContainer() {
  const { toastVisible: colorReplacementToastVisible } = useStore(
    (state) => state.colorReplacement
  );

  const { clearCanvasToastVisible, savingToastVisible, contactToastVisible } =
    useStore((state) => state);
  return (
    <>
      {colorReplacementToastVisible && <ColorReplacementToast />}
      {clearCanvasToastVisible && <ClearCanvasToast />}
      {savingToastVisible && <SavingToast />}
      {contactToastVisible && <ContactToast />}
    </>
  );
}

export default ToastsContainer;
